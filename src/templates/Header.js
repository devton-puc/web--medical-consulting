import React from 'react';
import logo from '../assets/logo.png';
const Header = ({ toggleSidebar }) => {
  return (
     <header>
        <div className="d-flex justify-content-between align-items-center gap-2 w-100">
            <button id="toggleSidebar" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </button>
            <div className="logo-app d-flex align-items-left">
                <img src={logo} alt="Logo" className="img-logo me-2" />
                <h2 className="mb-0">Medical Consulting</h2>
            </div>
            <div>
                <a href="#" className="text-white mt-0 me-3"><i className="fas fa-user"></i></a>
                <a href="#" className="text-white me-3"><i className="fas fa-sign-out-alt"></i></a>
            </div>
        </div>
     </header>   
  );
};

export default Header;