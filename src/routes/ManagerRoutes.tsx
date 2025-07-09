import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import ManagerSpecificReports from "@/pages/manager/ManagerSpecificReports";
import OrderManagement from "@/pages/manager/OrderManagement";
import StaffList from "@/pages/manager/StaffList";
import StaffSchedule from "@/pages/manager/StaffSchedule";
import StaffEvaluationAndReports from "@/pages/manager/StaffEvaluationAndReports";
import InventoryManagement from "@/pages/manager/InventoryManagement";

export function ManagerRoutes() {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <ProtectedRoute requiredRoles={["manager"]}>
            <Layout>
              <ManagerDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="reports"
        element={
          <ProtectedRoute requiredRoles={["manager"]}>
            <Layout>
              <ManagerSpecificReports />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute requiredRoles={["manager", "staff"]}>
            <Layout>
              <OrderManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="staff"
        element={
          <ProtectedRoute requiredRoles={["manager"]}>
            <Layout>
              <StaffList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="schedule"
        element={
          <ProtectedRoute requiredRoles={["manager"]}>
            <Layout>
              <StaffSchedule />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="evaluation-reports"
        element={
          <ProtectedRoute requiredRoles={["manager"]}>
            <Layout>
              <StaffEvaluationAndReports />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="inventory"
        element={
          <ProtectedRoute requiredRoles={["manager"]}>
            <Layout>
              <InventoryManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
