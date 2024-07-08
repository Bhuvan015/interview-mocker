'use client'

import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'

const InterviewList = () => {
    const {user} = useUser()
    const [interviewList, setInterviewList] = useState<any>([])
    const getInterviewList = async() => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress as string)).orderBy(desc(MockInterview.id))
        setInterviewList(result)
        console.log(result)
    } 

    useEffect(() => {
      user &&  getInterviewList()
    }, [user])
  return (
    <div>
        <h2 className='font-medium text-xl'>Previous mock interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg: grid-cols-3 gap-5 my-5'>
            {!!interviewList?.length && interviewList.map((item: any, index: number) => (
                <InterviewCard key={index} interviewItem={item}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList