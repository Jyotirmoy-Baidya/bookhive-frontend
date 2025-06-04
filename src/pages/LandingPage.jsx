import React, { useState } from 'react'
import Navbar from '../components/basic/Navbar'

const LandingPage = () => {
    const [search, setSearch] = useState("")
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex w-full mx-auto h-96 items-center max-w-7xl bg-red-400'>
                <div className='w-[65%]'>
                    <h1 className='text-5xl font-bold'>Welcome to
                        <span className='text-blue-500'> Book Hive</span> - Your second-hand bookstore</h1>

                    <p className='mt-4 text-gray-600'>Discover your next favorite read today!</p>

                    <div className='flex w-full mt-20'>
                        <input type="text" name="" id="" className='' onChange={(e) => setSearch(e.target.value)} placeholder='What book are you searching for' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage