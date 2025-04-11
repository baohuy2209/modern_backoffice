import * as React from "react";
import { validateToken } from "../api/validateToken";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";

export interface IAuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<IAuthGuardProps> = ({ children }) => {
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
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default AuthGuard;
