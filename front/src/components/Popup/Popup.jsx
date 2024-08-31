/* eslint-disable react/prop-types */
import React from "react";
import "./Popup.css";

export const Popup = ({ user, closePopup }) => {
  const handlePopupBodyClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="popupContainer">
      <div className="popupBody" onClick={handlePopupBodyClick}>
        <div className="title">
          <h1>{user.name}</h1>
          <button onClick={closePopup}>
            <img src="icon.svg" alt="закрыть" />
          </button>
        </div>
        <div className="info">
          <div>
            <span>Телефон:</span>
            <span>{user.phone}</span>
          </div>
          <div>
            <span>Почта:</span>
            <span> {user.email}</span>
          </div>
          <div>
            <span>Дата приема:</span>
            <span>{user.hire_date}</span>
          </div>
          <div>
            <span>Должность:</span>
            <span>{user.position_name}</span>
          </div>
          <div>
            <span>Подразделение:</span>
            <span>{user.department}</span>
          </div>
        </div>
        <div className="cardFooter">
          <h3>Дополнительная информация:</h3>
          <span>
            Разработчики используют текст в качестве заполнителя макта страницы.
            Разработчики используют текст в качестве заполнителя макта страницы.
          </span>
        </div>
      </div>
    </div>
  );
};
