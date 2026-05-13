import React, { useEffect, useState } from "react";
import { Box, Check, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(5);

  // Auto Redirect Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/login");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-[90vh] bg-gray-100 flex justify-center items-center px-4 py-2">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Content */}
        <div className="px-6 md:px-10 py-3.5">
          {/* Success Icon */}
          <div className="flex justify-center mb-2">
            <div className="w-18 h-18 rounded-full bg-green-50 flex items-center justify-center">
              <Check className="text-green-500" size={50} strokeWidth={3} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Password Reset Successful!
          </h2>

          {/* Description */}
          <p className="text-center text-gray-500 text-lg leading-10 mb-3">
            Your password has been reset successfully.
            <br />
            You can now login with your
            <br />
            new password.
          </p>

          {/* Redirect Box */}
          <div className="border border-green-200 bg-green-50 rounded-2xl px-6 py-2 flex items-center gap-4 mb-3">
            <CheckCircle className="text-green-500 min-w-fit" size={30} />

            <p className="text-gray-700 text-base leading-8">
              You will be redirected to login page
              <br />
              in{" "}
              <span className="text-green-600 font-bold text-xl">
                {countdown}
              </span>{" "}
              seconds.
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-xl text-xl shadow-md"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
