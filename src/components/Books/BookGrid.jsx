import React from 'react';
import Book from './Book';

const BookGrid = ({ books }) => {
    console.log(books)
    if (books == [] || books == undefined) {
        return <></>
    }
    return (
        // <div>sss</div>
        <div className="py-8 px-4 sm:px-6 lg:px-12 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Available Books</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {books?.books?.map((book, i) => (
                    <React.Fragment key={i}>
                        <Book book={book} />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BookGrid;
