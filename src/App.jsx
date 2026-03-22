import { Route, Routes } from "react-router";
import "./App.css";
import HeadBar from "./HeadBar";
import SideNavbar from "./SideNavbar";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProducts";
import StockUpdate from "./StockUpdate";
import Profile from "./Profile";
import Logout from "./Logout";
import { Suspense } from "react";

function App() {
  return (
    <div className="mainContainer bg-[#f1f3f8] h-screen">
      <div className="dashContent h-full">
        <div className="topContainer">
          <HeadBar />
        </div>
        <div className="bottomContainer h-[calc(100%-50px)] flex">
          <div className="leftSideNavbar w-[20%]  bg-[#29417b] hidden sm:block">
            <SideNavbar />
          </div>
          <div className="rightContent w-[100%] sm:w-[80%] p-[1.5vw]">
            <Suspense fallback={<h2>Loading...</h2>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/viewProducts" element={<ViewProducts />} />
                <Route path="/stockUpdate" element={<StockUpdate />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
