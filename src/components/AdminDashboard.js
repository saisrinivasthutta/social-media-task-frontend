import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = Cookies.get("is_logged_in");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        "https://social-media-task-backend-3.onrender.com/submissions"
      );
      const result = await response.json();
      setSubmissions(result.submissions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleLogout = () => {
    Cookies.remove("is_logged_in");
    navigate("/admin/login");
  };

  const handleResetDb = async () => {
    const response = await fetch(
      "https://social-media-task-backend-3.onrender.com/admin/reset-database",
      {
        method: "POST",
      }
    );
    if (response.ok) {
      alert("Database reset successfully!");
      fetchSubmissions();
    } else {
      console.error("Error resetting the database:", response.statusText);
    }
  };

  return (
    <div className="table-container">
      <div className="dashboard-header">
        <h2>User Submissions</h2>
        <div className="buttons-container">
          <Link
            to="/"
            className="logout-button"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <button
            type="button"
            onClick={handleResetDb}
            className="logout-button"
          >
            Reset Database
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>

      <table className="submissions-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Social Media Handle</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index}>
              <td>{submission.name}</td>
              <td>{submission.handle}</td>
              <td className="images-cell">
                {submission.images.split(",").map((image, idx) => (
                  <Link
                    to={`/image/${submission.name}/${submission.handle}/${image}`}
                  >
                    <img
                      key={idx}
                      src={`https://social-media-task-backend-3.onrender.com/${image}`}
                      alt="user upload"
                      className="submission-image"
                    />
                  </Link>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
