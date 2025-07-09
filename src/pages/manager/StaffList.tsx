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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Calendar,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Plus,

} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Staff {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  status: "active" | "inactive" | "on-leave";
  performance: {
    rating: number;
    completedOrders: number;
    totalHours: number;
    averageRating: number;
  };
  currentOrders: number;
  schedule: {
    date: string;
    status: "available" | "busy" | "off";
  }[];
}

const mockStaff: Staff[] = [
  {
    id: "1",
    name: "Trần Văn A",
    role: "Nhân viên phục vụ",
    email: "tranvana@example.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    joinDate: "2023-01-15",
    status: "active",
    performance: {
      rating: 4.5,
      completedOrders: 45,
      totalHours: 1200,
      averageRating: 4.7,
    },
    currentOrders: 2,
    schedule: [
      { date: "2024-03-15", status: "available" },
      { date: "2024-03-16", status: "busy" },
      { date: "2024-03-17", status: "available" },
    ],
  },
  {
    id: "2",
    name: "Nguyễn Thị B",
    role: "Nhân viên trang trí",
    email: "nguyenthib@example.com",
    phone: "0987654321",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    joinDate: "2023-03-20",
    status: "active",
    performance: {
      rating: 4.8,
      completedOrders: 38,
      totalHours: 950,
      averageRating: 4.9,
    },
    currentOrders: 1,
    schedule: [
      { date: "2024-03-15", status: "busy" },
      { date: "2024-03-16", status: "available" },
      { date: "2024-03-17", status: "available" },
    ],
  },
  {
    id: "3",
    name: "Lê Văn C",
    role: "Nhân viên nấu ăn",
    email: "levanc@example.com",
    phone: "0123987456",
    address: "789 Đường DEF, Quận 3, TP.HCM",
    joinDate: "2023-06-10",
    status: "on-leave",
    performance: {
      rating: 4.2,
      completedOrders: 30,
      totalHours: 800,
      averageRating: 4.3,
    },
    currentOrders: 0,
    schedule: [
      { date: "2024-03-15", status: "off" },
      { date: "2024-03-16", status: "off" },
      { date: "2024-03-17", status: "off" },
    ],
  },
];

export default function StaffList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || staff.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || staff.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Đang làm việc", variant: "default" as const },
      inactive: { label: "Không hoạt động", variant: "secondary" as const },
      "on-leave": { label: "Đang nghỉ phép", variant: "outline" as const },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active
    );
  };

  const openStaffDetails = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsDetailsOpen(true);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý nhân viên
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý thông tin và hiệu suất của đội ngũ nhân viên.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Thêm nhân viên mới
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Danh sách nhân viên
          </CardTitle>
          <CardDescription>
            Tìm kiếm và lọc nhân viên theo vai trò và trạng thái.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="Nhân viên phục vụ">Phục vụ</SelectItem>
                <SelectItem value="Nhân viên trang trí">Trang trí</SelectItem>
                <SelectItem value="Nhân viên nấu ăn">Nấu ăn</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Đang làm việc</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
                <SelectItem value="on-leave">Đang nghỉ phép</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border bg-card/50 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nhân viên</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hiệu suất</TableHead>
                  <TableHead>Đơn hàng hiện tại</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => {
                  const statusBadge = getStatusBadge(staff.status);
                  return (
                    <TableRow key={staff.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {staff.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(staff.joinDate), "dd/MM/yyyy", {
                                locale: vi,
                              })}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{staff.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{staff.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant}>
                          {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{staff.performance.rating}/5.0</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{staff.currentOrders}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openStaffDetails(staff)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
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
            <DialogTitle>Chi tiết nhân viên</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết và hiệu suất làm việc
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-6">
              <Tabs defaultValue="info">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Thông tin</TabsTrigger>
                  <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
                  <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Thông tin cơ bản
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarFallback className="text-lg">
                            {selectedStaff.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold">
                            {selectedStaff.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {selectedStaff.role}
                          </p>
                          <Badge
                            variant={
                              getStatusBadge(selectedStaff.status).variant
                            }
                            className="mt-2"
                          >
                            {getStatusBadge(selectedStaff.status).label}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedStaff.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedStaff.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{selectedStaff.address}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              Ngày vào:{" "}
                              {format(
                                new Date(selectedStaff.joinDate),
                                "dd/MM/yyyy",
                                { locale: vi }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>
                              Đơn hàng hiện tại: {selectedStaff.currentOrders}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Hiệu suất làm việc
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                              <Star className="h-8 w-8 text-yellow-500 mb-2" />
                              <p className="text-2xl font-bold">
                                {selectedStaff.performance.rating}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Đánh giá hiện tại
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                              <FileText className="h-8 w-8 text-primary mb-2" />
                              <p className="text-2xl font-bold">
                                {selectedStaff.performance.completedOrders}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Đơn hàng đã hoàn thành
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                              <Clock className="h-8 w-8 text-primary mb-2" />
                              <p className="text-2xl font-bold">
                                {selectedStaff.performance.totalHours}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Tổng giờ làm
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                              <Award className="h-8 w-8 text-primary mb-2" />
                              <p className="text-2xl font-bold">
                                {selectedStaff.performance.averageRating}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Đánh giá trung bình
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Lịch làm việc</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          {selectedStaff.schedule.map((day, index) => (
                            <div
                              key={index}
                              className={cn(
                                "w-12 h-12 rounded-lg flex flex-col items-center justify-center text-sm",
                                day.status === "available" &&
                                  "bg-green-100 text-green-700",
                                day.status === "busy" &&
                                  "bg-red-100 text-red-700",
                                day.status === "off" &&
                                  "bg-gray-100 text-gray-700"
                              )}
                            >
                              <span className="font-medium">
                                {format(new Date(day.date), "d", {
                                  locale: vi,
                                })}
                              </span>
                              <span className="text-xs">
                                {format(new Date(day.date), "MMM", {
                                  locale: vi,
                                })}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-100" />
                            <span>Có sẵn</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-100" />
                            <span>Bận</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-100" />
                            <span>Nghỉ</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
