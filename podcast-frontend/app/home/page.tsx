"use client";

//import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from "axios";
// import LogoutModal from '@/components/LogoutModal';
import Image from 'next/image'; // Import the Image component from the appropriate library
import Navbar from '@/components/Navbar';



const Home = () => {

  // const [isModalOpen, setModalOpen] = useState(false);
  const [podcasts, setPodcasts] = useState<any[]>([]);

  useEffect(() => {
      const fetchPodcasts = async () => {
        try {
          const response = await axios.get("https://api.podchaser.com/podcasts", {
            headers: {
              "Authorization": `Bearer YOUR_API_KEY`
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



  // const clearCookies = () => {
  //   document.cookie.split(";").forEach((c) => {
  //     document.cookie = c
  //       .replace(/^ +/, "")
  //       .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  //   });
  // };

  // const handleLogout = async () => {
  //   try {

  //     const accessToken = localStorage.getItem("access_token");
  //     const refreshToken = localStorage.getItem("refresh_token");

  //     if (!accessToken || !refreshToken) {
  //       console.log("No access or refresh token found")
  //       return;
  //     } else {
  //       console.log("Access Token: ", accessToken);
  //       console.log("Refresh Token: ", refreshToken);

  //     }

  //     const response = await axios.post("http://127.0.0.1:8000/api/auth/logout/", {
  //       refresh: refreshToken,
  //     }, {
  //       withCredentials: true,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${accessToken}`,
  //       },
  //     });
  //     if (response.status === 200) {
  //       localStorage.removeItem("access_token");
  //       localStorage.removeItem("refresh_token");
  //       clearCookies();
  //       window.location.href = "/login";
  //     }
  //   } catch (error: any) {
  //     console.error("Error logging out:", error);
  //     if (error.response) {
  //       console.error("Error response:", error.response.data);
  //     }
  //   }
  // };

  return (
    <Navbar>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* <nav className="flex justify-between items-center p-4 bg-gray-800">
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
        </nav> */}

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Top Rated Podcasts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


            {/* {podcasts.map((podcast: any) => (
              <div key={podcast.id} className="bg-gray-800 p-4 rounded-lg">
                <img src={podcast.image} alt={podcast.title} className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h2 className="text-xl font-bold mb-2">{podcast.title}</h2>
                <p className="text-gray-400">{podcast.description}</p>
                <a href={podcast.url} target="" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
                  Listen Now
                </a>
              </div>
            ))} */}


            <div className="bg-gray-800 p-4 rounded-lg">
              <Image
                src="https://images.pexels.com/photos/19761840/pexels-photo-19761840/free-photo-of-close-up-of-a-podcast-microphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Podcast Title"
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">Lorem Ipsum</h2>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et malesuada fames ac turpis.
              </p>
              <a href="#" target="" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
                Listen Now
              </a>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <Image
                src="https://images.pexels.com/photos/16183458/pexels-photo-16183458/free-photo-of-close-up-of-vintage-radio.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Podcast Title"
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">Elementum facilisis</h2>
              <p className="text-gray-400">
                Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Pulvinar etiam non quam lacus suspendisse faucibus interdum.
              </p>
              <a href="#" target="" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
                Listen Now
              </a>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <Image
                src="https://images.pexels.com/photos/484/sound-speaker-radio-microphone.jpg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Podcast Title"
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">Placerat Egestas</h2>
              <p className="text-gray-400">
                Placerat in egestas erat imperdiet. Nulla malesuada pellentesque elit eget gravida cum sociis. Et odio pellentesque diam volutpat commodo sed egestas egestas fringilla.
              </p>
              <a href="#" target="" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
                Listen Now
              </a>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <Image
                src="https://images.pexels.com/photos/226635/pexels-photo-226635.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Podcast Title"
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">Morbi Leo</h2>
              <p className="text-gray-400">
                Morbi leo urna molestie at elementum eu facilisis. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Suspendisse faucibus interdum posuere lorem ipsum dolor sit.
              </p>
              <a href="#" target="" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
                Listen Now
              </a>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <Image
                src="https://images.pexels.com/photos/8546516/pexels-photo-8546516.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Podcast Title"
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">Mauris Nunc</h2>
              <p className="text-gray-400">
                Mauris nunc congue nisi vitae suscipit tellus mauris a. Aliquam eleifend mi in nulla posuere sollicitudin. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Senectus et netus et malesuada fames.
              </p>
              <a href="#" target="" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
                Listen Now
              </a>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <Image
                src="https://images.pexels.com/photos/7600897/pexels-photo-7600897.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Podcast Title"
                width={300}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-bold mb-2">Massa Eget</h2>
              <p className="text-gray-400">
                Massa eget egestas purus viverra accumsan in. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Praesent semper feugiat nibh sed pulvinar proin gravida.
              </p>
              <a href="#" target="" rel="noopener noreferrer" className="text-purple-500 hover:underline mt-4 block">
                Listen Now
              </a>
            </div>

          </div>

        </div>
        {/* <LogoutModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleLogout}
        /> */}
      </div>
    </Navbar>
  );
};

export default Home;
