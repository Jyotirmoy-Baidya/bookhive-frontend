import React from 'react'

const tags = ['Fiction', 'Fiction', 'Fiction', 'Fiction']

const books = [
    {
        name: "The Great Gatsby",
        price: 299,
        image: "/bookcover.png"
    },
    {
        name: "To Kill a Mockingbird",
        price: 349,
        image: "/bookcover.png"
    },
    {
        name: "1984",
        price: 279,
        image: "/bookcover.png"
    },
    {
        name: "The Catcher in the Rye",
        price: 259,
        image: "/bookcover.png"
    },
    {
        name: "Pride and Prejudice",
        price: 319,
        image: "/bookcover.png"
    },
    {
        name: "Sapiens: A Brief History of Humankind",
        price: 449,
        image: "/bookcover.png"
    },
    {
        name: "Atomic Habits",
        price: 399,
        image: "/bookcover.png"
    },
    {
        name: "The Alchemist",
        price: 289,
        image: "/bookcover.png"
    },
    {
        name: "Rich Dad Poor Dad",
        price: 329,
        image: "/bookcover.png"
    }
];


const ReccomendedBooks = () => {
    return (
        <div className='flex flex-col max-w-7xl mx-auto w-full mt-20'>
            <div className='text-center text-3xl font-bold text-blue-950 mb-4'>Recommended Books</div>
            <div className='w-full flex'>
                <div className='w-[20%] flex flex-col'>
                    <div className=''>Select Type</div>
                    <div className='flex flex-col gap-4 mt-3'>
                        {
                            tags.map((ele, i) => (
                                <div className='bg-gray-200 py-2 px-3 hover:bg-gray-800 hover:text-white rounded' key={i}>
                                    {ele}
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className='w-[78%] ml-auto grid grid-cols-4 gap-3'>
                    {
                        books.map((book, i) => (
                            <div className="bg-white shadow shadow-gray-500/40 rounded-lg p-4 w-full max-w-xs transition-transform hover:scale-[102%]">
                                <img
                                    src={book.image}
                                    alt={book.name}
                                    className="rounded-xl h-56 w-full object-cover mb-4"
                                />
                                <h2 className="text-lg font-semibold text-gray-800 mb-1">{book.name}</h2>
                                <p className="text-gray-600 mb-3">₹{book.price}</p>
                                <button
                                    // onClick={() => onAddToCart(book)}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ReccomendedBooks