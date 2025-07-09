import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerHome from "@/pages/customer/Home";
import Home from "@/pages/customer/Home";
import Services from "@/pages/customer/Services";
import Booking from "@/pages/customer/Booking";
import History from "@/pages/customer/History";
import Profile from "@/pages/customer/Profile";
import AddressManagement from "@/pages/customer/AddressManagement";
import Support from "@/pages/customer/Support";
import ServiceDetail from "@/pages/customer/ServiceDetail";
import NotFound from "@/pages/customer/NotFound";

export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:id" element={<ServiceDetail />} />
      <Route path="booking" element={<Booking />} />
      <Route path="history" element={<History />} />
      <Route path="profile" element={<Profile />} />
      <Route path="addresses" element={<AddressManagement />} />
      <Route path="support" element={<Support />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="notifications" element={<Notifications />} /> */}
    </Routes>
  );
}
