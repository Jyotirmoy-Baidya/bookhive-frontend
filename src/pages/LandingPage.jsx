import React, { useEffect, useState } from 'react'
import Navbar from '../components/basic/Navbar'
import Genre from '../components/landing/Genre'
import ReccomendedBooks from '../components/landing/ReccomendedBooks'
import { getToken } from '../utils/GetToken'
import BookGrid from '../components/Books/BookGrid'

const LandingPage = () => {
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/v1/books/books', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getToken()}` // if needed
                    },
                    credentials: 'include',
                });

                const data = await res.json();
                setBooks(data.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchBookDetails();
    }, [])
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex w-full mx-auto h-[580px] items-center max-w-7xl'>
                <div className='w-[65%]'>
                    <h1 className='text-5xl font-bold'>Welcome to
                        <span className='text-blue-500'> Book Hive</span> - Your second-hand bookstore</h1>

                    <p className='mt-4 text-gray-600'>Discover your next favorite read today!</p>

                    <div className='flex w-full mt-24 gap-2'>
                        <input type="text" name="" id="" className='text-sm w-[50%] focus:outline-none border border-transparent focus:border-black/30 bg-slate-200/40 py-2 px-2 rounded-lg' onChange={(e) => setSearch(e.target.value)} placeholder='What book are you searching for' value={search} />

                        <div className='cursor-pointer bg-blue-400 py-2 px-5 rounded-lg shadow shadow-gray-500/40 text-white'>
                            Search
                        </div>
                    </div>
                </div>

                <div className='w-[35%] flex justify-center items-center'>
                    <img src="/landingimage.png" alt="" className='' />
                </div>
            </div>


            <Genre />

            <ReccomendedBooks />
            {
                books &&
                <BookGrid books={books} />
            }

        </div>
    )
}

export default LandingPage