import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../src/assets/profile-image.png";

function Profile() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getProfile();
  }, []);

  // Get profile data from database
  const getProfile = async () => {
    try {
      const response = await fetch(
        "https://stock-management-system-backend-7g2f.onrender.com/api/auth/profile",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        },
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        setFullName(data.user.fullName);
        setEmail(data.user.email);
        setMobileNumber(data.user.mobileNumber);
        setRole(data.user.role);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update profile data fron database
  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://stock-management-system-backend-7g2f.onrender.com/api/auth/profile/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },

          body: JSON.stringify({
            fullName,
            email,
            mobileNumber,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Profile Updated Successfully");
        getProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profileContainer">
      <div className="profileContent">
        <div className="profileHeading text-[3.5vw] text-[#2c3550] sm:text-[1.8vw] font-[500]">
          Profile
        </div>
        <div className="profileData flex flex-col sm:flex-row bg-[#ffffff] border-[1.5px] border-[#d9dee8] rounded overflow-hidden shadow-card">
          <div className="profileLeftContainer w-[100%] sm:w-[40%] flex justify-center items-center sm:border-r-[1.5px] sm:border-[#d9dee8]">
            <div className="profileImage max-[640px]:w-[40%]">
              <img src={profileImage} alt="profile-image" />
            </div>
          </div>
          <div className="profileRightContainer w-[100%] sm:w-[60%] text-[2.5vw] sm:text-[1.2vw] text-[#2c3550]">
            <form action="" onSubmit={updateProfile}>
              <div className="userAllInputFields p-[3vw] sm:p-[1.5vw] flex flex-col gap-[1.5vw] sm:gap-[1vw]">
                <div className="fullName flex flex-col gap-[1vw] sm:gap-[0.3vw]">
                  <label htmlFor="userName">Full Name:</label>
                  <input
                    className="profileInput"
                    type="text"
                    name=""
                    id="userName"
                    placeholder="Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="email flex flex-col gap-[0.3vw]">
                  <label htmlFor="userEmail">Email:</label>
                  <input
                    className="profileInput"
                    type="email"
                    name=""
                    id="userEmail"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="phoneNumber flex flex-col gap-[0.3vw]">
                  <label htmlFor="userNumber">Mobile Number:</label>
                  <input
                    className="profileInput"
                    type="tel"
                    name=""
                    id="userNumber"
                    placeholder="+91 XXXXXXXXXX"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    pattern="[0-9]{10}"
                    minLength="10"
                    maxLength="10"
                    title="Please enter valid phone number"
                    required
                  />
                </div>
                <div className="userRole flex flex-col gap-[0.3vw] focus:outline-none">
                  <label htmlFor="">Role:</label>
                  <input
                    name=""
                    id=""
                    className="profileInput cursor-not-allowed"
                    value={role}
                    disabled
                    required
                  />
                </div>
              </div>
              <div className="actionProfileButton p-[6vw] sm:p-[1.5vw] border-t-[1.5px] border-[#d9dee8] flex justify-between items-center text-[2.7vw] sm:text-[1.1vw] text-[#ffffff] font-[500]">
                <button
                  type="submit"
                  className="profileSaveBTN w-[calc(98%/2)] p-[1vw] sm:p-[0.5vw] flex justify-center items-center bg-[#34b264] border-[1.5px] border-[#32a35d] rounded cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="profileCancelBTN w-[calc(98%/2)] p-[1vw] sm:p-[0.5vw] flex justify-center items-center bg-[#2d6deb] border-[1.5px] border-[#255cc5] cursor-pointer rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
