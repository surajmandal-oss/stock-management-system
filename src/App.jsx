import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HeadBar from "./HeadBar";
import SideNavbar from "./SideNavbar";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import ViewProducts from "./ViewProducts";
import StockUpdate from "./StockUpdate";
import Profile from "./Profile";
import Logout from "./Logout";
import { Suspense, useEffect, useState } from "react";
import UserRegistration from "./UserRegistration";
import UserLogin from "./UserLogin";

function App() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState(false);
  const [menu, setMenu] = useState(false);
  const [width, setWidth] = useState(true);

  const handleMenuVal = (newVal) => {
    setMenu(newVal);
  };

  useEffect(() => {
    const screenSize = () => {
      if (window.innerWidth > 639) {
        setWidth(false);
        setMenu(false);
      } else {
        setWidth(true);
      }
    };
    window.addEventListener("resize", screenSize);
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setUserLogin(isLoggedIn);
    if (isLoggedIn) {
      setLoading(true);
      getProductData();
    }
  }, []);
  const getProductData = async () => {
    const url = "http://10.198.199.54:3000/stocks";
    let response = await fetch(url);
    response = await response.json();
    setProductData(response);
    setLoading(false);
  };
  const getLogoutTrue = (value) => {
    setUserLogin(value);
  };
  return (
    <div className={"mainContainer bg-[#f1f3f8] min-h-screen"}>
      <div className="dashContent h-full">
        <div className="topContainer">
          <HeadBar
            userLogin={userLogin}
            sendData={handleMenuVal}
            sendMenu={menu}
          />
        </div>
        <div className="bottomContainer h-[calc(100%-50px)] flex">
          <div className="leftSideNavbar sm:w-[20%] bg-[#29417b] hidden sm:block min-h-screen">
            {userLogin && <SideNavbar />}
          </div>
          {width && menu && <SideNavbar sendData={handleMenuVal} />}
          {menu == false ? (
            <div className="rightContent w-[100%] sm:w-[80%] p-[1.5vw]">
              <Suspense fallback={<h2>Loading...</h2>}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      userLogin ? (
                        <Navigate to="/dashboard" />
                      ) : (
                        <UserRegistration />
                      )
                    }
                  />
                  <Route
                    path="/login"
                    element={<UserLogin loginTrue={setUserLogin} />}
                  />
                  <Route
                    path="/dashboard"
                    element={
                      userLogin ? (
                        <Dashboard
                          productData={productData}
                          loading={loading}
                        />
                      ) : (
                        <UserLogin loginTrue={setUserLogin} />
                      )
                    }
                  />
                  <Route
                    path="/addProduct"
                    element={
                      userLogin ? (
                        <AddProduct />
                      ) : (
                        <UserLogin loginTrue={setUserLogin} />
                      )
                    }
                  />
                  <Route
                    path="/viewProducts"
                    element={
                      userLogin ? (
                        <ViewProducts
                          productData={productData}
                          loading={loading}
                        />
                      ) : (
                        <UserLogin loginTrue={setUserLogin} />
                      )
                    }
                  />
                  <Route
                    path="/stockUpdate"
                    element={
                      userLogin ? (
                        <StockUpdate productData={productData} />
                      ) : (
                        <UserLogin loginTrue={setUserLogin} />
                      )
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      userLogin ? (
                        <Profile />
                      ) : (
                        <UserLogin loginTrue={setUserLogin} />
                      )
                    }
                  />
                  <Route
                    path="/logout"
                    element={
                      userLogin ? (
                        <Logout logoutTrue={getLogoutTrue} />
                      ) : (
                        <UserLogin loginTrue={setUserLogin} />
                      )
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
