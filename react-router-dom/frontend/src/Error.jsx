import React from 'react'
import MainNavigation from './components/MainNavigation'

const ErrorPage = () => {
  return (
      <>
          <MainNavigation />
          <section className='w-[42rem] outline my-[5rem] mx-auto flex flex-col items-center p-10'>
              <h2 className='font-extrabold tracking-wider p-2'>An Error has occourd</h2>
              <p>Could not find the page you looking for</p>
          </section>
      </>
  )
}

export default ErrorPage