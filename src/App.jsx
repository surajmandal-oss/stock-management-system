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
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./ForgotPassword";
import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";
import PasswordResetSuccess from "./PasswordResetSuccess";

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

    return () => {
      window.removeEventListener("resize", screenSize);
    };
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
    try {
      const url = "http://localhost:5000/api/products";

      const token = localStorage.getItem("token");
      let response = await fetch(url, {
        headers: {
          authorization: token,
        },
      });
      let data = await response.json();

      console.log(data);

      setProductData(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
          {menu === false ? (
            <div className="rightContent w-[100%] sm:w-[80%] p-[1.5vw]">
              <Suspense fallback={<h2>Loading...</h2>}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      userLogin ? (
                        <Navigate to="/dashboard" />
                      ) : (
                        <UserRegistration loginTrue={setUserLogin} />
                      )
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      userLogin ? (
                        <Navigate to="/dashboard" />
                      ) : (
                        <UserLogin loginTrue={setUserLogin} />
                      )
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard
                          productData={productData}
                          loading={loading}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/addProduct"
                    element={
                      <ProtectedRoute>
                        <AddProduct refreshProducts={getProductData} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/viewProducts"
                    element={
                      <ProtectedRoute>
                        <ViewProducts
                          productData={productData}
                          loading={loading}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/stockUpdate"
                    element={
                      <ProtectedRoute>
                        <StockUpdate
                          productData={productData}
                          setProductData={setProductData}
                        />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/logout"
                    element={
                      <ProtectedRoute>
                        <Logout logoutTrue={getLogoutTrue} />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/verifyOTP" element={<VerifyOTP />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />
                  <Route
                    path="/passwordResetSuccess"
                    element={<PasswordResetSuccess />}
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
