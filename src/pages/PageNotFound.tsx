import React from 'react'
import MyButton from '../ui/MyButton'

const PageNotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-black h-screen'>
        <h1 className='text-white text-4xl'>404 | Error Not Found</h1>
        <MyButton title="Back To Home" url='/'/>
    </div>
  )
}

export default PageNotFound