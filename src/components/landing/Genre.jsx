import React from 'react'

const Genre = () => {
    return (
        <div className='flex flex-col max-w-7xl mx-auto '>
            <h1 className='text-center mb-5 text-2xl font-medium'>Genres</h1>
            <div className='grid grid-cols-5 gap-10'>
                <div className='w-full bg-blue-300 flex flex-col justify-center py-4 rounded px-1 items-center gap-2'>
                    <p>Fiction</p>
                    <img src="/landingimage.png" alt="" className='h-32' />
                </div>

                <div className='w-full bg-blue-300 flex flex-col justify-center py-4 rounded px-1 items-center gap-2'>
                    <p>Thriller</p>
                    <img src="/landingimage.png" alt="" className='h-32' />
                </div>
                <div className='w-full bg-blue-300 flex flex-col justify-center py-4 rounded px-1 items-center gap-2'>
                    <p>Sci-fi</p>
                    <img src="/landingimage.png" alt="" className='h-32' />
                </div>
                <div className='w-full bg-blue-300 flex flex-col justify-center py-4 rounded px-1 items-center gap-2'>
                    <p>Horror</p>
                    <img src="/landingimage.png" alt="" className='h-32' />
                </div><div className='w-full bg-blue-300 flex flex-col justify-center py-4 rounded px-1 items-center gap-2'>
                    <p>Mystery</p>
                    <img src="/landingimage.png" alt="" className='h-32' />
                </div>
            </div>
        </div>
    )
}

export default Genre