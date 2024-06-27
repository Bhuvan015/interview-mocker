import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

const Dashboard = () => {
  return (
    <div className='p-10'>
      <h2 className='text-bold text-2xl'>Dashboard</h2>
      <h2 className='text-gray-500'>
        Create and start your own mockup interview
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview />
      </div>
    </div>
  )
}

export default Dashboard