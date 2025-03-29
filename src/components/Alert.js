import React from 'react';

const Alert = ({ type, message, onClose }) => {
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1050,
        minWidth: '300px',
      }}
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
