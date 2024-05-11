import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import User from '../models/user';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const PatientRecord: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Obtiene el ID del paciente desde la URL
    const [patient, setPatient] = useState<User | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetch(`http://localhost:3004/users/patients/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                return response.json();
            })
            .then(data => {
                const formattedDate = new Date(data.birthday).toISOString().split('T')[0];
                setPatient({ ...data, birthday: formattedDate });
            })
            .catch(err => setError(err.message));
    }, [id]);

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    if (!patient) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <h1>Patient Record</h1>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{patient.fullname}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{patient.email}</td>
                    </tr>
                    <tr>
                        <th>Age</th>
                        <td>{patient.age}</td>
                    </tr>
                    <tr>
                        <th>Birthday</th>
                        <td>{patient.birthday}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PatientRecord;
