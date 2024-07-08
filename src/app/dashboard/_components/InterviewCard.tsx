import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const InterviewCard:React.FC<{interviewItem: any}> = ({interviewItem}) => {
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>
            {interviewItem?.jobPosition}
        </h2>
        <h2 className='text-sm font-bold text-gray-600'>
            {interviewItem?.jobExperience} Years of experience
        </h2>
        <h2 className='text-xs font-bold text-gray-400'>
            Created At: {interviewItem?.createdAt}
        </h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Link href={`/dashboard/interview/${interviewItem?.mockId}/feedback`}>
            <Button className='w-full' size='sm' variant={'outline'}>Feedback</Button>
            </Link>
            <Link href={`/dashboard/interview/${interviewItem?.mockId}/start`}>
            <Button className='w-full' size='sm'>Start</Button>
            </Link>
        </div>
    </div>
  )
}

export default InterviewCard