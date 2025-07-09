import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Calendar,
  Clock,
  FileText,
  Star,
  Download,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cva } from "class-variance-authority";

// Mock data cho lịch sử đơn hàng
const mockOrderHistory = [
  {
    id: 1,
    customerName: "Nguyễn Văn A",
    eventType: "Tiệc sinh nhật",
    date: "2024-03-15",
    time: "18:00",
    status: "completed",
    rating: 5,
    feedback: "Nhân viên phục vụ rất chuyên nghiệp",
    assignedRole: "Phục vụ",
  },
  {
    id: 2,
    customerName: "Trần Thị B",
    eventType: "Tiệc cưới",
    date: "2024-03-10",
    time: "12:00",
    status: "completed",
    rating: 4,
    feedback: "Đồ ăn ngon, phục vụ tốt",
    assignedRole: "Đầu bếp",
  },
  {
    id: 3,
    customerName: "Lê Văn C",
    eventType: "Tiệc công ty",
    date: "2024-03-05",
    time: "19:00",
    status: "completed",
    rating: 5,
    feedback: "Rất hài lòng với dịch vụ",
    assignedRole: "Phục vụ",
  },
];

// Mock data cho thống kê
const mockStats = {
  totalOrders: 50,
  completedOrders: 45,
  averageRating: 4.8,
  totalEvents: {
    birthday: 20,
    wedding: 15,
    corporate: 15,
  },
  monthlyStats: [
    { month: "Tháng 1", orders: 8, rating: 4.7 },
    { month: "Tháng 2", orders: 12, rating: 4.8 },
    { month: "Tháng 3", orders: 15, rating: 4.9 },
  ],
};

// Cập nhật mock data cho chi tiết đơn hàng
const mockOrderDetails = {
  id: 1,
  customerName: "Nguyễn Văn A",
  eventType: "Tiệc sinh nhật",
  date: "2024-03-15",
  time: "18:00",
  status: "completed",
  rating: 5,
  feedback: "Nhân viên phục vụ rất chuyên nghiệp",
  assignedRole: "Phục vụ",
  combo: {
    name: "Combo Sinh Nhật Premium",
    price: 15000000,
    description: "Combo đặc biệt cho tiệc sinh nhật với đầy đủ dịch vụ",
    items: [
      {
        name: "Món khai vị",
        items: [
          { name: "Salad trộn", quantity: 50 },
          { name: "Súp hải sản", quantity: 50 },
        ],
      },
      {
        name: "Món chính",
        items: [
          { name: "Bò bít tết", quantity: 50 },
          { name: "Cá hồi áp chảo", quantity: 50 },
          { name: "Gà nướng", quantity: 50 },
        ],
      },
      {
        name: "Món phụ",
        items: [
          { name: "Cơm rang", quantity: 50 },
          { name: "Mì xào", quantity: 50 },
        ],
      },
      {
        name: "Tráng miệng",
        items: [
          { name: "Bánh kem", quantity: 1 },
          { name: "Trái cây", quantity: 50 },
        ],
      },
    ],
  },
  additionalItems: [
    { name: "Rượu vang đỏ", quantity: 10, price: 2000000 },
    { name: "Nước ngọt", quantity: 50, price: 1000000 },
  ],
  totalAmount: 18000000,
};

// Thêm variant success cho Badge
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-500 text-white hover:bg-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export default function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState<
    (typeof mockOrderHistory)[0] | null
  >(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Hoàn thành", variant: "success" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.completed
    );
  };

  const openOrderDetails = (order: (typeof mockOrderHistory)[0]) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const filteredOrders = mockOrderHistory.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesEventType =
      eventTypeFilter === "all" || order.eventType === eventTypeFilter;
    const matchesSearch = order.customerName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesEventType && matchesSearch;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lịch sử đơn hàng</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số đơn hàng
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {mockStats.completedOrders} đơn hoàn thành
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đánh giá trung bình
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.averageRating}/5.0
            </div>
            <p className="text-xs text-muted-foreground">
              Dựa trên {mockStats.completedOrders} đánh giá
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tiệc sinh nhật
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalEvents.birthday}
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (mockStats.totalEvents.birthday / mockStats.totalOrders) *
                100
              ).toFixed(1)}
              % tổng số
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiệc cưới</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStats.totalEvents.wedding}
            </div>
            <p className="text-xs text-muted-foreground">
              {(
                (mockStats.totalEvents.wedding / mockStats.totalOrders) *
                100
              ).toFixed(1)}
              % tổng số
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng đã thực hiện</CardTitle>
          <CardDescription>
            Xem lịch sử các đơn hàng đã hoàn thành
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tên khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Loại sự kiện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="Tiệc sinh nhật">Tiệc sinh nhật</SelectItem>
                <SelectItem value="Tiệc cưới">Tiệc cưới</SelectItem>
                <SelectItem value="Tiệc công ty">Tiệc công ty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Loại sự kiện</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Giờ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.eventType}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(order.status).variant}>
                      {getStatusBadge(order.status).label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{order.rating}/5</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.assignedRole}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openOrderDetails(order)}
                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog chi tiết đơn hàng */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về đơn hàng đã hoàn thành
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="menu">Thực đơn</TabsTrigger>
              <TabsTrigger value="feedback">Đánh giá</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
                  <p>Tên: {selectedOrder?.customerName}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Thông tin sự kiện</h3>
                  <p>Loại: {selectedOrder?.eventType}</p>
                  <p>Ngày: {selectedOrder?.date}</p>
                  <p>Giờ: {selectedOrder?.time}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Thông tin thanh toán</h3>
                <p>
                  Tổng tiền:{" "}
                  {mockOrderDetails.totalAmount.toLocaleString("vi-VN")} VNĐ
                </p>
                <p>
                  Trạng thái: <Badge variant="success">Đã thanh toán</Badge>
                </p>
              </div>
            </TabsContent>
            <TabsContent
              value="menu"
              className="space-y-4 max-h-[600px] overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Combo chính */}
                <div className="bg-card rounded-lg border p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-medium text-lg">
                        {mockOrderDetails.combo.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {mockOrderDetails.combo.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">
                        {mockOrderDetails.combo.price.toLocaleString("vi-VN")}{" "}
                        VNĐ
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {mockOrderDetails.combo.items.map((category, index) => (
                      <div
                        key={index}
                        className="border-t pt-4 first:border-t-0 first:pt-0"
                      >
                        <h5 className="font-medium mb-3 text-primary">
                          {category.name}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex justify-between items-center bg-muted/50 p-2 rounded"
                            >
                              <span className="font-medium">{item.name}</span>
                              <Badge variant="secondary">
                                {item.quantity} phần
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Món bổ sung */}
                {mockOrderDetails.additionalItems.length > 0 && (
                  <div className="bg-card rounded-lg border p-4">
                    <h3 className="font-semibold text-lg mb-4">Món bổ sung</h3>
                    <div className="space-y-3">
                      {mockOrderDetails.additionalItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-muted/50 p-3 rounded"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(item.price / item.quantity).toLocaleString(
                                "vi-VN"
                              )}{" "}
                              VNĐ/đơn vị
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {item.quantity} đơn vị
                            </p>
                            <p className="text-sm text-primary font-medium">
                              {item.price.toLocaleString("vi-VN")} VNĐ
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tổng tiền */}
                <div className="bg-card rounded-lg border p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Tổng tiền</h3>
                    <p className="text-2xl font-bold text-primary">
                      {mockOrderDetails.totalAmount.toLocaleString("vi-VN")} VNĐ
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="feedback" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Đánh giá từ khách hàng</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-lg font-semibold">
                    {selectedOrder?.rating}/5
                  </span>
                </div>
                <p className="text-muted-foreground">
                  {selectedOrder?.feedback}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Nhận xét từ quản lý</h3>
                <div className="border rounded-lg p-4">
                  <p className="text-muted-foreground">
                    "Nhân viên thực hiện tốt nhiệm vụ được giao, phục vụ chuyên
                    nghiệp và nhiệt tình."
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    - Nguyễn Văn B (Quản lý)
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
