import React, { createContext, useState, useContext } from 'react';
import Alert from '../components/Alert';
import Confirm from '../components/Confirm';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [alertProps, setAlertProps] = useState({
    visible: false,
    type: 'info',
    message: '',
    duration: 5000,
  });

  const [confirmProps, setConfirmProps] = useState({
    visible: false,
    title: '',
    body: '',
    onConfirm: () => {},
  });

  const showAlert = (message, type = 'info', duration = 5000) => {
    setAlertProps({ visible: true, message, type, duration });

    if (duration > 0) {
      setTimeout(() => closeAlert(), duration);
    }
  };

  const closeAlert = () => setAlertProps((prev) => ({ ...prev, visible: false }));

  const showConfirm = (body, onConfirm, title = 'Confirmação') => {
    setConfirmProps({
      visible: true,
      title,
      body,
      onConfirm: (result) => {
        onConfirm(result);
        closeConfirm();
      },
    });
  };

  const closeConfirm = () => setConfirmProps((prev) => ({ ...prev, visible: false }));

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm }}>
      {children}

      {alertProps.visible && (
        <Alert
          type={alertProps.type}
          message={alertProps.message}
          onClose={closeAlert}
        />
      )}

      {confirmProps.visible && (
        <Confirm
          title={confirmProps.title}
          body={confirmProps.body}
          onConfirm={confirmProps.onConfirm}
        />
      )}
    </ModalContext.Provider>
  );
};
