import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute"; // Assuming ProtectedRoute is here
import { Layout } from "@/components/layout/Layout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import PermissionManagement from "@/pages/admin/PermissionManagement";
import ActivityLog from "@/pages/admin/ActivityLog";
import UserGroupManagement from "@/pages/admin/UserGroupManagement";
import MenuManagement from "@/pages/admin/MenuManagement";
import ComboManagement from "@/pages/admin/ComboManagement";
import PricingManagement from "@/pages/admin/PricingManagement";
import Reports from "@/pages/admin/Reports";
import GeneralSettings from "@/pages/admin/settings/GeneralSettings";
import NotificationSettings from "@/pages/admin/settings/NotificationSettings";
import SystemLogs from "@/pages/admin/settings/SystemLogs";
import InventoryManagement from "@/pages/admin/InventoryManagement";

export function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <AdminDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <UserManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/permissions"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <PermissionManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/activity"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <ActivityLog />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-groups"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <UserGroupManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <MenuManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/combos"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <ComboManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pricing"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <PricingManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute requiredRoles={["admin", "manager"]}>
            <Layout>
              <InventoryManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute requiredRoles={["admin", "manager"]}>
            <Layout>
              <Reports />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/general"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <GeneralSettings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/notifications"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <NotificationSettings />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/logs"
        element={
          <ProtectedRoute requiredRoles={["admin"]}>
            <Layout>
              <SystemLogs />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
