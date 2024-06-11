"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const LoginPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const router = useRouter();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", form);

            console.log("Response:", response.data);
            
            // localStorage.setItem("token", response.data.token);
            if (response.status === 200) {
                const { access, refresh } = response.data.data.tokens;
                console.log("Access Token: ", access);
                console.log("Refresh Token: ", refresh);
                localStorage.setItem("access_token", access);
                localStorage.setItem("refresh_token", refresh);
            }
            router.push("/home");
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-3xl text-white font-bold mb-4 flex justify-center">Log In</h1>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="mb-4 p-2 w-full rounded-lg" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="mb-4 p-2 w-full rounded-lg" />
        <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full">
            Login
        </button>
        <div className="text-center text-white pt-5">
            <p>Don&apos;t have an account? <Link href="/signup" className="text-purple-400">Register</Link>
            </p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage