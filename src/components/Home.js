import React from "react";
import { Link } from "react-router-dom";

import "../styles/App.css";

function Home() {
  return (
    <div className="login-container">
      <h2>Who You Are ?</h2>
      <div className="links-container">
        <Link className="link" to="/user">
          <h2>User</h2>
        </Link>
        <Link className="link" to="/admin/dashboard">
          <h2>Admin</h2>
        </Link>
      </div>
    </div>
  );
}

export default Home;
