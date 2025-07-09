import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Users,
  Plus,
  X,
  Clock,
  FileText,
  Printer,
  Download,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Search,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Staff {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  currentOrders: number;
  rating: number;
  schedule: {
    date: string;
    status: "available" | "busy" | "off";
  }[];
}

interface Order {
  id: string;
  customerName: string;
  eventType: string;
  eventDate: string;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  totalAmount: number;
  assignedStaff: string[];
  progress: number;
  stages?: {
    id: string;
    name: string;
    status: "pending" | "in-progress" | "completed";
    progress: number;
    startDate?: string;
    endDate?: string;
    estimatedHours: number;
    actualHours?: number;
    notes?: string;
  }[];
}

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

const mockStaff: Staff[] = [
  {
    id: "1",
    name: "Trần Văn A",
    role: "Nhân viên phục vụ",
    currentOrders: 2,
    rating: 4.5,
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
    currentOrders: 1,
    rating: 4.8,
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
    currentOrders: 3,
    rating: 4.2,
    schedule: [
      { date: "2024-03-15", status: "available" },
      { date: "2024-03-16", status: "busy" },
      { date: "2024-03-17", status: "off" },
    ],
  },
];

const mockOrder: Order = {
  id: "ORD001",
  customerName: "Nguyễn Văn An",
  eventType: "Tiệc cưới",
  eventDate: "2024-07-15",
  status: "in-progress",
  totalAmount: 45000000,
  assignedStaff: ["Trần Văn B", "Lê Thị C"],
  progress: 75,
  stages: [
    {
      id: "1",
      name: "Chuẩn bị nguyên liệu",
      status: "completed",
      progress: 100,
      startDate: "2024-03-15",
      endDate: "2024-03-16",
      estimatedHours: 8,
      actualHours: 7,
      notes: "Đã hoàn thành việc chuẩn bị nguyên liệu",
    },
    {
      id: "2",
      name: "Trang trí sảnh",
      status: "in-progress",
      progress: 60,
      startDate: "2024-03-16",
      estimatedHours: 12,
      actualHours: 8,
      notes: "Đang thực hiện trang trí sảnh chính",
    },
    {
      id: "3",
      name: "Chuẩn bị menu",
      status: "pending",
      progress: 0,
      estimatedHours: 6,
      notes: "Chưa bắt đầu",
    },
  ],
};

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [status, setStatus] = useState(order.status);
  const [assignedStaff, setAssignedStaff] = useState(order.assignedStaff || []);
  const [newNote, setNewNote] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: "Chờ xử lý",
        variant: "secondary" as const,
        icon: Clock,
      },
      confirmed: {
        label: "Đã xác nhận",
        variant: "default" as const,
        icon: CheckCircle2,
      },
      "in-progress": {
        label: "Đang thực hiện",
        variant: "default" as const,
        icon: AlertCircle,
      },
      completed: {
        label: "Hoàn thành",
        variant: "default" as const,
        icon: CheckCircle2,
      },
      cancelled: {
        label: "Đã hủy",
        variant: "destructive" as const,
        icon: XCircle,
      },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const handleStatusUpdate = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Cập nhật thành công",
        description: "Trạng thái đơn hàng đã được cập nhật",
      });
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể cập nhật trạng thái",
        variant: "destructive",
      });
    }
  };

  const handleAssignStaff = (staffMember) => {
    if (!assignedStaff.includes(staffMember.name)) {
      setAssignedStaff([...assignedStaff, staffMember.name]);
    }
  };

  const handleUnassignStaff = (staffName) => {
    setAssignedStaff(assignedStaff.filter((name) => name !== staffName));
  };

  const mockHistory = [
    { date: "2024-03-15 10:30", status: "pending", note: "Đơn hàng được tạo" },
    {
      date: "2024-03-15 14:20",
      status: "confirmed",
      note: "Đã xác nhận đơn hàng",
    },
    {
      date: "2024-03-16 09:15",
      status: "in-progress",
      note: "Bắt đầu chuẩn bị",
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Thông tin chi tiết</TabsTrigger>
          <TabsTrigger value="staff">Phân công nhân viên</TabsTrigger>
          <TabsTrigger value="progress">Theo dõi tiến độ</TabsTrigger>
          <TabsTrigger value="history">Lịch sử xử lý</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin khách hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{order.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>0123456789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>customer@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin sự kiện</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {format(new Date(order.eventDate), "PPP", { locale: vi })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>08:00 - 22:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{order.eventType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadge(order.status).variant}>
                    {getStatusBadge(order.status).label}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tổng tiền:</span>
                  <span className="text-lg font-bold">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Ghi chú:</h4>
                  <Textarea
                    placeholder="Thêm ghi chú cho đơn hàng..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <Button className="w-full">Lưu ghi chú</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="h-4 w-4 mr-2" />
              In hóa đơn
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Xuất PDF
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Phân công nhân viên</CardTitle>
              <CardDescription>
                Phân công nhân viên phù hợp cho đơn hàng này
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Tìm kiếm và lọc */}
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm nhân viên..."
                      className="pl-10"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả vai trò</SelectItem>
                      <SelectItem value="service">Phục vụ</SelectItem>
                      <SelectItem value="decoration">Trang trí</SelectItem>
                      <SelectItem value="cooking">Nấu ăn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Danh sách nhân viên đã phân công */}
                <div className="space-y-2">
                  <h4 className="font-medium">Nhân viên đã phân công:</h4>
                  <div className="space-y-2">
                    {order.assignedStaff.map((staffName, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-secondary rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {staffName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{staffName}</p>
                            <p className="text-sm text-muted-foreground">
                              {
                                mockStaff.find((s) => s.name === staffName)
                                  ?.role
                              }
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danh sách nhân viên có sẵn */}
                <div className="space-y-2">
                  <h4 className="font-medium">Nhân viên có sẵn:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockStaff.map((staff) => (
                      <Card key={staff.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                  {staff.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{staff.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {staff.role}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={order.assignedStaff.includes(
                                staff.name
                              )}
                            >
                              {order.assignedStaff.includes(staff.name)
                                ? "Đã phân công"
                                : "Phân công"}
                            </Button>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {staff.currentOrders} đơn đang phụ trách
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{staff.rating}/5.0</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm font-medium mb-2">
                              Lịch làm việc:
                            </p>
                            <div className="flex gap-2">
                              {staff.schedule.map((day, index) => (
                                <div
                                  key={index}
                                  className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-xs",
                                    day.status === "available" &&
                                      "bg-green-100 text-green-700",
                                    day.status === "busy" &&
                                      "bg-red-100 text-red-700",
                                    day.status === "off" &&
                                      "bg-gray-100 text-gray-700"
                                  )}
                                >
                                  {format(new Date(day.date), "d")}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tiến độ tổng thể</CardTitle>
              <CardDescription>
                Theo dõi tiến độ thực hiện đơn hàng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Tiến độ tổng thể */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tiến độ chung</span>
                    <span className="text-sm font-medium">
                      {order.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </div>

                {/* Danh sách các công đoạn */}
                <div className="space-y-4">
                  {order.stages?.map((stage) => (
                    <Card key={stage.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{stage.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={
                                  stage.status === "completed"
                                    ? "default"
                                    : stage.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {stage.status === "completed"
                                  ? "Hoàn thành"
                                  : stage.status === "in-progress"
                                  ? "Đang thực hiện"
                                  : "Chờ thực hiện"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {stage.progress}%
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={stage.status === "completed"}
                          >
                            Cập nhật tiến độ
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {/* Thanh tiến độ */}
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className={cn(
                                "h-2 rounded-full transition-all",
                                stage.status === "completed"
                                  ? "bg-green-500"
                                  : stage.status === "in-progress"
                                  ? "bg-primary"
                                  : "bg-muted"
                              )}
                              style={{ width: `${stage.progress}%` }}
                            />
                          </div>

                          {/* Thông tin thời gian */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">
                                Thời gian dự kiến:
                              </p>
                              <p className="font-medium">
                                {stage.estimatedHours} giờ
                              </p>
                            </div>
                            {stage.actualHours && (
                              <div>
                                <p className="text-muted-foreground">
                                  Thời gian thực tế:
                                </p>
                                <p className="font-medium">
                                  {stage.actualHours} giờ
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Thời gian bắt đầu/kết thúc */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            {stage.startDate && (
                              <div>
                                <p className="text-muted-foreground">
                                  Bắt đầu:
                                </p>
                                <p className="font-medium">
                                  {format(new Date(stage.startDate), "PPp", {
                                    locale: vi,
                                  })}
                                </p>
                              </div>
                            )}
                            {stage.endDate && (
                              <div>
                                <p className="text-muted-foreground">
                                  Kết thúc:
                                </p>
                                <p className="font-medium">
                                  {format(new Date(stage.endDate), "PPp", {
                                    locale: vi,
                                  })}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Ghi chú */}
                          {stage.notes && (
                            <div className="text-sm">
                              <p className="text-muted-foreground">Ghi chú:</p>
                              <p className="mt-1">{stage.notes}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Thêm ghi chú mới */}
                <div className="space-y-2">
                  <h4 className="font-medium">Thêm ghi chú tiến độ:</h4>
                  <Textarea
                    placeholder="Nhập ghi chú về tiến độ thực hiện..."
                    className="min-h-[100px]"
                  />
                  <Button className="w-full">Lưu ghi chú</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lịch sử xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {mockHistory.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {index !== mockHistory.length - 1 && (
                          <div className="w-0.5 h-full bg-border" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusBadge(item.status).variant}>
                            {getStatusBadge(item.status).label}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(item.date), "PPp", { locale: vi })}
                          </span>
                        </div>
                        <p className="text-sm">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
