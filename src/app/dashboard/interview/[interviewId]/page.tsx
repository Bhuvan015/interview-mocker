"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
interface Result {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string | null;
  mockId: string;
}

const Interview: React.FC<{ params?: any }> = ({ params }) => {
  const [interviewData, setInterviewData] = useState<Result>();
  const [webcamEnabled, setWebcamEnabled] = useState<boolean>(false);
  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    if (result) {
      setInterviewData(result[0]);
    }
  };
  useEffect(() => {
    getInterviewDetails();
  }, []);

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">{`Let's get started`}</h2>
      <div className="grid grid-cols-1 md: grid-cols-2">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col gap-5 p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Job Position</strong>{" "}
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack</strong>{" "}
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience</strong>{" "}
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Enable Video Web Cam and Microphone to start you AI generated mock
              interview. It has{" "}
              {process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} questions
              which you can answer and at last you will get a report on the
              basis of you answer. NOTE: We never record your video, Web cam you
              can disable anytime you want
            </h2>
          </div>
        </div>
        <div className="ml-10 w-full">
          {webcamEnabled ? (
            <Webcam
              style={{
                height: 500,
                width: 500,
              }}
              onUserMedia={() => setWebcamEnabled(true)}
              mirrored={true}
              onUserMediaError={() => setWebcamEnabled(false)}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-72 my-7 p-20 bg-secondary rounded-lg" />
              <Button
                onClick={() => {
                  setWebcamEnabled(true);
                }}
                variant={'ghost'}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
        <Button className="text-white">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
