
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { DashboardStats, RevenueData, Order } from '@/types/dashboard';
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  UserCheck,
  Clock,
  CheckCircle,
  TrendingUp,
  Smile
} from 'lucide-react';

// Mock data
const mockStats: DashboardStats = {
  totalOrders: 156,
  totalRevenue: 850000000,
  totalCustomers: 89,
  activeStaff: 12,
  pendingOrders: 8,
  completedOrders: 142,
  monthlyGrowth: 12.5,
  customerSatisfaction: 4.8
};

const mockRevenueData: RevenueData[] = [
  { month: '1', revenue: 65000000, orders: 12 },
  { month: '2', revenue: 72000000, orders: 15 },
  { month: '3', revenue: 68000000, orders: 13 },
  { month: '4', revenue: 81000000, orders: 18 },
  { month: '5', revenue: 89000000, orders: 21 },
  { month: '6', revenue: 95000000, orders: 24 },
];

const mockRecentOrders: Order[] = [
  {
    id: '1',
    customerName: 'Nguyễn Văn An',
    eventType: 'Tiệc cưới',
    eventDate: new Date('2024-07-15'),
    status: 'confirmed',
    totalAmount: 45000000,
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: '2',
    customerName: 'Trần Thị Bình',
    eventType: 'Sinh nhật',
    eventDate: new Date('2024-07-20'),
    status: 'pending',
    totalAmount: 8500000,
    createdAt: new Date('2024-06-12'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: '3',
    customerName: 'Lê Minh Cường',
    eventType: 'Hội nghị',
    eventDate: new Date('2024-07-25'),
    status: 'in-progress',
    totalAmount: 25000000,
    createdAt: new Date('2024-06-13'),
    updatedAt: new Date('2024-06-13'),
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          {
            title: 'Tổng đơn hàng',
            value: mockStats.totalOrders,
            description: 'Tất cả chi nhánh',
            icon: ShoppingCart,
            trend: { value: mockStats.monthlyGrowth, isPositive: true },
            color: 'primary' as const
          },
          {
            title: 'Doanh thu',
            value: formatCurrency(mockStats.totalRevenue),
            description: 'Tháng này',
            icon: DollarSign,
            trend: { value: 15.2, isPositive: true },
            color: 'success' as const
          },
          {
            title: 'Khách hàng',
            value: mockStats.totalCustomers,
            description: 'Đang hoạt động',
            icon: Users,
            trend: { value: 8.1, isPositive: true },
            color: 'info' as const
          },
          {
            title: 'Nhân viên',
            value: mockStats.activeStaff,
            description: 'Đang làm việc',
            icon: UserCheck,
            color: 'warning' as const
          }
        ];
      
      case 'manager':
        return [
          {
            title: 'Đơn chờ xử lý',
            value: mockStats.pendingOrders,
            description: 'Cần xem xét',
            icon: Clock,
            color: 'warning' as const
          },
          {
            title: 'Hoàn thành',
            value: mockStats.completedOrders,
            description: 'Tháng này',
            icon: CheckCircle,
            trend: { value: 12.3, isPositive: true },
            color: 'success' as const
          },
          {
            title: 'Doanh thu chi nhánh',
            value: formatCurrency(mockStats.totalRevenue * 0.3),
            description: user?.branch || 'Chi nhánh',
            icon: TrendingUp,
            trend: { value: 18.5, isPositive: true },
            color: 'primary' as const
          },
          {
            title: 'Đánh giá KH',
            value: `${mockStats.customerSatisfaction}/5`,
            description: 'Điểm trung bình',
            icon: Smile,
            color: 'success' as const
          }
        ];
      
      case 'staff':
        return [
          {
            title: 'Công việc hôm nay',
            value: 5,
            description: 'Cần hoàn thành',
            icon: Clock,
            color: 'primary' as const
          },
          {
            title: 'Đã hoàn thành',
            value: 23,
            description: 'Tuần này',
            icon: CheckCircle,
            color: 'success' as const
          },
          {
            title: 'Đơn hàng phụ trách',
            value: 8,
            description: 'Đang xử lý',
            icon: ShoppingCart,
            color: 'info' as const
          },
          {
            title: 'Hiệu suất',
            value: '94%',
            description: 'Tháng này',
            icon: TrendingUp,
            trend: { value: 5.2, isPositive: true },
            color: 'success' as const
          }
        ];
      
      default:
        return [];
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'manager': return 'Quản lý';
      case 'staff': return 'Nhân viên';
      default: return role;
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Chào mừng, {user?.name}!
        </h1>
        <p className="text-muted-foreground">
          {getRoleName(user?.role || '')} - {user?.branch && `Chi nhánh ${user.branch}`}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts and recent data */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart data={mockRevenueData} />
        </div>
        <div className="lg:col-span-3">
          <RecentOrders orders={mockRecentOrders} />
        </div>
      </div>
    </div>
  );
}
