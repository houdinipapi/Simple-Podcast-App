"use client"

import React, { useState, useEffect } from 'react';
import axios from "axios";
// import router from 'next/router';
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation"

const ProfilePage = () => {

    const router = useRouter();

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        is_active: false,
        is_staff: false,
        is_superuser: false,
        is_admin: false,
        created_at: "",
        updated_at: "",
    });

    const [newUsername, setNewUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // const router = useRouter();


    useEffect(() =>{
        // Fetch user data
        const fetchUserData = async () => {
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

                const response = await axios.get("http://127.0.0.1:8000/api/auth/profile/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setUserData(response.data);

                console.log(response.data)
                
            } catch (error: any) {
                console.error("Error fetching user data:", error);
                if (error.response) {
                    console.error("Error response:", error.response.data);
                }
            }
        };
        fetchUserData();
    }, []);

    const handleUsernameChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://127.0.0.1:8000/api/auth/profile/", { username: newUsername }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            console.log("Response:", response.data);
            setUserData(prevState => ({ ...prevState, username: newUsername }));
            setNewUsername("");
        } catch(error: any) {
            console.error("Error updating username:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        }
    };


    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/change-password/", {
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            console.error("Error updating password:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        }
    };


    const handleAccountDelete = async () => {
        try {
            const response = await axios.delete("http://127.0.0.1:8000/api/auth/delete-account/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });

            if (response.status === 204) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                router.push("/login");
            }
        } catch (error: any) {
            console.error("Error deleting account:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        };
    };


  return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-8">Profile Page</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
                <p className="mb-2"><strong>Username:</strong> {userData.username}</p>
                <p className="mb-2"><strong>Account Created:</strong> {new Date(userData.created_at).toLocaleString()}</p>
                <p className="mb-2"><strong>Last Updated:</strong> {new Date(userData.updated_at).toLocaleString()}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Change Username</h2>
                <form onSubmit={handleUsernameChange}>
                    <input
                        type="text"
                        placeholder="New Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Change Username
                    </button>
                </form>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={handlePasswordChange}>
                    <input
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 mb-4 bg-gray-700 rounded-lg text-white"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Change Password
                    </button>
                </form>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
                <button onClick={handleAccountDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;