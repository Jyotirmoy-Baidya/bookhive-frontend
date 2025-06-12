import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getToken } from '../../utils/GetToken';

const FriendsChatPanel = () => {
    const [showFriends, setShowFriends] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const [invites, setInvites] = useState([]);

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

            // setInvites(data.data.sent);

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

    const invites = [
        { id: 1, name: 'Ananya Sharma', avatar: 'https://i.pravatar.cc/150?img=5' },
        { id: 2, name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?img=8' },
    ];

    const friends = [
        { id: 3, name: 'Soham Das', avatar: 'https://i.pravatar.cc/150?img=14' },
        { id: 4, name: 'Tina Roy', avatar: 'https://i.pravatar.cc/150?img=12' },
    ];

    const handleAccept = (id) => {
        console.log('Accepted:', id);
    };

    const handleReject = (id) => {
        console.log('Rejected:', id);
    };

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { fromMe: true, text: input }]);
        setInput('');
        // Simulated reply
        setTimeout(() => {
            setMessages((prev) => [...prev, { fromMe: false, text: 'Got it!' }]);
        }, 800);
    };

    const list = showFriends ? friends : invites;

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
            {/* LEFT PANEL */}
            <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        {showFriends ? 'Friends' : 'Invites'}
                    </h2>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={showFriends}
                            onChange={() => {
                                setSelectedUser(null);
                                setShowFriends(!showFriends);
                            }}
                        />
                        <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner relative">
                            <div
                                className={`h-5 w-5 bg-indigo-500 rounded-full shadow transform transition-transform duration-300 ease-in-out ${showFriends ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                            ></div>
                        </div>
                    </label>
                </div>

                <ul className="space-y-4">
                    {list.length === 0 ? (
                        <p className="text-gray-500">No users.</p>
                    ) : (
                        list.map((user) => (
                            <li
                                key={user.id}
                                className={`flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer ${selectedUser?.id === user.id ? 'bg-indigo-100' : ''
                                    }`}
                                onClick={() => setSelectedUser(user)}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
                                    <span className="font-medium text-gray-800">{user.name}</span>
                                </div>
                                {!showFriends && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAccept(user.id);
                                            }}
                                            className="text-green-950 py-2 px-2 bg-green-300 hover:bg-green-400 text-sm rounded shadow"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleReject(user.id);
                                            }}
                                            className="text-red-500 text-sm hover:underline"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* RIGHT CHAT PANEL */}
            <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-5 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="flex items-center gap-3 border-b pb-3 mb-3">
                            <img src={selectedUser.avatar} alt="" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-semibold text-gray-800">{selectedUser.name}</p>
                                <p className="text-sm text-gray-500">
                                    {showFriends ? 'Friend' : 'Pending Invite'}
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 max-h-[400px]">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`max-w-xs px-4 py-2 rounded-xl ${msg.fromMe
                                        ? 'bg-indigo-500 text-white self-end ml-auto'
                                        : 'bg-gray-200 text-gray-800 self-start'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex gap-2">
                            <input
                                type="text"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-400 my-auto">Select a user to chat</div>
                )}
            </div>
        </div>
    );
};

export default FriendsChatPanel;
