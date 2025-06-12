import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { getToken } from '../../utils/GetToken';

const Book = ({ book }) => {

    const [msg, setMsg] = useState("");

    const sendFriendRequest = async (receiverId) => {
        try {
            const res = await fetch(`http://localhost:3001/api/v1/user-connection/send-request/${receiverId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}` // optional if your backend uses token auth
                },
                credentials: 'include', // required for cookie-based sessions
                body: JSON.stringify({ message: msg }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Failed to send friend request');

            console.log('Friend request sent:', data);
            toast.success('Friend request sent!');
        } catch (err) {
            console.error('Error sending request:', err);
            toast.error(err.message || 'Something went wrong');
        }
    };
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 flex flex-col overflow-hidden">
            {/* Book image */}
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                    src={book.images?.[0] || 'https://via.placeholder.com/300x200'}
                    alt={book.title}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Book info */}
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
                </div>

                <div className="mt-4 text-sm text-gray-700 space-y-1">
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Price:</strong> ₹{book.basePrice}</p>
                    <p><strong>Year:</strong> {book.editionYear}</p>
                    <p><strong>Condition:</strong> {book.condition}</p>
                    <p><strong>Publication:</strong> {book.publication}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {book.tags?.map((tag, i) => (
                        <span
                            key={i}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>

                <input type="text" className='border mt-5' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button
                    className="mt-1 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                    onClick={() => sendFriendRequest(book.owner._id)}
                >
                    Contact Owner
                </button>
            </div>
        </div>
    )
}

export default Book