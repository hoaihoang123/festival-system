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
  Building2,
  ShoppingCart,
  Users,
  CheckCircle,
  XCircle,
  ClipboardList,
  Star,
  CalendarDays,
  DollarSign,
  PieChart,
  BarChart,
  Briefcase,
  Clock,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data
const mockBranches = [
  { id: "HN", name: "Chi nhánh Hà Nội" },
  { id: "HCM", name: "Chi nhánh Hồ Chí Minh" },
  { id: "DN", name: "Chi nhánh Đà Nẵng" },
];

const mockStaffs = [
  { id: "NV001", name: "Nguyễn Văn A", branchId: "HN" },
  { id: "NV002", name: "Trần Thị B", branchId: "HN" },
  { id: "NV003", name: "Lê Văn C", branchId: "HCM" },
  { id: "NV004", name: "Phạm Thị D", branchId: "DN" },
];

const mockBranchReports = {
  HN: {
    revenue: 120000000,
    orders: 100,
    completedOrders: 80,
    staffPerformance: [
      {
        id: "NV001",
        name: "Nguyễn Văn A",
        completedOrders: 30,
        issues: 2,
        rating: 4.7,
      },
      {
        id: "NV002",
        name: "Trần Thị B",
        completedOrders: 25,
        issues: 1,
        rating: 4.5,
      },
    ],
  },
  HCM: {
    revenue: 90000000,
    orders: 80,
    completedOrders: 65,
    staffPerformance: [
      {
        id: "NV003",
        name: "Lê Văn C",
        completedOrders: 40,
        issues: 0,
        rating: 4.9,
      },
    ],
  },
  DN: {
    revenue: 60000000,
    orders: 50,
    completedOrders: 40,
    staffPerformance: [
      {
        id: "NV004",
        name: "Phạm Thị D",
        completedOrders: 28,
        issues: 0,
        rating: 4.6,
      },
    ],
  },
};

const mockManagerTaskReport = {
  assignedOrders: 50,
  issuesResolved: 15,
  cancellationRequestsApproved: 5,
  averageResolutionTime: "2.5 giờ",
};

const mockDetailedStaffPerformance = {
  NV001: {
    totalOrders: 30,
    completedOrders: 28,
    cancelledOrders: 2,
    averageProcessingTime: "2.1 giờ",
    customerRatings: [
      {
        id: "R001",
        score: 5,
        comment: "Rất chuyên nghiệp!",
        date: "2024-07-18",
      },
      { id: "R002", score: 4, comment: "Hài lòng", date: "2024-07-17" },
    ],
  },
  NV002: {
    totalOrders: 25,
    completedOrders: 24,
    cancelledOrders: 1,
    averageProcessingTime: "2.3 giờ",
    customerRatings: [
      {
        id: "R003",
        score: 5,
        comment: "Nhanh chóng, hiệu quả",
        date: "2024-07-16",
      },
    ],
  },
};

// Thêm mock data cho báo cáo tồn kho
const mockInventoryReports = {
  HN: {
    totalItems: 150,
    lowStockItems: 12,
    overstockItems: 5,
    stockValue: 75000000,
    stockTrend: [
      { date: "2024-07-01", value: 120 },
      { date: "2024-07-08", value: 135 },
      { date: "2024-07-15", value: 150 },
    ],
    categoryDistribution: [
      { name: "Nguyên liệu", value: 60 },
      { name: "Combo", value: 30 },
      { name: "Đồ uống", value: 40 },
      { name: "Khác", value: 20 },
    ],
    lowStockItemsList: [
      { id: "I001", name: "Thịt bò", currentStock: 5, threshold: 10 },
      { id: "I002", name: "Rau xanh", currentStock: 3, threshold: 8 },
      { id: "I003", name: "Gia vị", currentStock: 2, threshold: 15 },
    ],
  },
  HCM: {
    totalItems: 180,
    lowStockItems: 15,
    overstockItems: 8,
    stockValue: 90000000,
    stockTrend: [
      { date: "2024-07-01", value: 150 },
      { date: "2024-07-08", value: 165 },
      { date: "2024-07-15", value: 180 },
    ],
    categoryDistribution: [
      { name: "Nguyên liệu", value: 70 },
      { name: "Combo", value: 35 },
      { name: "Đồ uống", value: 45 },
      { name: "Khác", value: 30 },
    ],
    lowStockItemsList: [
      { id: "I004", name: "Hải sản", currentStock: 4, threshold: 12 },
      { id: "I005", name: "Trái cây", currentStock: 6, threshold: 15 },
      { id: "I006", name: "Bánh ngọt", currentStock: 3, threshold: 10 },
    ],
  },
  DN: {
    totalItems: 120,
    lowStockItems: 8,
    overstockItems: 3,
    stockValue: 60000000,
    stockTrend: [
      { date: "2024-07-01", value: 100 },
      { date: "2024-07-08", value: 110 },
      { date: "2024-07-15", value: 120 },
    ],
    categoryDistribution: [
      { name: "Nguyên liệu", value: 50 },
      { name: "Combo", value: 25 },
      { name: "Đồ uống", value: 30 },
      { name: "Khác", value: 15 },
    ],
    lowStockItemsList: [
      { id: "I007", name: "Thịt heo", currentStock: 7, threshold: 15 },
      { id: "I008", name: "Gia vị", currentStock: 4, threshold: 12 },
      { id: "I009", name: "Đồ khô", currentStock: 5, threshold: 10 },
    ],
  },
};

// Thêm mock data cho dự báo nhu cầu
const mockDemandForecast = {
  HN: {
    nextWeek: [
      { item: "Thịt bò", current: 5, forecast: 8, trend: "up" },
      { item: "Rau xanh", current: 3, forecast: 6, trend: "up" },
      { item: "Gia vị", current: 2, forecast: 4, trend: "up" },
    ],
    nextMonth: [
      { item: "Thịt bò", current: 5, forecast: 12, trend: "up" },
      { item: "Rau xanh", current: 3, forecast: 10, trend: "up" },
      { item: "Gia vị", current: 2, forecast: 8, trend: "up" },
    ],
  },
  HCM: {
    nextWeek: [
      { item: "Hải sản", current: 4, forecast: 7, trend: "up" },
      { item: "Trái cây", current: 6, forecast: 9, trend: "up" },
      { item: "Bánh ngọt", current: 3, forecast: 5, trend: "up" },
    ],
    nextMonth: [
      { item: "Hải sản", current: 4, forecast: 11, trend: "up" },
      { item: "Trái cây", current: 6, forecast: 13, trend: "up" },
      { item: "Bánh ngọt", current: 3, forecast: 8, trend: "up" },
    ],
  },
  DN: {
    nextWeek: [
      { item: "Thịt heo", current: 7, forecast: 10, trend: "up" },
      { item: "Gia vị", current: 4, forecast: 7, trend: "up" },
      { item: "Đồ khô", current: 5, forecast: 8, trend: "up" },
    ],
    nextMonth: [
      { item: "Thịt heo", current: 7, forecast: 14, trend: "up" },
      { item: "Gia vị", current: 4, forecast: 10, trend: "up" },
      { item: "Đồ khô", current: 5, forecast: 12, trend: "up" },
    ],
  },
};

export default function ManagerSpecificReports() {
  const [activeTab, setActiveTab] = useState("branch");
  const [selectedBranch, setSelectedBranch] = useState(mockBranches[0].id);
  const [selectedStaff, setSelectedStaff] = useState(mockStaffs[0].id);
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

  const currentBranchReport = mockBranchReports[selectedBranch];
  const currentDetailedStaffPerformance =
    mockDetailedStaffPerformance[selectedStaff];

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Báo cáo Quản lý Chi tiết
          </h1>
          <p className="text-muted-foreground mt-2">
            Các báo cáo chuyên biệt dành cho người quản lý.
          </p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      <Separator />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-fit p-1 h-auto bg-muted/40 rounded-lg shadow-inner mb-6">
          <TabsTrigger
            value="branch"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            <Building2 className="h-4 w-4 mr-2" />
            Theo chi nhánh
          </TabsTrigger>
          <TabsTrigger
            value="my-tasks"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Tác vụ của tôi
          </TabsTrigger>
          <TabsTrigger
            value="staff-detail"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            <Users className="h-4 w-4 mr-2" />
            Hiệu suất nhân viên
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            <Package className="h-4 w-4 mr-2" />
            Báo cáo tồn kho
          </TabsTrigger>
        </TabsList>

        {/* Tab Content: Báo cáo theo chi nhánh */}
        <TabsContent value="branch" className="mt-6 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Chọn chi nhánh
              </CardTitle>
              <CardDescription>
                Xem báo cáo cho từng chi nhánh cụ thể.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Chọn chi nhánh" />
                </SelectTrigger>
                <SelectContent>
                  {mockBranches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {currentBranchReport && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Doanh thu chi nhánh
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(currentBranchReport.revenue)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tổng doanh thu trong kỳ
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Tổng đơn hàng
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentBranchReport.orders}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tổng số đơn trong kỳ
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Đơn hoàn thành
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentBranchReport.completedOrders}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Đơn hàng đã hoàn thành
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Hiệu suất nhân viên chi nhánh</CardTitle>
                  <CardDescription>
                    Thống kê hiệu suất của nhân viên thuộc chi nhánh này
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã NV</TableHead>
                        <TableHead>Tên nhân viên</TableHead>
                        <TableHead>Đơn hoàn thành</TableHead>
                        <TableHead>Vấn đề báo cáo</TableHead>
                        <TableHead>Đánh giá TB</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentBranchReport.staffPerformance.map((staff) => (
                        <TableRow key={staff.id}>
                          <TableCell>{staff.id}</TableCell>
                          <TableCell>{staff.name}</TableCell>
                          <TableCell>{staff.completedOrders}</TableCell>
                          <TableCell>{staff.issues}</TableCell>
                          <TableCell>{staff.rating}/5</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Tab Content: Tác vụ của quản lý */}
        <TabsContent value="my-tasks" className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold">Báo cáo Tác vụ Quản lý</h2>
          <p className="text-muted-foreground mb-4">
            Tổng quan về các tác vụ quản lý và hiệu suất cá nhân.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Đơn hàng được phân công
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockManagerTaskReport.assignedOrders}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tổng số đơn hàng đã được phân công cho quản lý này
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Vấn đề đã giải quyết
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockManagerTaskReport.issuesResolved}
                </div>
                <p className="text-xs text-muted-foreground">
                  Số lượng vấn đề hoặc khiếu nại đã được giải quyết
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Yêu cầu hủy duyệt
                </CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockManagerTaskReport.cancellationRequestsApproved}
                </div>
                <p className="text-xs text-muted-foreground">
                  Số yêu cầu hủy đơn hàng đã được phê duyệt
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  Thời gian giải quyết TB
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockManagerTaskReport.averageResolutionTime}
                </div>
                <p className="text-xs text-muted-foreground">
                  Thời gian trung bình để giải quyết một vấn đề
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-muted-foreground mt-4">
            Biểu đồ thống kê tác vụ sẽ được hiển thị ở đây sau khi có dữ liệu
            thật.
          </p>
        </TabsContent>

        {/* Tab Content: Hiệu suất nhân viên chi tiết */}
        <TabsContent value="staff-detail" className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold">
            Hiệu suất Nhân viên Chi tiết
          </h2>
          <p className="text-muted-foreground mb-4">
            Xem hiệu suất chi tiết của từng nhân viên.
          </p>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Chọn nhân viên
              </CardTitle>
              <CardDescription>
                Chọn nhân viên để xem báo cáo hiệu suất chi tiết.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedStaff} onValueChange={setSelectedStaff}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent>
                  {mockStaffs.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {currentDetailedStaffPerformance && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Tổng đơn hàng
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentDetailedStaffPerformance.totalOrders}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tổng số đơn hàng đã xử lý
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y=0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Đơn hàng đã hoàn thành
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentDetailedStaffPerformance.completedOrders}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Số đơn hàng đã hoàn thành
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y=0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Thời gian xử lý TB
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentDetailedStaffPerformance.averageProcessingTime}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Thời gian trung bình để xử lý một đơn hàng
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className="shadow-lg mt-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Đánh giá từ khách hàng
                  </CardTitle>
                  <CardDescription>
                    Chi tiết các đánh giá của khách hàng về nhân viên này.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Điểm</TableHead>
                        <TableHead>Bình luận</TableHead>
                        <TableHead>Ngày</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentDetailedStaffPerformance.customerRatings.map(
                        (rating) => (
                          <TableRow key={rating.id}>
                            <TableCell>
                              <Badge
                                variant="default"
                                className="flex items-center gap-1 w-fit"
                              >
                                {rating.score}
                                <Star className="h-3 w-3 fill-current text-yellow-500" />
                              </Badge>
                            </TableCell>
                            <TableCell className="italic text-muted-foreground">
                              "{rating.comment}"
                            </TableCell>
                            <TableCell>{rating.date}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Tab Content: Báo cáo tồn kho */}
        <TabsContent value="inventory" className="mt-6 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    Chọn chi nhánh
                  </CardTitle>
                  <CardDescription>
                    Xem báo cáo tồn kho cho từng chi nhánh cụ thể.
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <DateRangePicker value={dateRange} onChange={setDateRange} />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Xuất báo cáo
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Xuất báo cáo tồn kho</DialogTitle>
                        <DialogDescription>
                          Chọn định dạng và thời gian xuất báo cáo
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <Button variant="outline" className="w-full">
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            Excel
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Chọn chi nhánh" />
                </SelectTrigger>
                <SelectContent>
                  {mockBranches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {mockInventoryReports[selectedBranch] && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Tổng số mặt hàng
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockInventoryReports[selectedBranch].totalItems}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tổng số mặt hàng trong kho
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Hàng sắp hết
                    </CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-500">
                      {mockInventoryReports[selectedBranch].lowStockItems}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Số mặt hàng dưới ngưỡng
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Hàng tồn kho
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-500">
                      {mockInventoryReports[selectedBranch].overstockItems}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Số mặt hàng vượt ngưỡng
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold">
                      Giá trị tồn kho
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(
                        mockInventoryReports[selectedBranch].stockValue
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tổng giá trị hàng tồn kho
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Xu hướng tồn kho</CardTitle>
                    <CardDescription>
                      Biểu đồ xu hướng tồn kho theo thời gian
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={mockInventoryReports[selectedBranch].stockTrend}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            name="Số lượng"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Phân bố theo danh mục</CardTitle>
                    <CardDescription>
                      Biểu đồ phân bố hàng tồn kho theo danh mục
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={
                              mockInventoryReports[selectedBranch]
                                .categoryDistribution
                            }
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                          >
                            {mockInventoryReports[
                              selectedBranch
                            ].categoryDistribution.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][
                                    index
                                  ]
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Danh sách hàng sắp hết</CardTitle>
                  <CardDescription>
                    Chi tiết các mặt hàng cần bổ sung
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã hàng</TableHead>
                        <TableHead>Tên hàng</TableHead>
                        <TableHead>Tồn kho hiện tại</TableHead>
                        <TableHead>Ngưỡng tối thiểu</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockInventoryReports[
                        selectedBranch
                      ].lowStockItemsList.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.currentStock}</TableCell>
                          <TableCell>{item.threshold}</TableCell>
                          <TableCell>
                            <Badge
                              variant="destructive"
                              className="flex items-center gap-1 w-fit"
                            >
                              <AlertTriangle className="h-3 w-3" />
                              Cần bổ sung
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>So sánh giữa các chi nhánh</CardTitle>
                  <CardDescription>
                    Biểu đồ so sánh tồn kho giữa các chi nhánh
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          {
                            name: "Tổng số mặt hàng",
                            HN: mockInventoryReports.HN.totalItems,
                            HCM: mockInventoryReports.HCM.totalItems,
                            DN: mockInventoryReports.DN.totalItems,
                          },
                          {
                            name: "Hàng sắp hết",
                            HN: mockInventoryReports.HN.lowStockItems,
                            HCM: mockInventoryReports.HCM.lowStockItems,
                            DN: mockInventoryReports.DN.lowStockItems,
                          },
                          {
                            name: "Hàng tồn kho",
                            HN: mockInventoryReports.HN.overstockItems,
                            HCM: mockInventoryReports.HCM.overstockItems,
                            DN: mockInventoryReports.DN.overstockItems,
                          },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="HN" name="Hà Nội" fill="#8884d8" />
                        <Bar dataKey="HCM" name="Hồ Chí Minh" fill="#82ca9d" />
                        <Bar dataKey="DN" name="Đà Nẵng" fill="#ffc658" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Dự báo nhu cầu</CardTitle>
                  <CardDescription>
                    Dự báo nhu cầu cho các mặt hàng trong tương lai
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="nextWeek" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="nextWeek">Tuần tới</TabsTrigger>
                      <TabsTrigger value="nextMonth">Tháng tới</TabsTrigger>
                    </TabsList>
                    <TabsContent value="nextWeek">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Mặt hàng</TableHead>
                            <TableHead>Tồn kho hiện tại</TableHead>
                            <TableHead>Dự báo</TableHead>
                            <TableHead>Xu hướng</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockDemandForecast[selectedBranch].nextWeek.map(
                            (item) => (
                              <TableRow key={item.item}>
                                <TableCell>{item.item}</TableCell>
                                <TableCell>{item.current}</TableCell>
                                <TableCell>{item.forecast}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      item.trend === "up"
                                        ? "default"
                                        : "destructive"
                                    }
                                    className="flex items-center gap-1 w-fit"
                                  >
                                    <TrendingUp className="h-3 w-3" />
                                    {item.trend === "up" ? "Tăng" : "Giảm"}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    <TabsContent value="nextMonth">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Mặt hàng</TableHead>
                            <TableHead>Tồn kho hiện tại</TableHead>
                            <TableHead>Dự báo</TableHead>
                            <TableHead>Xu hướng</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockDemandForecast[selectedBranch].nextMonth.map(
                            (item) => (
                              <TableRow key={item.item}>
                                <TableCell>{item.item}</TableCell>
                                <TableCell>{item.current}</TableCell>
                                <TableCell>{item.forecast}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      item.trend === "up"
                                        ? "default"
                                        : "destructive"
                                    }
                                    className="flex items-center gap-1 w-fit"
                                  >
                                    <TrendingUp className="h-3 w-3" />
                                    {item.trend === "up" ? "Tăng" : "Giảm"}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
