"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import axios from "axios";
import LogoutModal from '@/components/LogoutModal';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);

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
          <li><Link href="/features" className="text-white hover:text-purple-500">Features</Link></li>
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
        Home Page
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
