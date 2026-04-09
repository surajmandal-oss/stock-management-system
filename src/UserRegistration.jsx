import { useNavigate } from "react-router-dom";

function UserRegistration() {
  const navigate = useNavigate();
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
          onSubmit={() => navigate("/login")}
        >
          <div className="userRegisterInputFields">
            <label htmlFor="fullUserName">Full Name:</label>
            <input
              type="text"
              name=""
              id="fullUserName"
              placeholder="Enter Full Name"
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
              required
            />
          </div>

          <div className="flex justify-between w-[100%]">
            <div className="userRegisterInputFields w-[calc(100%-52%)]">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name=""
                id="password"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="userRegisterInputFields w-[calc(100%-52%)]">
              <label htmlFor="">Role:</label>
              <select required name="" id="">
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
