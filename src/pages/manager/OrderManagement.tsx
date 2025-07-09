import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OrderDetails } from "@/components/manager/OrderDetails";
import { Search, Eye, Edit, Users } from "lucide-react";

const mockOrders = [
  {
    id: "ORD001",
    customerName: "Nguyễn Văn An",
    eventType: "Tiệc cưới",
    eventDate: "2024-07-15",
    status: "confirmed",
    totalAmount: 45000000,
    assignedStaff: ["Trần Văn B", "Lê Thị C"],
    progress: 75,
  },
  {
    id: "ORD002",
    customerName: "Trần Thị Bình",
    eventType: "Sinh nhật",
    eventDate: "2024-07-20",
    status: "pending",
    totalAmount: 8500000,
    assignedStaff: [],
    progress: 10,
  },
  {
    id: "ORD003",
    customerName: "Lê Minh Cường",
    eventType: "Hội nghị",
    eventDate: "2024-07-25",
    status: "in-progress",
    totalAmount: 25000000,
    assignedStaff: ["Phạm Văn D"],
    progress: 40,
  },
];

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Chờ xử lý", variant: "secondary" as const },
      confirmed: { label: "Đã xác nhận", variant: "default" as const },
      "in-progress": { label: "Đang thực hiện", variant: "default" as const },
      completed: { label: "Hoàn thành", variant: "default" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý Đơn hàng
          </h1>
          <p className="text-muted-foreground mt-2">
            Theo dõi, kiểm soát và quản lý các đơn hàng sự kiện của nhà hàng.
          </p>
        </div>
        {/* Có thể thêm nút "Tạo đơn hàng mới" nếu cần */}
        {/* <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Tạo đơn hàng mới
        </Button> */}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Danh sách đơn hàng
          </CardTitle>
          <CardDescription>
            Tìm kiếm và lọc đơn hàng theo trạng thái.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên khách hàng hoặc mã đơn..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="in-progress">Đang thực hiện</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border bg-card/50 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Loại sự kiện</TableHead>
                  <TableHead>Ngày sự kiện</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Nhân viên</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Tiến độ</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const statusBadge = getStatusBadge(order.status);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.eventType}</TableCell>
                      <TableCell>{order.eventDate}</TableCell>
                      <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                      <TableCell>
                        {order.assignedStaff.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {order.assignedStaff.length}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Chưa phân công
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant}>
                          {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {order.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Chi tiết đơn hàng {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết và quản lý đơn hàng.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <OrderDetails
              order={selectedOrder}
              onClose={() => setIsDetailsOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
