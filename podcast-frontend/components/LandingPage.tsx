import React from 'react'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/6877351/pexels-photo-6877351.jpeg')" }}>
        <div className="text-center text-white">
            <h1 className='text-4xl font-bold mb-4'>Enjoy the music with ListenPod</h1>
            <Link href="/signup" className='bg-purple-600 text-white py-2 px-4 rounded-lg'>
                Get started
            </Link>
        </div>
    </div>
  )
}

export default LandingPage