import React from "react";


const Alert = ({ type, message, onClose }) => {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show modal-alert`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;