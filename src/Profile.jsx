function Profile() {
  return (
    <div className="profileContainer">
      <div className="profileContent">
        <div className="profileHeading text-[1.8vw] font-[500]">Profile</div>
        <div className="profileData flex bg-[#ffffff] border-[1.5px] border-[#d9dee8] rounded overflow-hidden shadow-card">
          <div className="profileLeftContainer w-[40%] flex justify-center items-center border-r-[1.5px] border-[#d9dee8]">
            <div className="profileImage">
              <img
                src="./src/assets/profile-image.png"
                alt="profile-image"
                srcset=""
              />
            </div>
          </div>
          <div className="profileRightContainer w-[60%] text-[1.2vw] text-[#4f4c4c]">
            <form action="">
              <div className="userAllInputFields p-[1.5vw] flex flex-col gap-[1vw]">
                <div className="fullName flex flex-col gap-[0.3vw]">
                  <label htmlFor="userName">Full Name:</label>
                  <input
                    className="profileInput"
                    type="text"
                    name=""
                    id="userName"
                    placeholder="Your Full Name"
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
                    required
                  />
                </div>
                <div className="userRole flex flex-col gap-[0.3vw] focus:outline-none">
                  <label htmlFor="">Role:</label>
                  <select name="" id="" className="profileInput" required>
                    <option value="">Select Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="actionProfileButton p-[1.5vw] border-t-[1.5px] border-[#d9dee8] flex justify-between items-center text-[1.1vw] text-[#ffffff] font-[500]">
                <div className="profileSaveBTN w-[calc(98%/2)] p-[0.5vw] flex justify-center items-center bg-[#34b264] border-[1.5px] border-[#32a35d] rounded cursor-pointer">
                  <button type="submit" className="cursor-pointer">
                    Save Changes
                  </button>
                </div>
                <div className="profileCancelBTN w-[calc(98%/2)] p-[0.5vw] flex justify-center items-center bg-[#2d6deb] border-[1.5px] border-[#255cc5] cursor-pointer rounded">
                  <button type="reset" className="cursor-pointer">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
