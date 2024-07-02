"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon } from "lucide-react";
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
  console.log(params.interviewId);
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
    console.log(result, "result");
  };
  useEffect(() => {
    getInterviewDetails();
  }, []);

  return (
    <div className="my-10 flex justify-center flex-col">
      <h2 className="font-bold text-2xl">{`Let's get started`}</h2>
      <div className="grid grid-cols-1 md: grid-cols-2"></div>
      <div>
        {webcamEnabled ? (
          <Webcam
            style={{
              height: 300,
              width: 300,
            }}
            onUserMedia={() => setWebcamEnabled(true)}
            mirrored={true}
            onUserMediaError={() => setWebcamEnabled(false)}
          />
        ) : (
          <>
            
            <WebcamIcon className="h-72 w-72 my-7 p-20 bg-secondary rounded-lg" />
            <Button onClick={() => {
              setWebcamEnabled(true)
            }}>Enable Web Cam and Microphone</Button>
          </>
        )}
      </div>
      <div className='flex flex-col my-5 gap-5'>
        <h2 className='text-lg'>
          <strong>Job Role/Job Position</strong> {interviewData?.jobPosition}
        </h2>
        <h2 className='text-lg'>
          <strong>Job Description/Tech Stack</strong> {interviewData?.jobDesc}
        </h2>
        <h2 className='text-lg'>
          <strong>Years of Experience</strong> {interviewData?.jobExperience}
        </h2>
      </div>
    </div>
  );
};

export default Interview;
