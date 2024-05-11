import React from 'react';
import '../App.css';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { ToastContainer, toast } from 'react-toastify';


const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    console.log("Login attempt with:", username, password);
    
    try {
      // Cambia 'https://your-server.com/api/login' por la URL real de tu servidor
      const response = await fetch('http://localhost:3004/users/patient/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });


      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Login Successful", data);
        navigate(`/patient-record/${username}`);
        

        // Maneja aquí el éxito del login (p.ej. almacenar el token de sesión)
    } else {
        toast.error("Acceso denegado. No tienes los permisos necesarios para realizar esta acción.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        throw new Error(data.message || "Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Maneja aquí el error de login (p.ej. mostrar un mensaje al usuario)
    }
  };

  return (
    <div className="PatientLogin">
        <ToastContainer />
      <header className="App-header">
        <LoginForm onLogin={handleLogin} />
      </header>
    </div>
  );
}

export default Login;
