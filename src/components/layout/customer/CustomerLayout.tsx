import React from "react";
import { CustomerNavbar } from "./CustomerNavbar";
import { CustomerFooter } from "./CustomerFooter";
import ChatWidget from "@/components/customer/Chat/ChatWidget";

export const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomerNavbar />
      <main className="flex-1 w-full bg-[#fff]">{children}</main>
      <CustomerFooter />
      <ChatWidget />
    </div>
  );
};
