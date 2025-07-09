import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Search, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data cho lịch sử hoạt động
const mockActivities = [
  {
    id: "1",
    user: "Nguyễn Văn A",
    action: "Đăng nhập",
    module: "Hệ thống",
    details: "Đăng nhập thành công",
    ip: "192.168.1.1",
    timestamp: "2024-01-20 08:30:00",
    status: "success",
  },
  {
    id: "2",
    user: "Trần Thị B",
    action: "Tạo đơn hàng",
    module: "Quản lý đơn hàng",
    details: "Tạo đơn hàng #12345",
    ip: "192.168.1.2",
    timestamp: "2024-01-20 09:15:00",
    status: "success",
  },
  {
    id: "3",
    user: "Lê Văn C",
    action: "Cập nhật thông tin",
    module: "Quản lý người dùng",
    details: "Cập nhật thông tin người dùng ID: 456",
    ip: "192.168.1.3",
    timestamp: "2024-01-20 10:00:00",
    status: "success",
  },
  {
    id: "4",
    user: "Phạm Thị D",
    action: "Xóa dịch vụ",
    module: "Quản lý dịch vụ",
    details: "Xóa dịch vụ ID: 789",
    ip: "192.168.1.4",
    timestamp: "2024-01-20 11:30:00",
    status: "error",
  },
];

const modules = [
  { id: "all", name: "Tất cả" },
  { id: "system", name: "Hệ thống" },
  { id: "users", name: "Quản lý người dùng" },
  { id: "bookings", name: "Quản lý đơn hàng" },
  { id: "services", name: "Quản lý dịch vụ" },
  { id: "reports", name: "Báo cáo" },
];

const actions = [
  { id: "all", name: "Tất cả" },
  { id: "login", name: "Đăng nhập" },
  { id: "create", name: "Tạo mới" },
  { id: "update", name: "Cập nhật" },
  { id: "delete", name: "Xóa" },
  { id: "export", name: "Xuất báo cáo" },
];

export default function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedAction, setSelectedAction] = useState("all");
  const [date, setDate] = useState<Date>();
  const [activities, setActivities] = useState(mockActivities);

  const getStatusBadge = (status: string) => {
    return status === "success"
      ? { label: "Thành công", variant: "default" as const }
      : { label: "Lỗi", variant: "destructive" as const };
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule =
      selectedModule === "all" || activity.module === selectedModule;
    const matchesAction =
      selectedAction === "all" || activity.action === selectedAction;
    return matchesSearch && matchesModule && matchesAction;
  });

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting activity log...");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Lịch sử hoạt động</h1>
          <p className="text-muted-foreground">
            Theo dõi các hoạt động trong hệ thống
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc</CardTitle>
          <CardDescription>Tìm kiếm và lọc lịch sử hoạt động</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map((module) => (
                  <SelectItem key={module.id} value={module.id}>
                    {module.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn hành động" />
              </SelectTrigger>
              <SelectContent>
                {actions.map((action) => (
                  <SelectItem key={action.id} value={action.id}>
                    {action.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách hoạt động</CardTitle>
          <CardDescription>
            Chi tiết các hoạt động trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Hành động</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Chi tiết</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => {
                  const statusBadge = getStatusBadge(activity.status);
                  return (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.timestamp}</TableCell>
                      <TableCell className="font-medium">
                        {activity.user}
                      </TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.module}</TableCell>
                      <TableCell>{activity.details}</TableCell>
                      <TableCell>{activity.ip}</TableCell>
                      <TableCell>
                        <Badge variant={statusBadge.variant}>
                          {statusBadge.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
