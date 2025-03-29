import React from 'react';
import { ReactComponent as LogoSVG } from '../assets/logo.svg';
const Header = ({ toggleSidebar }) => {
  return (
     <header>
        <div className="d-flex justify-content-between align-items-center gap-2 w-100">
            <button id="toggleSidebar" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </button>
            <h2 className="col-md-11 ms-3">Medical Consulting App</h2>
            <div>
                <a href="#" className="text-white mt-0 me-3"><i className="fas fa-user"></i></a>
                <a href="#" className="text-white me-3"><i className="fas fa-sign-out-alt"></i></a>
            </div>
        </div>
     </header>   
  );
};

export default Header;