import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("token");

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://stock-management-system-backend-7g2f.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },

        body: JSON.stringify({
          fullName,
          email,
          mobileNumber,
          password,
          role,
        }),
      },
    );

    const data = await response.json();

    if (data.success) {
      alert("Registration Successful");

      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="mainUserRegistrationContainer w-[100%] flex flex-col items-center gap-[1vw] sm:gap-[0.5vw]">
      <div className="UserImg w-[25%] sm:w-[10%]">
        <img className="w-full" src="./src/assets/profile-image.png" alt="" />
      </div>
      <div className="UserRegistrationHeading text-[4vw] text-[#2c3550] sm:text-[1.3vw] font-[500]">
        New User Registration
      </div>
      <div className="UserRegistrationForm w-[90%] sm:w-[50%] bg-[#ffffff] border-[1.5px] border-[#d9dee8] rounded shadow-card px-[3vw] sm:px-[1.3vw] py-[2vw] sm:py-[1vw]">
        <form
          className="flex flex-col gap-[1vw] sm:gap-[0.4vw]"
          action=""
          onSubmit={handleRegister}
        >
          <div className="userRegisterInputFields">
            <label htmlFor="fullUserName">Full Name:</label>
            <input
              type="text"
              name=""
              id="fullUserName"
              placeholder="Enter Full Name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="userRegisterInputFields">
            <label htmlFor="emailAddress">Email:</label>
            <input
              type="email"
              name=""
              id="emailAddress"
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="userRegisterInputFields">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="tel"
              name=""
              id="mobileNumber"
              placeholder="Enter Mobile Number"
              onChange={(e) => setMobileNumber(e.target.value)}
              pattern="[0-9]{10}"
              minLength="10"
              maxLength="10"
              title="Please enter valid phone number"
              required
            />
          </div>

          <div className="flex justify-between w-[100%]">
            <div className="userRegisterInputFields w-[calc(100%-52%)]">
              <label htmlFor="password">Password:</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name=""
                  id="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
                  title="Password must be exactly 8 characters with uppercase, lowercase, number and special character"
                  minLength={8}
                  maxLength={8}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="userRegisterInputFields w-[calc(100%-52%)]">
              <label htmlFor="">Role:</label>
              <select
                required
                name=""
                id=""
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="actionBTN flex justify-between text-[#ffffff] w-[100%] mt-[2vw] sm:mt-[0.7vw] text-[2.5vw] sm:text-[1.2vw]">
            <button
              className="w-[calc(100%-51%)] bg-[#34b264] border-[1.5px] border-[#32a35d] rounded cursor-pointer py-[1.5vw] sm:py-[0.3vw]"
              type="submit"
            >
              Register
            </button>
            <button
              className="w-[calc(100%-51%)] bg-[#2d6deb] border-[1.5px] border-[#255cc5] rounded cursor-pointer py-[1.5vw] sm:py-[0.3vw]"
              type="reset"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="goToLoginPage flex gap-[1vw] sm:gap-[0.5vw] text-[2.5vw] sm:text-[1vw] text-[#4d4c4c]">
        <p>Already have an account?</p>
        <p
          className="text-[2.6vw] sm:text-[1.1vw] text-[#2d6deb] cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </p>
      </div>
    </div>
  );
}
export default UserRegistration;
