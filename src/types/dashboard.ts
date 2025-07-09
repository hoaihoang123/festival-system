export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  activeStaff: number;
  pendingOrders: number;
  completedOrders: number;
  monthlyGrowth: number;
  customerSatisfaction: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

export interface Order {
  id: string;
  customerName: string;
  eventType: string;
  eventDate: Date;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  totalAmount: number;
  assignedStaff?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
  isActive: boolean;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
  price: number;
  originalPrice: number;
  image?: string;
  isActive: boolean;
}
