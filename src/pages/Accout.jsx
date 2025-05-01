import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
//import profilePic from "../assets/Screenshot 2025-04-29 202625.png";

function Account() {
  return (
    <div className="bg-gray-100 min-h-screen mt-20">
      {/* Header */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Campus Feed</h1>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            {/* <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> */}
          </div>
          <span className="text-gray-800">Student</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center space-x-4">
              {/* <img src={profilePic} alt="Profile" className="w-16 h-16 rounded-full object-cover" /> */}
              <div>
                <h2 className="text-lg font-bold text-gray-800">Student Profile</h2>
                <p className="text-sm text-gray-500">367 connections</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded">Posts</button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded">About</button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded">Gallery</button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded">Videos</button>
              <button className="bg-gray-200 text-sm px-3 py-1 rounded">Connections</button>
            </div>
          </div>

          <div className="bg-white shadow rounded p-4 space-y-3">
            <h3 className="font-semibold text-gray-800">Profile Settings</h3>
            <button className="w-full bg-gray-100 py-2 rounded text-left px-3">Add bio</button>
            <button className="w-full bg-gray-100 py-2 rounded text-left px-3">Edit profile</button>
            <button className="w-full bg-gray-100 py-2 rounded text-left px-3">Add Interests</button>
          </div>

          <div className="bg-white shadow rounded p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Gallery</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="w-full h-24 bg-gray-200 rounded"></div>
              <div className="w-full h-24 bg-gray-200 rounded"></div>
              <div className="w-full h-24 bg-gray-200 rounded"></div>
              <div className="w-full h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Center Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded p-4">
            <input
              type="text"
              placeholder="What's happening on campus?"
              className="w-full border rounded px-4 py-2 text-sm mb-2"
            />
            <div className="flex justify-between items-center text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <FaCamera />
                <span>Photo</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm">Share</button>
            </div>
          </div>

          <div className="bg-white shadow rounded p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {/* <img src={profilePic} alt="Profile" className="w-8 h-8 rounded-full" /> */}
                <div>
                  <p className="text-sm font-semibold text-gray-800">Exploring</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
              <span className="bg-black text-white px-2 py-0.5 text-xs rounded">UPGRADE PLAN</span>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              I discovered a passion for traditional Ethiopian crafts. Check out my latest creations and projects. Embracing culture and creativity!
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="w-full h-24 bg-gray-200 rounded"></div>
              <div className="w-full h-24 bg-gray-200 rounded"></div>
              <div className="w-full h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-white shadow mt-6 p-4 flex justify-between items-center max-w-6xl mx-auto rounded">
        <p className="text-sm text-gray-600">Stay informed! Subscribe to the campus newsletter for exclusive offers!</p>
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter your university email"
            className="border px-3 py-1 rounded text-sm"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Account;
