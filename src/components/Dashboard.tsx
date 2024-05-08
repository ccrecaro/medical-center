import React, { useEffect, useState } from 'react';
import User from '../models/user';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap si lo instalaste via npm

function Dashboard() {
  const [patients, setPatients] = useState<User[]>([]);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    fetch('http://localhost:3004/users/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handlePatientClick = (patient: User) => {
    // Navegar a la nueva página de edición con el ID del paciente
    navigate(`/edit-patient/${patient.username}`);
  };

  return (
    <div className="container mt-4">
      <h1>Registro de Pacientes</h1>
      <p>Haz click en el paciente para desplegar su información</p>
      <table className="table table-hover table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Fecha nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.username} onClick={() => handlePatientClick(patient)}>
              <td>{patient.fullname}</td>
              <td>{patient.email}</td>
              <td>{patient.age}</td>
              <td>{patient.birthday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
