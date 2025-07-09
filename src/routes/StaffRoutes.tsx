import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import StaffDashboard from "@/pages/staff/StaffDashboard";
import StaffOrderManagement from "@/pages/staff/OrderManagement";
import OrderHistory from "@/pages/staff/OrderHistory";
import IngredientManagement from "@/pages/staff/IngredientManagement";
import ComboManagement from "@/pages/staff/ComboManagement";
import AssignmentManagement from "@/pages/staff/AssignmentManagement";
import EventManagement from "@/pages/staff/EventManagement";
import ReviewManagement from "@/pages/staff/ReviewManagement";
import HelpSupport from "@/pages/staff/HelpSupport";
import PaymentManagement from "@/pages/staff/PaymentManagement";

export function StaffRoutes() {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <StaffDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <StaffOrderManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="orders/history"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <OrderHistory />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="ingredients"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <IngredientManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="combos"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <ComboManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="assignments"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <AssignmentManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="events"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <EventManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="reviews"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <ReviewManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="help"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <HelpSupport />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="payments"
        element={
          <ProtectedRoute requiredRoles={["staff"]}>
            <Layout>
              <PaymentManagement />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
