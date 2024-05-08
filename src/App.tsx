import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PatientRecord from './components/PatientRecord';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor/login" element={<Login />} />
        <Route path="/patient/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-patient/:id" element={<PatientRecord />} /> {/* Ruta para editar paciente */}
      </Routes>
    </Router>
  );
}

export default App;