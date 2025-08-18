import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import NavigationBar from "./pages/NavigationBar";
import UsersPage from "./pages/Users";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const isAuth = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // Hide navbar on login/register
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {isAuth && !hideNavbar && <NavigationBar />}
      <div className="container mt-4">{children}</div>
    </>
  );
}
export default function App() {
  // const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  // const [role, setRole] = useState(localStorage.getItem("role") || "");

  // Optional: keep state in sync if localStorage changes elsewhere
  // useEffect(() => {
  //   const handleStorage = () => {
  //     setIsAuth(!!localStorage.getItem("token"));
  //     setRole(localStorage.getItem("role") || "");
  //   };
  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);
  
  const isAuth = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      {/* {isAuth ? <NavigationBar setIsAuth={setIsAuth} setRole={setRole} /> : null}
      <div className="container mt-4"> */}
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/contacts"
            element={isAuth ? <Contacts /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={
              isAuth && role === "admin" ? (
                <UsersPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      {/* </div> */}
      </Layout>
    </BrowserRouter>
  );
}
