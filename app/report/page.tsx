"use client";

import { useState } from "react";

export default function DeleteReportPage() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const backendURL = "https://your-backend-domain.com/api/report"; // replace with your API URL

  const handleDelete = async () => {
    if (!id) {
      setMessage("Please enter an ID");
      return;
    }
    try {
      const res = await fetch(
        `https://blog-platform-qtbe.vercel.app/api/report?id=93`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setMessage(`Report with ID ${id} deleted successfully.`);
      } else {
        setMessage(data.error || "Failed to delete report.");
      }
      setId("");
    } catch (error) {
      setMessage("Error deleting report.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "3rem auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Delete Report</h1>
      <input
        type="text"
        placeholder="Enter Report ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          marginBottom: 12,
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={handleDelete}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#c00",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Delete Report
      </button>
      {message && <p style={{ marginTop: 16 }}>{message}</p>}
    </div>
  );
}
