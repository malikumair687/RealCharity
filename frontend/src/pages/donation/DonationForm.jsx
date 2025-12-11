import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHandHoldingHeart,
  FaCalendar,
  FaTelegramPlane,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { SlPhone } from "react-icons/sl";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlineFileProtect } from "react-icons/ai";
import toast from "react-hot-toast";

export default function DonationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    subject: "",
    message: "",
    documentImg: null,
    preference: "",
    confirmation: false,
    price: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "documentImg") {
      setFormData({ ...formData, documentImg: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, confirmation: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple front-end validation
    if (!formData.fullName || !formData.email || !formData.price) {
      toast.error("Please fill all required fields!");
      return;
    }

    toast.success("Donation submitted successfully!");

    // Reset form
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
      subject: "",
      message: "",
      documentImg: null,
      preference: "",
      confirmation: false,
      price: "",
    });

    navigate("/"); // redirect to home
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40">
      <div className="max-w-3xl fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto bg-white rounded-xl shadow-2xl overflow-hidden w-full max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#493528] px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl text-white">
                <FaHandHoldingHeart />
              </span>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Support Our Mission
                </h1>
                <p className="text-gray-200 mt-1">
                  Fill out the form below to volunteer, donate, or ask us anything.
                </p>
              </div>
            </div>
            <div
              onClick={() => navigate("/")}
              className="text-white text-xl font-bold cursor-pointer hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Personal Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <CgProfile className="text-[#493528] text-lg" />
                <h2 className="text-lg font-semibold text-[#493528] border-b border-[#493528] pb-2 w-full">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#493528] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#493528] rounded-lg"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#493528] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#493528] rounded-lg"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#493528] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#493528] rounded-lg"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            {/* Help Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <IoMdHeartEmpty className="text-[#493528] text-lg" />
                <h2 className="text-lg font-semibold text-[#493528] border-b border-[#493528] pb-2 w-full">
                  How Would You Like to Help?
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#493528] mb-2">
                  I Want To *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#493528] rounded-lg"
                >
                  <option value="">Select an option</option>
                  <option value="Education for all">Education for all</option>
                  <option value="Clean water project">Clean water project</option>
                  <option value="Medical Aid for children">
                    Medical Aid for children
                  </option>
                  <option value="Food for families">Food for families</option>
                  <option value="Flood releif fund">Flood releif fund</option>
                  <option value="Hunger free drive">Hunger free drive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#493528] mb-2">
                  Donation Amount (PKR) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#493528] rounded-lg"
                  placeholder="Enter amount e.g. 5000"
                />
              </div>
            </div>

            {/* Message Section */}
            <div className="space-y-6">
              <label className="block text-sm font-medium text-[#493528] mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-[#493528] rounded-lg"
                placeholder="Tell us why you want to support our cause..."
              ></textarea>
              <input
                type="file"
                name="documentImg"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#493528] rounded-lg"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="confirmation"
                checked={formData.confirmation}
                onChange={handleChange}
                className="mt-1 w-4 h-4"
              />
              <p className="text-sm text-gray-600">
                I confirm that the information I've provided is accurate and I consent to being contacted.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-[#493528] pt-6 flex justify-end space-x-4">
              <button
                onClick={() => navigate("/")}
                type="button"
                className="px-6 py-2 border border-[#493528] text-[#493528] rounded-lg hover:bg-[#493528] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#493528] text-white rounded-lg hover:bg-[#3a2a1f] flex items-center space-x-2"
              >
                <FaTelegramPlane />
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
