import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import User from '../models/user';
import 'bootstrap/dist/css/bootstrap.min.css';

const PatientRecord: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
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
            .then(data => setPatient(data))
            .catch(err => setError(err.message));
    }, [id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!patient) {
            setError("No patient data to save.");
            return;
        }

        fetch(`http://localhost:3004/users/patients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patient)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update patient");
            }
            navigate('/dashboard');
        })
        .catch(err => setError(err.message));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPatient(prev => prev ? { ...prev, [name]: value } : null);
    };

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    if (!patient) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <h1>Editar Paciente</h1>
            <form onSubmit={handleSubmit} className="form-group">
                <label className="form-label">
                    Nombre:
                    <input className="form-control"
                        type="text"
                        name="fullname"
                        value={patient.fullname || ''}
                        onChange={handleChange}
                    />
                </label><br />
                <label className="form-label">
                    Email:
                    <input className="form-control"
                        type="email"
                        name="email"
                        value={patient.email || ''}
                        onChange={handleChange}
                    />
                </label><br />
                <label className="form-label">
                    Edad:
                    <input className="form-control"
                        type="number"
                        name="age"
                        value={patient.age || ''}
                        onChange={handleChange}
                    />
                </label><br />
                <label className="form-label">
                    Fecha de nacimiento:
                    <input className="form-control"
                        type="date"
                        name="birthday"
                        value={patient.birthday || ''}
                        onChange={handleChange}
                    />
                </label><br />
                <button type="submit" className="btn btn-primary">Guardar cambios</button>
            </form>
        </div>
    );
};

export default PatientRecord;
