import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function DonorSettings() {
  // Load from localStorage or use defaults
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Mohammed Abdullah",
          email: "mohammed@gmail.com",
          phone: "+974 5555 1234",
          profileImg: "/default-avatar.png",
          donations: 0,
          campaignsSupported: 0,
          totalAmount: "QAR 0",
        };
  });

  // Save changes to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleProfileUpdate = () => {
    if (!profile.name || !profile.email || !profile.phone) {
      return toast.error("All fields are required!");
    }
    toast.success("Profile updated successfully!");
  };

  const handlePasswordUpdate = () => {
    if (!password.current || !password.newPass || !password.confirm) {
      return toast.error("Please fill all fields!");
    }
    if (password.newPass !== password.confirm) {
      return toast.error("Passwords do not match!");
    }
    toast.success("Password updated successfully!");
    setPassword({ current: "", newPass: "", confirm: "" });
  };

  return (
    <div className="w-full min-h-screen bg-[#F2EDE9] p-6 mt-24">
      <Toaster />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="border p-3 rounded-md w-full"
            placeholder="Full Name"
          />
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="border p-3 rounded-md w-full"
            placeholder="Email Address"
          />
          <input
            type="text"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="border p-3 rounded-md w-full"
            placeholder="Phone Number"
          />
        </div>
        <button
          onClick={handleProfileUpdate}
          className="mt-4 px-6 py-2 bg-[#8A1538] text-white rounded-md"
        >
          Update Profile
        </button>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <div className="grid gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={password.current}
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
            className="border p-3 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={password.newPass}
            onChange={(e) =>
              setPassword({ ...password, newPass: e.target.value })
            }
            className="border p-3 rounded-md w-full"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={password.confirm}
            onChange={(e) =>
              setPassword({ ...password, confirm: e.target.value })
            }
            className="border p-3 rounded-md w-full"
          />
        </div>
        <button
          onClick={handlePasswordUpdate}
          className="mt-4 px-6 py-2 bg-[#8A1538] text-white rounded-md"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
