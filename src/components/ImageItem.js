import React from "react";
import { useParams } from "react-router-dom";
import "../styles/App.css";
const ImageItem = () => {
  const { name, handle, address } = useParams();

  return (
    <div className="image-item-container">
      <h2>User: {name}</h2>
      <h3>Social Media Handle: {handle}</h3>
      <div className="image-wrapper">
        <img
          src={`https://social-media-task-backend-3.onrender.com/${address}`}
          alt={`${name}'s submission`}
          className="uploaded-image"
        />
      </div>
    </div>
  );
};

export default ImageItem;
