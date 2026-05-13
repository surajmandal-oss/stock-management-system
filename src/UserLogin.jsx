import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserLogin({ loginTrue }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        loginTrue(true);

        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mainUserLoginContainer w-[100%] flex flex-col items-center gap-[1vw] sm:gap-[0.5vw]">
      <div className="UserImg w-[25%] sm:w-[10%]">
        <img className="w-full" src="./src/assets/profile-image.png" alt="" />
      </div>
      <div className="UserLoginHeading text-[4vw] text-[#2c3550] sm:text-[1.3vw] font-[500]">
        Login
      </div>
      <div className="UserLoginForm w-[90%] sm:w-[50%] bg-[#ffffff] border-[1.5px] border-[#d9dee8] rounded shadow-card px-[3vw] sm:px-[1.3vw] py-[2vw] sm:py-[1vw]">
        <form
          className="flex flex-col gap-[1vw] sm:gap-[0.4vw]"
          action=""
          onSubmit={onSubmitForm}
        >
          <div className="userLoginInputFields">
            <label htmlFor="loginUserEmail">Email:</label>
            <input
              type="email"
              name=""
              id="loginUserEmail"
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="userLoginInputFields">
            <label htmlFor="loginUserPassword">Password:</label>
            <input
              type="password"
              name=""
              id="loginUserPassword"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              maxLength={8}
              required
            />
          </div>
          <div className="forgotPassword w-[100%] flex justify-end">
            <p
              className="text-[2.6vw] sm:text-[0.9vw] text-[#2d6deb] cursor-pointer"
              onClick={() => navigate("/forgotPassword")}
            >
              Forgot Password?
            </p>
          </div>
          <div className="actionBTN flex justify-between text-[#ffffff] w-[100%] mt-[2vw] sm:mt-[0.7vw] text-[2.5vw] sm:text-[1.2vw]">
            <button
              className="w-full bg-[#34b264] border-[1.5px] border-[#32a35d] rounded cursor-pointer py-[1.5vw] sm:py-[0.3vw]"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="goToRegisterPage flex gap-[1vw] sm:gap-[0.5vw] text-[2.5vw] sm:text-[1vw] text-[#4d4c4c]">
        <p>Not yet registered?</p>
        <p
          className="text-[2.6vw] sm:text-[1.1vw] text-[#2d6deb] cursor-pointer"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            loginTrue(false);
            navigate("/");
          }}
        >
          Register
        </p>
      </div>
    </div>
  );
}
export default UserLogin;
