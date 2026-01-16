import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
    });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", form);
      alert(res.data.message);
      navigate("/"); // redirect to login
    } catch (err) {
      alert(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.msg ||
          "Signup failed"
      );
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Please Sign Up</h2>

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
        required
      />
      <br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <br />

      <button type="submit" disabled={loading}>
        {loading ? "Signing Up..." : "Sign up"}
      </button>
    </form>
  );
}
