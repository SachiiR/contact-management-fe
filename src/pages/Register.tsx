import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { User } from "../types/user";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user: User = {
    name: name,
    email: email,
    password: password,
    id: "",
    role: ""
  }
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { user });
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
<form onSubmit={handleRegister} className="container mt-5" style={{ maxWidth: "400px" }}>
  <h2 className="mb-4 text-center">Register</h2>

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
  );
}
