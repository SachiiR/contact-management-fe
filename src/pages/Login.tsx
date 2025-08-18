import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../store/slice/user/user.slice";
import { useDispatch } from "react-redux";
import AuthImage from "../components/HomePageImage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.user.role);
      console.log(res);
      dispatch(setCurrentUser(res.data.user));

      // Redirect
      navigate(res.data.user.role === "admin" ? "/users" : "/contacts");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
      <AuthImage />

        {/* Right column with login form */}
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <p className="mt-3 text-center">
              Not a user?{" "}
              <a href="/register" className="text-decoration-none">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
