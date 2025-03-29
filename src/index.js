import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ModalProvider } from './providers/ModalContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import './custom.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>
);

