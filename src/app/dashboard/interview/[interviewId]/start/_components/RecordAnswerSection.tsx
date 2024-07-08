"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { chatSession } from "@/utils/GeminiAIModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { Mic, StopCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";

const RecordAnswerSection: React.FC<{
  mockInterviewQuestions?: any;
  activeQuestionIndex: number;
  interviewData?: any;
}> = ({mockInterviewQuestions, activeQuestionIndex, interviewData}) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const {user} = useUser()
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true)
    const feedbackPrompt = "Question" +  mockInterviewQuestions?.[activeQuestionIndex]?.question + ", User Answer" + userAnswer+", Depends on question and user answer for given interview question please give us rating for answer and feedback as area of improvement if any in just 3 - 5 lines to improve it in JSON format with rating field and feedback field";
    const result = await chatSession.sendMessage(feedbackPrompt)
    const mockJsonResponse = (result?.response?.text()).replace('```json', '').replace('```', '')
    const JSONFeedbackResp = JSON.parse(mockJsonResponse);
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId as string,
      question: mockInterviewQuestions?.[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestions?.[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JSONFeedbackResp?.feedback,
      rating: JSONFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt:  dayjs().format('DD-MM-YYYY'),
    })
    if(resp) {
      toast('User Answer recorded successfully!')
      setUserAnswer('')
      setResults([])
    }
    setLoading(false)
    setUserAnswer('')
  }

  useEffect(() => {
    if(!isRecording && userAnswer?.length > 10) {
      updateUserAnswer()
    }
    // if (userAnswer?.length < 10) {
    //   setLoading(false)
    //   toast("Error while saving your answer, please record again");
    //   return;
    // } 
  }, [userAnswer, isRecording])

  useEffect(() => {
    if (results) {
      results?.map((result) => {
        setUserAnswer((prev) => prev + (result as ResultType)?.transcript);
      });
    }
  }, [results]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-20">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className={"absolute"}
          alt={"webcam"}
        />
        <Webcam
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
          width={"100%"}
          mirrored
        />
      </div>
      <Button
        variant={"outline"}
        disabled={loading}
        className={"my-10"}
        onClick={() => {
          startStopRecording();
        }}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <StopCircle /> Recording...
          </h2>
        ) : (
          <h2 className="flex gap-2">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
