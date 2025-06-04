import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaBookReader, FaShoppingCart } from 'react-icons/fa'

const Navbar = () => {
    return (
        <div className='sticky top-0 flex py-5 px-6 bg-blue-200'>
            <div className='flex max-w-7xl w-full mx-auto'>
                <div className='flex items-center gap-3'>
                    <FaBookReader size={20} />
                    <h1 className='text-xl font-bold tracking-wide'>Book Hive</h1>
                </div>

                <div className='ml-auto flex items-center gap-4'>
                    <BiSearch size={24} />
                    <FaShoppingCart size={24} />
                    <CgProfile size={24} />
                </div>
            </div>
        </div>
    )
}

export default Navbar