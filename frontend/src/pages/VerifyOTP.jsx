import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useVerifyOTPMutation } from "../../Redux/slices/UserApi";

export default function OtpVerify() {
    const navigate = useNavigate();
    const email = localStorage.getItem("otpEmail");
   const [verifyOtp] = useVerifyOTPMutation();
    const [otp, setOtp] = useState("");

  

    const handleVerify = async () => {
        if (!otp) {
            toast.error("Enter OTP");
            return;
        }

        try {
            const res = await verifyOtp({ email, otp }).unwrap();
            console.log(res);

            toast.success("OTP Verified Successfully");

            // Clear email
            localStorage.removeItem("otpEmail");

            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Invalid OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">

                <h2 className="text-2xl font-bold mb-3">Verify Your Email</h2>
                <p className="text-gray-600 mb-4">
                    OTP sent to <b>{email}</b>
                </p>

                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full border px-4 py-2 rounded mb-4"
                />

                <button
                    onClick={handleVerify}
                    className="w-full py-2 rounded font-bold text-white"
                    style={{ background: "#821435" }}
                >
                    Verify OTP
                </button>

            </div>
        </div>
    );
}
