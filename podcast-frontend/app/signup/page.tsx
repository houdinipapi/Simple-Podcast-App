"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from "axios"
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const SignUpPage = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/auth/register/", form);
            router.push("/login");
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-3xl text-white font-bold mb-4">Sign up</h1>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="bg-gray-700 text-white p-2 rounded-lg w-full mb-4"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="bg-gray-700 text-white p-2 rounded-lg w-full mb-4"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="bg-gray-700 text-white p-2 rounded-lg w-full mb-4"
            />
            
            <input
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                value={form.confirm_password}
                onChange={handleChange}
                className="bg-gray-700 text-white p-2 rounded-lg w-full mb-4"
            />
            <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full">
                Sign up
            </button>
            <div className="text-center text-white">
                <p>Already have an account? <Link href="/login" className="text-purple-400">Log in</Link>
                </p>
            </div>
        </form>
    </div>
  )
}

export default SignUpPage