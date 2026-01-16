import React, { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    login(res.data.token, res.data.role);

    if (res.data.role === "admin") navigate("/admin");
    else if (res.data.role === "owner") navigate("/owner");
    else navigate("/user");
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password"
             onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button>Login</button>
      <p>
        New user? <Link to="/signup">Sign up here</Link>
      </p>
    </form>
  );
}
