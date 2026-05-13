import { Mail, ArrowLeft, Box, Lock } from "lucide-react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/forgot-password",
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
        localStorage.setItem("resetEmail", email);

        localStorage.setItem("otpExpireTime", Date.now() + 2 * 60 * 1000);

        navigate("/verifyOTP");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Content */}
        <div className="px-6 md:px-10 py-5">
          {/* Lock Icon */}
          <div className="flex justify-center mb-3">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <Lock className="text-blue-600" size={45} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Forgot Password?
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-center leading-7 mb-4">
            Enter your registered email address.
            <br />
            We'll send you a reset link.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Input */}
            <div className="relative mb-3">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-gray-300 rounded-xl py-2.5 pl-14 pr-4 text-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-xl text-lg shadow-md"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back Button */}
          <button
            onClick={() => navigate("/login")}
            className="mt-4 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium mx-auto transition"
          >
            <ArrowLeft size={20} />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
