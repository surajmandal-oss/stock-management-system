import React, { useState } from "react";
import { Box, Lock, Eye, EyeOff, ShieldCheck, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password Validation
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*]/.test(newPassword);
  const hasMinLength = newPassword.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasUpperCase || !hasNumber || !hasSpecialChar || !hasMinLength) {
      alert("Password does not meet requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const email = localStorage.getItem("resetEmail");

      const response = await fetch(
        "http://localhost:5000/api/users/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password: newPassword,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem("resetEmail");

        navigate("/passwordResetSuccess");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[90vh] bg-gray-100 flex justify-center items-center px-4 py-3">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Content */}
        <div className="px-6 md:px-10 py-5">
          {/* Icon */}
          <div className="flex justify-center mb-2">
            <div className="w-15 h-15 rounded-full bg-blue-50 flex items-center justify-center">
              <Lock className="text-blue-600" size={30} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
            Reset New Password
          </h2>

          <p className="text-center text-gray-500 text-sm mb-2">
            Enter your new password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="relative mb-2">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                maxLength={8}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-2 pl-14 pr-14 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-3">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                maxLength={8}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl py-2 pl-14 pr-14 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Rules */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-2 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="text-gray-500" size={20} />
                <h3 className="font-semibold text-gray-700 text-base">
                  Password must contain:
                </h3>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={
                      hasMinLength ? "text-green-500" : "text-gray-300"
                    }
                    size={20}
                  />

                  <span className="text-base">At least 8 characters</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={
                      hasUpperCase ? "text-green-500" : "text-gray-300"
                    }
                    size={20}
                  />

                  <span className="text-base">One uppercase letter</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={hasNumber ? "text-green-500" : "text-gray-300"}
                    size={20}
                  />

                  <span className="text-base">One number</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle
                    className={
                      hasSpecialChar ? "text-green-500" : "text-gray-300"
                    }
                    size={20}
                  />

                  <span className="text-base">One special character</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-xl text-base shadow-md"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
