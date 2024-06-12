"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import LogoutModal from '@/components/LogoutModal';
import Image from 'next/image'; // Import the Image component from the appropriate library



const Home = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
      const fetchPodcasts = async () => {
        try {
          const response = await axios.get("https://api.podchaser.com/podcasts", {
            headers: {
              "Authorization": `Bearer 9c43469d-b575-4406-88a3-9043985d121b`
            }
          });
          setPodcasts(response.data.results || []);
        } catch (error: any) {
          console.error("Error fetching podcasts:", error);
          if (error.response) {
            console.error("Error response:", error.response.data);
          }
          setPodcasts([]);
        }
      };
  
      fetchPodcasts();
  }, []);



  const clearCookies = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  const handleLogout = async () => {
    try {

      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        console.log("No access or refresh token found")
        return;
      } else {
        console.log("Access Token: ", accessToken);
        console.log("Refresh Token: ", refreshToken);

      }

      const response = await axios.post("http://127.0.0.1:8000/api/auth/logout/", {
        refresh: refreshToken,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        clearCookies();
        window.location.href = "/login";
      }
    } catch (error: any) {
      console.error("Error logging out:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <div className="text-xl font-bold text-white">
          ListenPod
        </div>
        <ul className="flex space-x-4">
          <li><Link href="/home" className="text-white hover:text-purple-500">Home</Link></li>
          <li><Link href="/about" className="text-white hover:text-purple-500">About</Link></li>
          <li><Link href="/profile" className="text-white hover:text-purple-500">Profile</Link></li>
          <li>
            <button
              onClick={() => setModalOpen(true)}
              className="text-white hover:text-purple-500"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Top Rated Podcasts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


          {/* {podcasts.map((podcast: any) => (
            <div key={podcast.id} className="bg-gray-800 p-4 rounded-lg">
              <img src={podcast.image} alt={podcast.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h2 className="text-xl font-bold mb-2">{podcast.title}</h2>
              <p className="text-gray-400">{podcast.description}</p>
              <a href={podcast.url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
                Listen Now
              </a>
            </div>
          ))} */}
          

          <div className="bg-gray-800 p-4 rounded-lg">
            <Image src="https://via.placeholder.com/300" alt="Podcast Title" width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">Podcast Title</h2>
            <p className="text-gray-400">Podcast Description</p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
              Listen Now
            </a>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <Image src="https://via.placeholder.com/300" alt="Podcast Title" width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">Podcast Title</h2>
            <p className="text-gray-400">Podcast Description</p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
              Listen Now
            </a>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <Image src="https://via.placeholder.com/300" alt="Podcast Title" width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">Podcast Title</h2>
            <p className="text-gray-400">Podcast Description</p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
              Listen Now
            </a>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <Image src="https://via.placeholder.com/300" alt="Podcast Title" width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">Podcast Title</h2>
            <p className="text-gray-400">Podcast Description</p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
              Listen Now
            </a>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <Image src="https://via.placeholder.com/300" alt="Podcast Title" width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">Podcast Title</h2>
            <p className="text-gray-400">Podcast Description</p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
              Listen Now
            </a>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <Image src="https://via.placeholder.com/300" alt="Podcast Title" width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h2 className="text-xl font-bold mb-2">Podcast Title</h2>
            <p className="text-gray-400">Podcast Description</p>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
              Listen Now
            </a>
          </div>

        </div>

      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Home;
