import React from 'react';
import '../App.css';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';


const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    console.log("Login attempt with:", username, password);
    
    try {
      // Cambia 'https://your-server.com/api/login' por la URL real de tu servidor
      const response = await fetch('http://localhost:3004/users/api/login', {
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
        if(data.role === "doctor"){
          navigate('/dashboard');
        }

        // Maneja aquí el éxito del login (p.ej. almacenar el token de sesión)
      } else {
        throw new Error(data.message || "Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Maneja aquí el error de login (p.ej. mostrar un mensaje al usuario)
    }
  };

  return (
    <div className="Login">
      <header className="App-header">
        <LoginForm onLogin={handleLogin} />
      </header>
    </div>
  );
}

export default Login;
