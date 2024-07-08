"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";

const StartInterview: React.FC<{ params: any }> = ({ params }) => {
  const [interviewData, setInterviewData] = useState<any>();
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState<any>();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    if (result) {
      setInterviewData(result?.[0]);
      const jsonMockResponse = JSON.parse(result?.[0]?.jsonMockResp);
      setMockInterviewQuestions(jsonMockResponse);
    }
  };
  useEffect(() => {
    getInterviewDetails();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            style={{
              color: "#fffff",
            }}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
          <Button
            style={{
              color: "#fffff",
            }}
            onClick={() => {
              setActiveQuestionIndex(activeQuestionIndex + 1);
            }}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestions?.length - 1 && (
          <Link href={`/dashboard/interview${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
