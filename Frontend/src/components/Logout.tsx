// Fullstack/Frontend/src/components/Logout.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await onLogout();
      navigate("/");
    };

    logout();
  }, [navigate, onLogout]);

  return <div>Logging out...</div>;
};

export default Logout;
