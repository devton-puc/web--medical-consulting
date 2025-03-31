import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AppointmentList from './pages/AppointmentList';
import AppointmentForm from './pages/AppointmentForm';
import PatientList from './pages/PatientList';
import PatientForm from './pages/PatientForm';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import Header from './templates/Header';
import Footer from './templates/Footer';
import Navbar from './templates/Navbar';


function App() {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Router>
        <Header toggleSidebar={toggleSidebar} /> {/* Passa a função como prop para o Header */}
        <div className="container-fluid">
          <Navbar isCollapsed={isCollapsed} /> {/* Passa o estado para o Navbar */}
          <main className={`content ${isCollapsed ? 'collapsed' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointment-list" element={<AppointmentList />} />
              <Route path="/appointment-form/patient/:patient_id/:action" element={<AppointmentForm />} />
              <Route path="/appointment-confirmation/:appointment_id" element={<AppointmentConfirmation />} /> 
              <Route path="/patient-list" element={<PatientList />} />
              <Route path="/patient-form/:action" element={<PatientForm />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </Router>      
    </>
  );
}

export default App;