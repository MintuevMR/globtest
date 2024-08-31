/* eslint-disable react/prop-types */
import React from "react";
import "./Card.css";

const Card = ({ user, handleCardClick }) => {
  return (
    <div className="card" onClick={() => handleCardClick(user)}>
      <div className="title">
        <h2>{user.name}</h2>
      </div>
      <div className="contact">
        <img src="./Frame 4806.svg" alt="" />
        <span>{user.phone}</span>
      </div>
      <div className="contact">
        <img src="./Frame 4807.svg" alt="" />
        <span>{user.email}</span>
      </div>
    </div>
  );
};

export default Card;
