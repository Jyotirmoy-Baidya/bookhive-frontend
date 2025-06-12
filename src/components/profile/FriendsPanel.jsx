import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getToken } from '../../utils/GetToken';

const FriendsPanel = () => {
    const [showFriends, setShowFriends] = useState(false);

    const invites = [
        { id: 1, name: 'Ananya Sharma', avatar: 'https://i.pravatar.cc/150?img=5' },
        { id: 2, name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?img=8' },
    ];

    const friends = [
        { id: 1, name: 'Soham Das', avatar: 'https://i.pravatar.cc/150?img=14' },
        { id: 2, name: 'Tina Roy', avatar: 'https://i.pravatar.cc/150?img=12' },
        { id: 3, name: 'Nitin Kumar', avatar: 'https://i.pravatar.cc/150?img=15' },
    ];


    const getPendingRequests = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/v1/user-connection/get-pending-request-details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}` // Include only if required
                },
                credentials: 'include', // Important for cookie-based session
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) throw new Error(data.message || 'Failed to fetch pending requests');

            console.log('Pending friend requests:', data);
            return data;
        } catch (err) {
            console.error('Error fetching pending requests:', err);
            toast.error(err.message || 'Something went wrong');
            return null;
        }
    };

    useEffect(() => {
        getPendingRequests();
    }, [])



    const handleAccept = (id) => {
        console.log('Accepted invite from ID:', id);
    };

    const handleReject = (id) => {
        console.log('Rejected invite from ID:', id);
    };

    return (
        <div className="bg-white max-w-xl mx-auto rounded-xl shadow p-6 my-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {showFriends ? 'Your Friends' : 'Pending Invites'}
                </h2>
                <label className="flex items-center cursor-pointer ml-20">
                    <span className="mr-2 text-sm text-gray-500">Show Friends</span>
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={showFriends}
                        onChange={() => setShowFriends(!showFriends)}
                    />
                    <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner relative">
                        <div
                            className={`h-5 w-5 bg-indigo-500 rounded-full shadow transform transition-transform duration-300 ease-in-out ${showFriends ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        ></div>
                    </div>
                </label>
            </div>

            {!showFriends ? (
                <ul className="space-y-4">
                    {invites.length === 0 ? (
                        <p className="text-gray-500">No pending invites.</p>
                    ) : (
                        invites.map((user) => (
                            <li key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="font-medium text-gray-800">{user.name}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAccept(user.id)}
                                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(user.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            ) : (
                <ul className="space-y-4">
                    {friends.length === 0 ? (
                        <p className="text-gray-500">No friends yet.</p>
                    ) : (
                        friends.map((user) => (
                            <li key={user.id} className="flex items-center gap-3">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-medium text-gray-800">{user.name}</span>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default FriendsPanel;
