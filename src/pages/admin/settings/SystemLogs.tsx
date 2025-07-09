import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Search, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";

const logLevels = [
  { id: "all", name: "Tất cả" },
  { id: "error", name: "Lỗi" },
  { id: "warning", name: "Cảnh báo" },
  { id: "info", name: "Thông tin" },
  { id: "debug", name: "Debug" },
];

const logTypes = [
  { id: "all", name: "Tất cả" },
  { id: "system", name: "Hệ thống" },
  { id: "security", name: "Bảo mật" },
  { id: "database", name: "Cơ sở dữ liệu" },
  { id: "api", name: "API" },
];

// Mock data
const mockLogs = [
  {
    id: 1,
    timestamp: "2024-01-15 10:30:45",
    level: "error",
    type: "system",
    message: "Lỗi kết nối database",
    details: "Connection timeout after 30 seconds",
    user: "system",
  },
  {
    id: 2,
    timestamp: "2024-01-15 10:29:30",
    level: "warning",
    type: "security",
    message: "Đăng nhập thất bại nhiều lần",
    details: "IP: 192.168.1.100",
    user: "anonymous",
  },
  {
    id: 3,
    timestamp: "2024-01-15 10:28:15",
    level: "info",
    type: "api",
    message: "API request thành công",
    details: "GET /api/users",
    user: "admin",
  },
  {
    id: 4,
    timestamp: "2024-01-15 10:27:00",
    level: "debug",
    type: "database",
    message: "Query execution time",
    details: "SELECT * FROM users: 150ms",
    user: "system",
  },
];

export default function SystemLogs() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      error: { label: "Lỗi", variant: "destructive" as const },
      warning: { label: "Cảnh báo", variant: "warning" as const },
      info: { label: "Thông tin", variant: "default" as const },
      debug: { label: "Debug", variant: "secondary" as const },
    };
    return levelConfig[level] || levelConfig.info;
  };

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === "all" || log.level === selectedLevel;
    const matchesType = selectedType === "all" || log.type === selectedType;
    return matchesSearch && matchesLevel && matchesType;
  });

  const handleExport = () => {
    // TODO: Implement export functionality
    toast({
      title: "Đã xuất nhật ký",
      description: "Nhật ký hệ thống đã được xuất thành công",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nhật ký hệ thống</h1>
        <p className="text-muted-foreground">
          Xem và quản lý nhật ký hoạt động của hệ thống
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc</CardTitle>
          <CardDescription>Tìm kiếm và lọc nhật ký hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Cấp độ" />
                </SelectTrigger>
                <SelectContent>
                  {logLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Loại" />
                </SelectTrigger>
                <SelectContent>
                  {logTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DateRangePicker value={dateRange} onChange={setDateRange} />
              <Button onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Xuất
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhật ký</CardTitle>
          <CardDescription>
            Hiển thị {filteredLogs.length} kết quả
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Cấp độ</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Thông báo</TableHead>
                <TableHead>Chi tiết</TableHead>
                <TableHead>Người dùng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => {
                const levelBadge = getLevelBadge(log.level);
                return (
                  <TableRow key={log.id}>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={levelBadge.variant}>
                        {levelBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.type}</TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.details}</TableCell>
                    <TableCell>{log.user}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
