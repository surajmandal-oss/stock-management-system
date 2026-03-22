import { NavLink } from "react-router";
import { TiHome } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import { BsBoxFill } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa6";

function SideNavbar() {
  return (
    <div className="mainSideNav w-[100%]">
      <div className="sideNavLinks text-[#ffffff] p-[1vw] pt-[2vw] flex flex-col gap-[20px] text-[1.1vw] font-[500]">
        <div className="link1 flex items-center">
          <NavLink to="/" className="rounded">
            <TiHome className="text-[1.3vw]" />
            <span>Dashboard </span>
          </NavLink>
        </div>
        <div className="link2 flex items-center">
          <NavLink to="/addProduct" className="rounded">
            <IoIosAddCircle className="text-[1.3vw]" />
            <span> Add Product</span>
          </NavLink>
        </div>
        <div className="link3 flex items-center">
          {" "}
          <NavLink to="/viewProducts" className="rounded">
            <BsBoxFill className="text-[1.3vw]" />
            <span> View Products</span>
          </NavLink>
        </div>
        <div className="link4 flex items-center">
          {" "}
          <NavLink to="/stockUpdate" className="rounded">
            <TbRefresh className="text-[1.3vw]" />
            <span>Stock Update</span>
          </NavLink>
        </div>
        <div className="link5 flex items-center">
          {" "}
          <NavLink to="/profile" className="rounded">
            <FaUser className="text-[1.3vw]" />
            <span>Profile</span>
          </NavLink>
        </div>
        <div className="link6 flex items-center">
          {" "}
          <NavLink to="/logout" className="rounded">
            <FaPowerOff className="text-[1.3vw]" />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default SideNavbar;
