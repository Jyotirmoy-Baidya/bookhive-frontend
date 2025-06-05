import React from 'react'
import Navbar from '../components/basic/Navbar'
import FriendsPanel from '../components/profile/FriendsPanel';
import FriendsChatPanel from '../components/profile/FriendsChatPanel';

const ProfilePage = () => {
    const profile = {
        name: 'Jyotirmoy Baidya',
        title: 'Frontend Developer',
        location: 'Kolkata, India',
        avatar: 'https://i.pravatar.cc/150?img=32', // Change this to your image
        cover: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1500&q=80',
        bio: 'Passionate about React, Agora, and crafting smooth user experiences.',
        socials: {
            linkedin: 'https://www.linkedin.com/in/jyotirmoy-baidya-9744b9282/',
            github: 'https://github.com/Jyotirmoy408',
            email: 'mailto:jyotirmoybaidya408@gmail.com'
        }
    };
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />


            <div className="relative">
                <img
                    src={profile.cover}
                    alt="cover"
                    className="w-full h-60 object-cover rounded-b-3xl shadow-md"
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 top-40">
                    <img
                        src={profile.avatar}
                        alt="avatar"
                        className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
                    />
                </div>
            </div>

            <div className="mt-20 text-center px-6">
                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-gray-500">{profile.title}</p>
                <p className="mt-2 text-gray-600">{profile.location}</p>

                <p className="mt-4 max-w-xl mx-auto text-gray-700">{profile.bio}</p>

                <div className="mt-6 flex justify-center gap-4 mb-6">
                    <a
                        href={profile.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                    >
                        LinkedIn
                    </a>
                    <a
                        href={profile.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900"
                    >
                        GitHub
                    </a>
                    <a
                        href={profile.socials.email}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                    >
                        Email
                    </a>
                </div>
            </div>

            {/* <FriendsPanel /> */}

            <FriendsChatPanel />

        </div>
    )
}

export default ProfilePage