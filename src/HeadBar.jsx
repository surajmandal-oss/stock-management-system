import { FaBoxOpen } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
function HeadBar({ userLogin, sendData, sendMenu }) {
  const navigate = useNavigate();
  const changValue = () => {
    sendData(!sendMenu);
  };
  return (
    <div className="headContainer flex flex-col sm:flex-row sm:justify-between sm:items-center w-[100%] sm:h-[50px] h-[100px] overflow-y-hidden border-b-[1.5px] border-[#d9dee8]">
      <div className="navLeft w-[100%] sm:w-[20%] bg-[#29417b] text-[#ffffff] sm:h-[100%] flex sm:justify-center sm:items-center max-[640px]:h-[50px]">
        <div className="leftItem p-[1.2vw] flex justify-between max-[640px]:items-center max-[640px]:w-[100%] max-[640px]:p-[4vw]">
          <div className="flex justify-between items-center gap-[0.8vw]">
            <div className="icon max-[640px]:text-[4vw] text-[1.7vw]">
              <FaBoxOpen />
            </div>
            <div className="lable max-[640px]:text-[2.5vw] text-[1.2vw]">
              Stock Management System
            </div>
          </div>
          {userLogin ? (
            <div
              className="menuBar sm:hidden flex max-[640px]:text-[4vw]"
              onClick={changValue}
            >
              {sendMenu ? <RxCross2 /> : <IoMenu />}
            </div>
          ) : null}
        </div>
      </div>

      {userLogin ? (
        <div className="navRight w-[100%] sm:w-[80%] max-[640px]:h-[50px] flex items-center gap-[25px] py-[15px] sm:pr-[5vw] justify-between sm:justify-end max-[640px]:px-[3vw] max-[640px]:py-[2vw]">
          <div className="sm:flex gap-[25px]">
            <div className="adminInfo flex text-[1.1vw] gap-[0.5vw] max-[640px]:text-[2.6vw]">
              <div className="wal">Welcome,</div>
              <div className="adminName font-[600]">Suraj</div>
            </div>
            <div className="adminEmail text-[1.1vw] text-[#3f3e3e] max-[640px]:text-[2.3vw]">
              suraj@example.com
            </div>
          </div>
          <div
            className="logOut bg-[#2d6deb] text-[2.4vw] sm:text-[1vw] text-[#ffffff] px-[3.5vw] py-[0.5vw] sm:py-[0.2vw] sm:px-[1vw] rounded cursor-pointer border-[1.5px] border-[#255cc5] shadow-btn"
            onClick={() => navigate("/logout")}
          >
            <button className="cursor-pointer">Logout</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default HeadBar;
