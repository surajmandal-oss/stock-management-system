import { FaBoxOpen } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
function HeadBar() {
  return (
    <div className="headContainer flex justify-between items-center w-[100%] h-[50px] overflow-y-hidden border-b-[1.5px] border-[#d9dee8]">
      <div className="navLeft w-[20%] bg-[#29417b] text-[#ffffff] h-[100%] flex justify-center items-center">
        <div className="leftItem p-[1.2vw] flex justify-between items-center gap-[0.8vw]">
          <div className="icon text-[1.7vw]">
            <FaBoxOpen />
          </div>
          <div className="lable text-[1.2vw]">Stock Management System</div>
        </div>
      </div>
      <div className="navRight w-[80%] flex items-center gap-[25px] py-[15px] pr-[5vw] justify-end">
        <div className="adminInfo flex text-[1.1vw] gap-[0.5vw]">
          <div className="wal">Welcome,</div>
          <div className="adminName font-[600]">Suraj</div>
        </div>
        <div className="adminEmail text-[1.1vw] text-[#3f3e3e]">
          suraj@example.com
        </div>
        <div className="logOut bg-[#2d6deb] text-[1vw] text-[#ffffff] py-[0.2vw] px-[1vw] rounded cursor-pointer border-[1.5px] border-[#255cc5] shadow-btn">
          <button className="cursor-pointer">Logout</button>
        </div>
        <div className="menuBar sm:hidden">
          <IoMenu />
        </div>
      </div>
    </div>
  );
}
export default HeadBar;
