'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState('')
  const [jobDesciption, setJobDescription] = useState('')
  const [jobExperience, setJobExperience] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [jsonResponse, setJsonResponse] = useState()
  const {user} = useUser()
  const onSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const inputPromt = `Job Position: ${jobPosition}, Job Description: ${jobDesciption}, Years of Experience: ${jobExperience}. Depending on the job position, job description and years of experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} interview questions along with answers in json format. Give us question and answer field on json`
    const result = await chatSession.sendMessage(inputPromt)
    const mockJsonResponse = (result?.response?.text()).replace('```json', '').replace('```', '')
    console.log(JSON.parse(mockJsonResponse))
    setJsonResponse(mockJsonResponse)
    if(mockJsonResponse) {
        setLoading(false)
        const res = await db.insert(MockInterview).values({
            mockId: uuidv4(),
            jsonMockResp: mockJsonResponse,
            jobPosition: jobPosition, 
            jobDesc: jobDesciption,
            jobExperience: jobExperience,
            createdAt: dayjs().format('DD-MM-YYYY'),
            createdBy: user?.primaryEmailAddress?.emailAddress || '',
        }).returning({
            mockId: MockInterview.mockId
        })
        if(res) {
            setOpenDialog(false)
        }
        console.log('inserted id', res)
    }
  }
  return (
    <div > 
      <div onClick={() => setOpenDialog(true)} className="p-10 border rounder-lg bg-secondary hover:scale-105 cursor-pointer hover:shadow-md">
        <h2 className="text-bold text-lg">+ Add new</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your interview</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                <h2>Add more about you</h2>
                <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input onChange={(event) => setJobPosition(event.target.value)} placeholder="Ex. Full stack developer" required></Input>
                </div>
                <div className="my-3">
                    <label>Job Description/Tech Stack (in short)</label>
                    <Textarea onChange={(event) => setJobDescription(event.target.value)} placeholder="Ex. React, NextJs, Sql, Node js, Python" required></Textarea>
                </div>
                <div className="my-3">
                    <label>Years of Experience</label>
                    <Input onChange={(event) => setJobExperience(event.target.value)} placeholder="Ex. 5" type={'number'} required max={100}></Input>
                </div>
            </div>
            <div className="flex gap-5 justify-end">
            <Button variant={'ghost'} type={'button'} onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{ loading ? <><LoaderCircle className="animate-spin"/>Generating from AI</>  : 'Start Interview'}</Button>
            </div>
                </form>
           
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
