import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import NavigationBar from "./pages/NavigationBar";
import UsersPage from "./pages/Users";

export default function App() {
  const isAuth = !!localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log(role);
  return (
    <BrowserRouter>
    <NavigationBar />
    <div className="container mt-4">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={ isAuth ? <Contacts /> : <Navigate to="/login" />} />
        <Route
          path="/users"
          element={
            isAuth && role === "admin" ? <UsersPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}
