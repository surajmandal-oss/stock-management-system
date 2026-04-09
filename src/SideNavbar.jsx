import { NavLink } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import { BsBoxFill } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa6";

function SideNavbar({ sendData }) {
  const changValue = () => {
    updateData = false;
    sendData(updateData);
  };
  return (
    <div className="mainSideNav w-[100%] max-[640px]:bg-[#29417b] max-[640px]:h-[calc(100vh-100px)]">
      <div className="sideNavLinks text-[#ffffff] p-[2.5vw] sm:p-[1vw] pt-[2vw] flex flex-col gap-[20px] text-[2.5vw] sm:text-[1.1vw] font-[500]">
        <div className="link1 flex items-center">
          <NavLink to="/dashboard" onClick={changValue} className="rounded">
            <TiHome className="text-[3vw] sm:text-[1.3vw]" />
            <span>Dashboard </span>
          </NavLink>
        </div>
        <div className="link2 flex items-center">
          <NavLink to="/addProduct" onClick={changValue} className="rounded">
            <IoIosAddCircle className="text-[3vw] sm:text-[1.3vw]" />
            <span> Add Product</span>
          </NavLink>
        </div>
        <div className="link3 flex items-center">
          {" "}
          <NavLink to="/viewProducts" onClick={changValue} className="rounded">
            <BsBoxFill className="text-[3vw] sm:text-[1.3vw]" />
            <span> View Products</span>
          </NavLink>
        </div>
        <div className="link4 flex items-center">
          {" "}
          <NavLink to="/stockUpdate" onClick={changValue} className="rounded">
            <TbRefresh className="text-[3vw] sm:text-[1.3vw]" />
            <span>Stock Update</span>
          </NavLink>
        </div>
        <div className="link5 flex items-center">
          {" "}
          <NavLink to="/profile" onClick={changValue} className="rounded">
            <FaUser className="text-[3vw] sm:text-[1.3vw]" />
            <span>Profile</span>
          </NavLink>
        </div>
        <div className="link6 flex items-center">
          {" "}
          <NavLink to="/logout" onClick={changValue} className="rounded">
            <FaPowerOff className="text-[3vw] sm:text-[1.3vw]" />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default SideNavbar;
