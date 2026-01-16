import React, { useState } from "react";
import api from "../services/api";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/update-password", {
        currentPassword,
        newPassword,
        confirmPassword
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Password</h3>

      <input
        type="password"
        placeholder="Current Password"
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button>Update Password</button>
    </form>
  );
}
