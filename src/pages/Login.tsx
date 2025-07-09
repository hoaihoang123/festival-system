import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "manager") {
        navigate("/manager/dashboard", { replace: true });
      } else if (user.role === "staff") {
        navigate("/staff/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true }); // Default fallback
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <LoginForm
      onSuccess={() => {
        /* Navigation handled by useEffect */
      }}
    />
  );
}
