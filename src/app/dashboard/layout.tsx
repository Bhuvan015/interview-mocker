import React, { ReactNode } from 'react'
import Header from './_components/Header'

const DashboardLayout:React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <div>
        <Header />
        <div className='mx-5 md:mx-20 ld:mx-36'> {children}</div>
       
        </div>
  )
}

export default DashboardLayout