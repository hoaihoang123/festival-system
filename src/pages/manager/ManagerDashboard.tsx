import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Clock,
  DollarSign,
  CalendarDays,
} from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

// Mock data cho Dashboard của Manager
const mockManagerDashboardData = {
  ordersOverview: {
    total: 250,
    pending: 50,
    inProgress: 120,
    completed: 70,
    cancelled: 10,
  },
  keyOrders: [
    {
      id: "O001",
      customer: "Nguyễn Văn An",
      event: "Tiệc cưới",
      date: "2024-07-20",
      status: "IN_PROGRESS",
      priority: "Cao",
      notes: "Cần theo dõi sát sao",
    },
    {
      id: "O002",
      customer: "Trần Thị Bình",
      event: "Sinh nhật",
      date: "2024-07-22",
      status: "PENDING",
      priority: "Trung bình",
      notes: "Chờ xác nhận thực đơn",
    },
    {
      id: "O003",
      customer: "Lê Văn Cường",
      event: "Hội nghị",
      date: "2024-07-25",
      status: "COMPLETED",
      priority: "Thấp",
      notes: "Đã thanh toán đủ",
    },
  ],
  staffPerformance: [
    {
      id: "S001",
      name: "Nguyễn Thị D",
      completedOrders: 30,
      pendingOrders: 5,
      issuesReported: 1,
      averageRating: 4.8,
    },
    {
      id: "S002",
      name: "Phạm Văn E",
      completedOrders: 25,
      pendingOrders: 8,
      issuesReported: 0,
      averageRating: 4.5,
    },
    {
      id: "S003",
      name: "Hoàng Thị G",
      completedOrders: 35,
      pendingOrders: 3,
      issuesReported: 2,
      averageRating: 4.7,
    },
  ],
  revenueSummary: {
    today: 15000000,
    thisWeek: 75000000,
    thisMonth: 300000000,
  },
};

export default function ManagerDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Quản lý</h1>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      <Separator />

      {/* Order Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-5 w-5" /> Tổng quan đơn hàng
          </CardTitle>
          <CardDescription>
            Cái nhìn tổng thể về trạng thái đơn hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-primary">
                {mockManagerDashboardData.ordersOverview.total}
              </span>
              <p className="text-muted-foreground">Tổng số đơn</p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-yellow-500">
                {mockManagerDashboardData.ordersOverview.pending}
              </span>
              <p className="text-muted-foreground">Chờ xử lý</p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-blue-500">
                {mockManagerDashboardData.ordersOverview.inProgress}
              </span>
              <p className="text-muted-foreground">Đang thực hiện</p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-green-500">
                {mockManagerDashboardData.ordersOverview.completed}
              </span>
              <p className="text-muted-foreground">Đã hoàn thành</p>
            </div>
            {/* <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-red-500">{mockManagerDashboardData.ordersOverview.cancelled}</span>
              <p className="text-muted-foreground">Đã hủy</p>
            </div> */}
          </div>
        </CardContent>
      </Card>

      {/* Key Orders / Orders needing attention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="h-5 w-5 text-destructive" /> Đơn hàng cần
            chú ý
          </CardTitle>
          <CardDescription>
            Các đơn hàng ưu tiên cao hoặc có vấn đề cần xử lý
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Sự kiện</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Độ ưu tiên</TableHead>
                <TableHead>Ghi chú</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockManagerDashboardData.keyOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.event}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.priority}</TableCell>
                  <TableCell className="text-sm text-muted-foreground line-clamp-1">
                    {order.notes}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Staff Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Users className="h-5 w-5" /> Hiệu suất nhân viên
          </CardTitle>
          <CardDescription>
            Tổng quan nhanh về hiệu suất của đội ngũ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã NV</TableHead>
                <TableHead>Tên nhân viên</TableHead>
                <TableHead>Đơn hoàn thành</TableHead>
                <TableHead>Đơn chờ xử lý</TableHead>
                <TableHead>Vấn đề báo cáo</TableHead>
                <TableHead>Đánh giá TB</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockManagerDashboardData.staffPerformance.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.completedOrders}</TableCell>
                  <TableCell>{staff.pendingOrders}</TableCell>
                  <TableCell>{staff.issuesReported}</TableCell>
                  <TableCell>{staff.averageRating}/5</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Revenue Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <DollarSign className="h-5 w-5 text-green-600" /> Tóm tắt doanh thu
          </CardTitle>
          <CardDescription>
            Tổng quan doanh thu hôm nay, tuần này và tháng này
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
              <span className="text-3xl font-bold text-green-700">
                {formatCurrency(mockManagerDashboardData.revenueSummary.today)}
              </span>
              <p className="text-muted-foreground">Hôm nay</p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
              <span className="text-3xl font-bold text-green-700">
                {formatCurrency(
                  mockManagerDashboardData.revenueSummary.thisWeek
                )}
              </span>
              <p className="text-muted-foreground">Tuần này</p>
            </div>
            <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm">
              <span className="text-3xl font-bold text-green-700">
                {formatCurrency(
                  mockManagerDashboardData.revenueSummary.thisMonth
                )}
              </span>
              <p className="text-muted-foreground">Tháng này</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
