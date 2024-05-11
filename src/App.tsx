import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PatientEdition from './components/PatientEdition';
import PatientLogin from './components/PatientLogin';
import PatientRecord from './components/PatientRecord';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/doctor/login" element={<Login />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-patient/:id" element={<PatientEdition />} /> {/* Ruta para editar paciente */}
        <Route path="/patient-record/:id" element={<PatientRecord />} /> 
      </Routes>
    </Router>
  );
}

export default App;