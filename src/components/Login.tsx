import React from 'react';
import '../App.css';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function checkPermissions(userPermissions: string) {
  const requiredPermissions = ['admin', 'editor']; // Ejemplo de permisos requeridos

  const hasPermission = requiredPermissions.every(role => userPermissions.includes(role));

  if (!hasPermission) {
    // Mostrar una alerta si el usuario no tiene los permisos necesarios
    toast.error("No tienes los permisos necesarios para realizar esta acción.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return false;
  }

  return true; // El usuario tiene todos los permisos necesarios
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    console.log("Login attempt with:", username, password);
    
    try {
      // Cambia 'https://your-server.com/api/login' por la URL real de tu servidor
      const response = await fetch('http://localhost:3004/users/doctor/login', {
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
        navigate('/dashboard');
        

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
    <div className="Login">
      <ToastContainer />
      <header className="App-header">
        <LoginForm onLogin={handleLogin} />
      </header>
    </div>
  );
}

export default Login;
