import { useNavigate } from "react-router-dom";

function Logout({ logoutTrue }) {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("isLoggedIn");
    logoutTrue(false);
    navigate("/login");
  };
  return (
    <div className="mainLogoutContainer text-[#2c3550] h-full relative">
      <div className="logoutHeading text-[3.5vw] sm:text-[1.8vw] font-[500]">
        Logout
      </div>
      <div className="logoutCenter w-[60%] sm:w-[50%] absolute top-50 sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="logoutContainer  flex flex-col justify-center items-center gap-[1.3vw] bg-[#ffffff] rounded shadow-card">
          <div className="lockImage w-[45%] sm:w-[27%] bg-cover">
            <img
              src="./src/assets/lock_image.png"
              alt="lock-image"
              className="w-[100%]"
            />
          </div>
          <label htmlFor="" className="text-[2.8vw] sm:text-[1.4vw] font-[500]">
            Logout
          </label>
          <p className="text-[1.9vw] sm:text-[1vw]">
            Are you sure you want to logout?
          </p>
          <div className="actionLogoutBTN w-[100%] flex justify-between items-center text-[2.5vw] sm:text-[1.2vw] text-[#ffffff] font-[500] px-[2.5vw] py-[4vw] sm:py-[1.5vw] border-t-[1.5px] border-[#d9dee8] bg-[#f1f3f8]">
            <div
              className="logoutBTN w-[calc(95%/2)] bg-red-600 border-[1.5px] border-[#c62727] p-[0.9vw] sm:p-[0.3vw] flex justify-center rounded"
              onClick={onLogout}
            >
              <button>Logout</button>
            </div>
            <div
              className="logCancelBTN w-[calc(95%/2)] bg-[#2d6deb] border-[1.5px] border-[#255cc5] p-[0.9vw] sm:p-[0.3vw] flex justify-center rounded"
              onClick={() => navigate("/dashboard")}
            >
              <button>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Logout;
