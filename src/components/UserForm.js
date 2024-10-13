import React, { useState } from "react";
import "../styles/App.css";
import { Link } from "react-router-dom";

const UserForm = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("handle", handle);
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch(
        "https://social-media-task-backend-3.onrender.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setName("");
        setHandle("");
        setImages([]);
      } else {
        alert(result.message || "Can't Submit!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="form-container">
      <div className="dashboard-header">
        <h2>Submit Your Details</h2>
        <Link
          to="/"
          className="logout-button"
          style={{ textDecoration: "none" }}
        >
          Home
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Social Media Handle"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          className="input"
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="input"
          required
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
