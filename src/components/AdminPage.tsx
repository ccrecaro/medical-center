// src/components/AdminPage.tsx
import React from 'react';
import { useAuth } from './AuthContext';

const AdminPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard. Only authenticated users with admin rights can see this.</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default AdminPage;
