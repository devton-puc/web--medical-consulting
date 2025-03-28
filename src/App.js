import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AppointmentList from './pages/AppointmentList';
import AppointmentForm from './pages/AppointmentForm';
import PatientList from './pages/PatientList';
import PatientForm from './pages/PatientForm';
import Header from './templates/Header';
import Footer from './templates/Footer';

function App() {
  return (
    <div class="wrapper">
    <Router>
      <Header />
      <div class="container">
      <main class="container my-5 content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment-list" element={<AppointmentList />} />
          <Route path="/appointment-form" element={<AppointmentForm />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/patient-form" element={<PatientForm />} />
        </Routes>
      </main>
      </div>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
