import React, { useState, useEffect } from "react";

export default function DonorProfile() {
  const [profile, setProfile] = useState({
    name: "Guest Donor",
    email: "guest@example.com",
    phone: "+000 0000 0000",
    profileImg: "/default-avatar.png",
    donations: 0,
    campaignsSupported: 0,
    totalAmount: "QAR 0",
  });

  // Load profile from localStorage and update automatically
  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const {
    name,
    email,
    phone,
    profileImg,
    donations,
    campaignsSupported,
    totalAmount,
  } = profile;

  return (
    <div className="w-full min-h-screen bg-[#F2EDE9] p-6 mt-24">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center md:text-left">
        Donor Profile
      </h2>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left: Profile Info */}
        <div className="md:w-1/3 bg-gradient-to-b from-[#8A1538] to-[#B62F5E] flex flex-col items-center p-8">
          <img
            src={profileImg}
            alt={name}
            className="w-36 h-36 rounded-full border-4 border-white shadow-lg mb-6 object-cover"
          />
          <h3 className="text-xl md:text-2xl font-semibold text-white">{name}</h3>
          <p className="text-white/80 mt-1">{email}</p>
          <p className="text-white/80 mt-1">{phone}</p>
        </div>

        {/* Right: Stats */}
        <div className="md:w-2/3 p-8 flex flex-col gap-6">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">
            Account Statistics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#FFE5E5] text-[#8A1538] p-6 rounded-2xl shadow-md flex flex-col items-center">
              <p className="text-3xl font-bold">{donations || 0}</p>
              <p className="text-sm mt-2">Donations</p>
            </div>
            <div className="bg-[#FFD6E0] text-[#B62F5E] p-6 rounded-2xl shadow-md flex flex-col items-center">
              <p className="text-3xl font-bold">{campaignsSupported || 0}</p>
              <p className="text-sm mt-2">Campaigns Supported</p>
            </div>
            <div className="bg-[#FFC1D1] text-[#821435] p-6 rounded-2xl shadow-md flex flex-col items-center">
              <p className="text-3xl font-bold">{totalAmount || 0}</p>
              <p className="text-sm mt-2">Total Donated</p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-6 rounded-2xl shadow-inner">
            <h5 className="text-xl font-semibold text-gray-700 mb-3">
              Additional Information
            </h5>
            <p className="text-gray-600">
              {name} has been an active donor supporting multiple campaigns including
              healthcare, education, and relief initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
