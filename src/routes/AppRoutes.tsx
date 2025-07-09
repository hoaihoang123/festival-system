import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import { AdminRoutes } from "./AdminRoutes";
import { ManagerRoutes } from "./ManagerRoutes";
import { StaffRoutes } from "./StaffRoutes";
import { CustomerRoutes } from "./CustomerRoutes";
import Home from "@/pages/customer/Home";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/manager/*" element={<ManagerRoutes />} />
      <Route path="/staff/*" element={<StaffRoutes />} />
      <Route path="/*" element={<CustomerRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
