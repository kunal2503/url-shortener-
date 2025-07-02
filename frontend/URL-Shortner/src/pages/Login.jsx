import React from 'react'

const login = () => {
  return (
    <div className='flex justify-around items-center h-screen bg-gray-950'>
        <div className='flex  flex-col  bg-gray-900 px-8 py-6 rounded-lg shadow-lg text-center w-96 h-96'>
        <h1 className='text-3xl font-bold text-white '>Login</h1>
        <form className='mt-20'>
            <input type="email" placeholder='Enter a Email' className='w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded-md focus:outline-none border border-gray-500  focus:border-indigo-600' />
            <input type="password" placeholder='Enter a Password' className='w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded-md focus:outline-none border border-gray-500  focus:border-indigo-600' />
            <button type='submit' className='w-full bg-indigo-500 mt-4 hover:bg-indigo-600 text-white px-4 py-2 rounded-md'>Login</button>
            <p className='mt-4 text-gray-400'>Don't have an account? <a href="/signup" className='text-indigo-500 hover:underline'>Signup</a></p>
        </form>
        </div>
    </div>
  )
}

export default login