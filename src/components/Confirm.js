import React, { useEffect } from 'react';

const Confirm = ({ title, body, onConfirm }) => {
  useEffect(() => {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    document.body.appendChild(backdrop);

    return () => {
      document.body.removeChild(backdrop);
    };
  }, []);

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary-custom text-white">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => onConfirm(false)}
            ></button>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary-custom"
              onClick={() => onConfirm(true)}
            >
              Confirmar
            </button>
            <button
              type="button"
              className="btn btn-secondary-custom"
              onClick={() => onConfirm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
