import { Spin } from "antd";
import React from "react";
import { validateToken } from "../api/validateToken";
import { Navigate } from "react-router-dom";
interface GuestGuardProps {
  children: React.ReactNode;
}
const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      setIsAuthenticated(isValid);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
export default GuestGuard;
