import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import AuthImage from "../components/HomePageImage";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = {
    name: name,
    email: email,
    password: password
  }
  const navigate = useNavigate();
localStorage.getItem("token");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", user);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
<div className="container mt-5">
  <div className="row align-items-center">
  <AuthImage />

    {/* Right column with register form */}
    <div className="col-md-6">
      <div className="card p-4 shadow">
        <h2 className="mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <p className="mt-3 text-center">
          Already a member?{" "}
          <a href="/login" className="text-decoration-none">
            Login here
          </a>
        </p>
      </div>
    </div>
  </div>
</div>

  );
}
