import React, { useState } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = "http://localhost:4000";
    
    try {
    const response = await fetch(`${apiUrl}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("Login API response:", data);

    if (response.ok) {
      alert("Login successful!");

      // ✅ Save user data to localStorage
      localStorage.setItem("userData", JSON.stringify(data.user));

      localStorage.setItem("token", data.token);
      console.log(localStorage.getItem("token"));

      console.log(localStorage.getItem("userData"));
      
      // Save token or user info if needed: localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert(data.message || "Login failed. Please check credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }

  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl text-center font-bold font-libertinus mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to access</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label>Password</label>
          <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}/>

          <div className="options">
            <label>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}/>Remember me</label>
            <Link to="/forgot-password" className="text-[#007bff] font-medium hover:text-[#0056b3] transition-colors duration-300">Forgot password?</Link>
          </div>

          <button type="submit" className=" w-full relative overflow-hidden text-white font-bold bg-[#007bff] rounded-[5px] cursor-pointer py-2 px-4 
                  transition-colors duration-300 z-10
                  before:absolute before:top-0 before:left-1/2 before:w-0 before:h-full before:bg-[#0056b3] 
                  before:transition-all before:duration-300 before:ease-out 
                  hover:before:w-full hover:before:left-0
                  before:z-0"><span className="relative z-10">Sign In</span></button>
        </form>

        <p className="mt-5 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-[#007bff] font-medium hover:text-[#0056b3] transition-colors duration-300">Create now</Link>
        </p>

        <div className="mt-5 bg-[#ececec] p-3 text-xs text-center rounded">
          <p>Demo credentials for testing:</p>
          <p>Email: any@email.com | Password: any password</p>
        </div>
      </div>
    </div>
  );
}
