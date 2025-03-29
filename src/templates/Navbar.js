import React from "react";
import { Link } from "react-router-dom";


const Navbar = ({ isCollapsed }) => {
  return (
    <nav id="sidebar" className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white"><i className="fas fa-home"></i><span>Inicio</span></Link>
        </li>
        <li className="nav-item">
          <Link to="/patient-list" className="nav-link text-white"><i className="fas fa-home"></i><span>Pacientes</span></Link>
        </li>
        <li className="nav-item">
          <Link to="/appointment-list" className="nav-link text-white"><i className="fas fa-home"></i><span>Consultas</span></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;