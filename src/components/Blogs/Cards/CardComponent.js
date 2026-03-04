import React from "react";
import "./CardComponent.scss";
import yosemiteImg from "./bi1.jpeg"; // replace with your image path

const CardComponent = ({key,data}) => {

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-image">
          <img src={yosemiteImg} alt="Yosemite National Park" />
        </div>

        <div className="card-content">
          <h2 className="title">{data.title}</h2>
          <p className="subtitle">{data.subtitle}</p>
        </div>

        <div className="card-footer">
          <span>{data.footer}</span>
          <span className="divider"></span>
          <span>{data.updated}</span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;