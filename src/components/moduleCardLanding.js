import React from "react";

const ModuleCard = ({ image, title, subtitle, description }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="module-card position-relative overflow-hidden">
        <img src={image} alt={title} className="card-image w-100 h-100" />
        
        <div className="overlay-text position-absolute text-white text-start px-3 pb-3">
          <h5 className="fw-bold">{title}</h5>
          <p className="mb-2">{subtitle}</p>
        </div>

        <div className="overlay-description position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center px-4">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
