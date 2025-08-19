import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import NavigationBar from "./pages/NavigationBar";
import UsersPage from "./pages/Users";
import { COMMON, USER_ROLES } from "./utils/constants";
import { ToastContainer } from "react-toastify"

function Layout({ children }) {
  const isAuth = !!localStorage.getItem(COMMON.TOKEN);
  const role = localStorage.getItem(COMMON.ROLE);
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
  
  const isAuth = !!localStorage.getItem(COMMON.TOKEN);
  const role = localStorage.getItem(COMMON.ROLE);

  return (
    <BrowserRouter>
      <Layout>
      <ToastContainer />
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
              isAuth && role === USER_ROLES.ADMIN ? (
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
