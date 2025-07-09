import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Download, TrendingUp, Users, Calendar, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";

// Mock data
const mockRevenueData = {
  total: 150000000,
  orders: 150,
  average: 1000000,
  byBranch: [
    { name: "Hà Nội", revenue: 50000000, orders: 50 },
    { name: "Hồ Chí Minh", revenue: 70000000, orders: 70 },
    { name: "Đà Nẵng", revenue: 30000000, orders: 30 },
  ],
  byEventType: [
    { name: "Tiệc cưới", revenue: 80000000, orders: 80 },
    { name: "Tiệc sinh nhật", revenue: 40000000, orders: 40 },
    { name: "Tiệc công ty", revenue: 30000000, orders: 30 },
  ],
};

const mockOrderData = {
  total: 150,
  averageProcessingTime: "2.5 giờ",
  byStatus: [
    { status: "Chờ xác nhận", count: 30 },
    { status: "Đã xác nhận", count: 50 },
    { status: "Đang xử lý", count: 40 },
    { status: "Hoàn thành", count: 25 },
    { status: "Đã hủy", count: 5 },
  ],
  byStaff: [
    { name: "Nguyễn Văn A", orders: 50, completed: 45, cancelled: 2 },
    { name: "Trần Thị B", orders: 40, completed: 35, cancelled: 1 },
    { name: "Lê Văn C", orders: 60, completed: 55, cancelled: 2 },
  ],
};

const mockStaffData = {
  totalStaff: 10,
  averageRating: 4.5,
  performance: [
    {
      name: "Nguyễn Văn A",
      orders: 50,
      completed: 45,
      cancelled: 2,
      averageTime: "2.3 giờ",
      rating: 4.8,
    },
    {
      name: "Trần Thị B",
      orders: 40,
      completed: 35,
      cancelled: 1,
      averageTime: "2.5 giờ",
      rating: 4.6,
    },
    {
      name: "Lê Văn C",
      orders: 60,
      completed: 55,
      cancelled: 2,
      averageTime: "2.1 giờ",
      rating: 4.7,
    },
  ],
};

export default function Reports() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("revenue");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    toast({
      title: "Đã xuất báo cáo",
      description: "Báo cáo đã được xuất thành công",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Báo cáo</h1>
          <p className="text-muted-foreground">Xem và xuất báo cáo hệ thống</p>
        </div>
        <div className="flex gap-4">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="revenue">
            <TrendingUp className="h-4 w-4 mr-2" />
            Doanh thu
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Calendar className="h-4 w-4 mr-2" />
            Đơn hàng
          </TabsTrigger>
          <TabsTrigger value="staff">
            <Users className="h-4 w-4 mr-2" />
            Nhân viên
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng doanh thu
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(mockRevenueData.total)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {mockRevenueData.orders} đơn hàng
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng đơn hàng
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOrderData.total}</div>
                <p className="text-xs text-muted-foreground">
                  Trong khoảng thời gian đã chọn
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng số nhân viên
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStaffData.totalStaff}
                </div>
                <p className="text-xs text-muted-foreground">
                  Nhân viên đang hoạt động
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo chi nhánh</CardTitle>
                <CardDescription>
                  Phân bổ doanh thu theo từng chi nhánh
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Chi nhánh</TableHead>
                      <TableHead>Doanh thu</TableHead>
                      <TableHead>Số đơn</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRevenueData.byBranch.map((branch) => (
                      <TableRow key={branch.name}>
                        <TableCell>{branch.name}</TableCell>
                        <TableCell>{formatCurrency(branch.revenue)}</TableCell>
                        <TableCell>{branch.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo loại sự kiện</CardTitle>
                <CardDescription>
                  Phân bổ doanh thu theo loại sự kiện
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loại sự kiện</TableHead>
                      <TableHead>Doanh thu</TableHead>
                      <TableHead>Số đơn</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRevenueData.byEventType.map((event) => (
                      <TableRow key={event.name}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{formatCurrency(event.revenue)}</TableCell>
                        <TableCell>{event.orders}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Đơn hàng theo trạng thái</CardTitle>
                <CardDescription>
                  Phân bổ đơn hàng theo trạng thái
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Tỷ lệ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrderData.byStatus.map((status) => (
                      <TableRow key={status.status}>
                        <TableCell>{status.status}</TableCell>
                        <TableCell>{status.count}</TableCell>
                        <TableCell>
                          {((status.count / mockOrderData.total) * 100).toFixed(
                            1
                          )}
                          %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất nhân viên (Top 3)</CardTitle>
                <CardDescription>
                  Thống kê hiệu suất làm việc của nhân viên (3 người có hiệu
                  suất cao nhất)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhân viên</TableHead>
                      <TableHead>Hoàn thành</TableHead>
                      <TableHead>Đánh giá</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStaffData.performance.slice(0, 3).map((staff) => (
                      <TableRow key={staff.name}>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.completed}</TableCell>
                        <TableCell>{staff.rating}/5</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng số đơn hàng
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOrderData.total}</div>
                <p className="text-xs text-muted-foreground">
                  Trong khoảng thời gian đã chọn
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Thời gian xử lý trung bình
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockOrderData.averageProcessingTime}
                </div>
                <p className="text-xs text-muted-foreground">
                  Cho mỗi đơn hàng
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tỷ lệ hoàn thành
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">
                  Đơn hàng hoàn thành
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Đơn hàng theo trạng thái</CardTitle>
                <CardDescription>
                  Phân bổ đơn hàng theo trạng thái
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Tỷ lệ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrderData.byStatus.map((status) => (
                      <TableRow key={status.status}>
                        <TableCell>{status.status}</TableCell>
                        <TableCell>{status.count}</TableCell>
                        <TableCell>
                          {((status.count / mockOrderData.total) * 100).toFixed(
                            1
                          )}
                          %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Đơn hàng theo nhân viên</CardTitle>
                <CardDescription>
                  Phân bổ đơn hàng theo nhân viên xử lý
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nhân viên</TableHead>
                      <TableHead>Tổng đơn</TableHead>
                      <TableHead>Hoàn thành</TableHead>
                      <TableHead>Hủy</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrderData.byStaff.map((staff) => (
                      <TableRow key={staff.name}>
                        <TableCell>{staff.name}</TableCell>
                        <TableCell>{staff.orders}</TableCell>
                        <TableCell>{staff.completed}</TableCell>
                        <TableCell>{staff.cancelled}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tổng số nhân viên
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStaffData.totalStaff}
                </div>
                <p className="text-xs text-muted-foreground">
                  Nhân viên đang hoạt động
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Đánh giá trung bình
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStaffData.averageRating}/5
                </div>
                <p className="text-xs text-muted-foreground">Từ khách hàng</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tỷ lệ hoàn thành
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">
                  Đơn hàng hoàn thành
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hiệu suất nhân viên</CardTitle>
              <CardDescription>
                Thống kê hiệu suất làm việc của nhân viên
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Tổng đơn</TableHead>
                    <TableHead>Hoàn thành</TableHead>
                    <TableHead>Hủy</TableHead>
                    <TableHead>Thời gian TB</TableHead>
                    <TableHead>Đánh giá</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStaffData.performance.map((staff) => (
                    <TableRow key={staff.name}>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{staff.orders}</TableCell>
                      <TableCell>{staff.completed}</TableCell>
                      <TableCell>{staff.cancelled}</TableCell>
                      <TableCell>{staff.averageTime}</TableCell>
                      <TableCell>{staff.rating}/5</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
