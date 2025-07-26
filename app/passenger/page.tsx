"use client";
import { error } from "console";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();

  // Mock user data (replace with auth context or API in a real app)
  const user = { name: "Jane Doe" };
  async function searchNearYou() {
    router.push("/passenger/choose");
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const longtitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log("latitude", latitude);
        console.log("longitude", longtitude);
        console.log(position);
      },
      (error) => {
        if (error.code == error.PERMISSION_DENIED) {
          console.log("permission denied");
        } else if (error.code == error.POSITION_UNAVAILABLE) {
          alert("Location Info is not Avaliable");
          console.log("try again Location info is not available");
        } else if (error.code == error.TIMEOUT) {
          alert("Time took too long");
          console.log("Timeout it took too long ");
        } else {
          console.log("unknown error has occurred");
        }
      }
    );
  }
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/48/FFFFFF/2563EB?text=RE"
            alt="RideEasy Logo"
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            RideEasy
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg md:text-xl font-bold text-white hidden md:block">
            Welcome, {user.name}!
          </span>
          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <img
            src="https://via.placeholder.com/48"
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </header>

      {/* Company Promo Section */}
      <section className="bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Discover RideEasy
          </h2>
          <p className="text-gray-600 mb-4">
            At RideEasy, we connect you with reliable rides in minutes. Enjoy
            safe, affordable, and eco-friendly travel with our trusted drivers.
            Book now and experience the future of ride-sharing!
          </p>
          <a
            href="#"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Ad Space */}
      <section className="bg-yellow-100 p-4 mx-6 rounded-lg mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/80/FFFF00/000000?text=Ad"
            alt="Ad Banner"
            className="w-20 h-20 rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Ride with Ease!
            </h3>
            <p className="text-sm text-gray-600">
              Try our new eco-friendly electric vehicles today!
            </p>
          </div>
        </div>
        <a href="#" className="text-blue-600 hover:underline">
          Book Now
        </a>
      </section>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Promotional Banner */}
        <div className="bg-blue-100 p-4 rounded-lg mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-800">
              RideEasy Plus
            </h3>
            <p className="text-sm text-blue-600">
              Get 10% off your next 5 rides with our premium plan!
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Join Now
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-gray-600">Total Rides</h3>
            <p className="text-2xl font-bold text-blue-600">42</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm font-semibold text-gray-600">
              Rewards Points
            </h3>
            <p className="text-2xl font-bold text-blue-600">1,250</p>
          </div>
        </div>

        {/* Book a Ride Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Book Your Ride
          </h2>
          <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            <p className="text-gray-500">Map Placeholder (Google Maps API)</p>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Enter pickup location"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Find Ride
            </button>
          </div>
          <button
            onClick={searchNearYou}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            To The Find Ride
          </button>
        </div>

        {/* Recent Trips */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Trips
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="text-gray-700 font-medium">Downtown to Airport</p>
                <p className="text-sm text-gray-500">July 3, 2025 • 2:30 PM</p>
              </div>
              <p className="text-gray-800 font-semibold">$25.50</p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="text-gray-700 font-medium">Home to Mall</p>
                <p className="text-sm text-gray-500">July 2, 2025 • 10:15 AM</p>
              </div>
              <p className="text-gray-800 font-semibold">$15.75</p>
            </div>
          </div>
          <button className="mt-4 text-blue-600 hover:underline">
            View All Trips
          </button>
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <aside className="bg-white border-t p-4 flex justify-around md:hidden">
        <a
          href="#"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="text-xs">Home</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span className="text-xs">Trips</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center text-gray-sele600 hover:text-blue-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-xs">Profile</span>
        </a>
      </aside>
    </div>
  );
}
