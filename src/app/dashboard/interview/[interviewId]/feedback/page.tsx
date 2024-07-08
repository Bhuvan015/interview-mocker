"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Feedback: React.FC<{ params?: any }> = ({ params }) => {
  const [feedbacks, setFeedbacks] = useState<any>();
  const [rating, setRating] = useState<number>(0)
  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbacks(result);
  };
useEffect(() => {
  let totalRating = 0;
  feedbacks?.forEach((item: any) => {
    totalRating += item?.rating
  })
  setRating(totalRating / 5)
}, [feedbacks])
  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>{feedbacks?.rating}{rating}/10</strong>
      </h2>

      <h2 className="text-sm text-gray-500">
        Find below interview question with correct answer, your answer and
        feedback for improvement
      </h2>
      {!!feedbacks?.length &&
        feedbacks?.map((item: any, index: number) => {
          return (
            <Collapsible key={index} className={'mt-7'}>
              <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                {item.question} <ChevronsUpDown className="h-4 w-5"/>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">Rating<strong>{item?.rating}</strong></h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">Your Answer: <strong>{item?.userAns}</strong></h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">Correct Answer: <strong>{item?.correctAns}</strong></h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary-900">Feedback: <strong>{item?.feedback}</strong></h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
        <Link href={'/dashboard'}>
        <Button>Go Home</Button>
        </Link>
    </div>
  );
};

export default Feedback;
