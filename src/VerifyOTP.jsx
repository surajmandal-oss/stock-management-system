import React, { useEffect, useRef, useState } from "react";
import { Box, Mail, Clock3 } from "lucide-react";
import { useNavigate } from "react-router";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  // Handle OTP Change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit
  const handleVerify = async () => {
    if (timeLeft === 0) {
      alert("OTP Expired");
      return;
    }
    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      alert("Please enter complete OTP");
      return;
    }

    try {
      const email = localStorage.getItem("resetEmail");

      const response = await fetch(
        "https://stock-management-system-backend-7g2f.onrender.com/api/users/verify-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            otp: finalOtp,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("otpExpireTime");
        navigate("/resetPassword");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Resend OTP Logic
  const handleResendOTP = async () => {
    try {
      const email = localStorage.getItem("resetEmail");

      const response = await fetch(
        "https://stock-management-system-backend-7g2f.onrender.com/api/users/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (data.success) {
        alert("New OTP Sent Successfully");

        localStorage.setItem("otpExpireTime", Date.now() + 2 * 60 * 1000);

        // Timer restart
        setTimeLeft(300);

        // Clear old OTP inputs
        setOtp(["", "", "", "", "", ""]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Valid otp timer
  useEffect(() => {
    const updateTimer = () => {
      const savedTime = localStorage.getItem("otpExpireTime");

      if (savedTime) {
        const remaining = Math.floor((parseInt(savedTime) - Date.now()) / 1000);

        if (remaining <= 0) {
          setTimeLeft(0);
        } else {
          setTimeLeft(remaining);
        }
      }
    };

    // First time run
    updateTimer();

    // Run every second
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  // Expire OTP timer logic
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("otpExpireTime");

    if (savedTime) {
      const remaining = Math.floor((parseInt(savedTime) - Date.now()) / 1000);

      return remaining > 0 ? remaining : 0;
    }

    return 300;
  });
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-5">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Content */}
        <div className="px-6 md:px-10 py-5">
          <div className="flex justify-center mb-5">
            <div className="w-18 h-18 rounded-full bg-blue-50 flex items-center justify-center">
              <Mail className="text-blue-600" size={40} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-900 mb-1">
            Verify OTP
          </h2>

          {/* Description */}
          <p className="text-center text-gray-500 leading-8 text-base mb-1">
            We have sent a 6-digit OTP to
          </p>

          <p className="text-center text-blue-600 font-semibold text-lg mb-3">
            {localStorage.getItem("resetEmail")}
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 md:gap-4 mb-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-8 h-10 md:w-10 md:h-12 border-2 border-gray-300 rounded-xl text-center text-lg font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="flex justify-center items-center gap-2 text-gray-500 mb-2">
            <Clock3 size={18} />
            <span className="text-base">
              {timeLeft > 0
                ? ` OTP expires in ${minutes}:${seconds}`
                : "OTP Expired"}
            </span>
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={timeLeft === 0}
            className={`w-full text-white font-semibold py-1 rounded-xl text-lg shadow-md transition ${
              timeLeft === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Verify OTP
          </button>

          {/* Resend */}
          <p className="text-center text-gray-500 mt-2 text-base">
            Didn't receive OTP?{" "}
            {timeLeft === 0 && (
              <span
                onClick={handleResendOTP}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Resend OTP
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
