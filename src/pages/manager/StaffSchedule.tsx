import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Plus,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
} from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  staffCount: number;
  assignedStaff: string[];
}

interface LeaveRequest {
  id: string;
  staffName: string;
  startDate: string;
  endDate: string;
  type: "annual" | "sick" | "other";
  status: "pending" | "approved" | "rejected";
  reason: string;
}

const mockShifts: Shift[] = [
  {
    id: "1",
    name: "Ca sáng",
    startTime: "08:00",
    endTime: "16:00",
    staffCount: 3,
    assignedStaff: ["Trần Văn A", "Nguyễn Thị B", "Lê Văn C"],
  },
  {
    id: "2",
    name: "Ca chiều",
    startTime: "16:00",
    endTime: "24:00",
    staffCount: 4,
    assignedStaff: ["Phạm Văn D", "Hoàng Thị E", "Trần Văn F", "Nguyễn Thị G"],
  },
];

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    staffName: "Trần Văn A",
    startDate: "2024-03-20",
    endDate: "2024-03-22",
    type: "annual",
    status: "pending",
    reason: "Nghỉ phép năm",
  },
  {
    id: "2",
    staffName: "Nguyễn Thị B",
    startDate: "2024-03-18",
    endDate: "2024-03-19",
    type: "sick",
    status: "approved",
    reason: "Nghỉ ốm",
  },
];

export default function StaffSchedule() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [isShiftDialogOpen, setIsShiftDialogOpen] = useState(false);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Chờ duyệt", variant: "secondary" as const },
      approved: { label: "Đã duyệt", variant: "default" as const },
      rejected: { label: "Từ chối", variant: "destructive" as const },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };

  const getLeaveTypeBadge = (type: string) => {
    const typeConfig = {
      annual: { label: "Nghỉ phép năm", variant: "default" as const },
      sick: { label: "Nghỉ ốm", variant: "destructive" as const },
      other: { label: "Khác", variant: "secondary" as const },
    };
    return typeConfig[type as keyof typeof typeConfig] || typeConfig.other;
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý ca làm việc
          </h1>
          <p className="text-muted-foreground mt-2">
            Phân ca, theo dõi lịch làm việc và quản lý yêu cầu nghỉ phép.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="shadow-sm">
            <FileText className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
          <Button className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            Tạo ca mới
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Lịch */}
        <Card className="md:col-span-2 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold">
                  {format(currentMonth, "MMMM yyyy", { locale: vi })}
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Select
                value={viewMode}
                onValueChange={(value: "week" | "month") => setViewMode(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Chế độ xem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Theo tuần</SelectItem>
                  <SelectItem value="month">Theo tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground mb-2">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day) => (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "p-3 border rounded-lg min-h-[120px] cursor-pointer transition-all duration-200 ease-in-out",
                    "hover:bg-accent hover:border-accent-foreground",
                    format(day, "yyyy-MM-dd") ===
                      format(selectedDate || new Date(), "yyyy-MM-dd") &&
                      "bg-primary/10 border-primary shadow-md",
                    !format(day, "MM").includes(format(currentMonth, "MM")) &&
                      "text-muted-foreground opacity-60"
                  )}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-base">
                      {format(day, "d")}
                    </span>
                    {mockShifts.length > 0 && (
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {mockShifts.length} ca
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    {mockShifts.map((shift) => (
                      <Badge
                        key={shift.id}
                        variant="secondary"
                        className="text-xs w-full justify-center"
                      >
                        {shift.name}
                      </Badge>
                    ))}
                    {mockLeaveRequests
                      .filter(
                        (request) =>
                          format(new Date(request.startDate), "yyyy-MM-dd") <=
                            format(day, "yyyy-MM-dd") &&
                          format(new Date(request.endDate), "yyyy-MM-dd") >=
                            format(day, "yyyy-MM-dd")
                      )
                      .map((request) => (
                        <Badge
                          key={request.id}
                          variant={getLeaveTypeBadge(request.type).variant}
                          className="text-xs w-full justify-center"
                        >
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {request.staffName}
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Thông tin chi tiết */}
        <div className="space-y-6">
          {/* Ca làm việc */}
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">
                Chi tiết ca làm việc
              </CardTitle>
              <CardDescription>
                Ca làm việc cho ngày{" "}
                {selectedDate
                  ? format(selectedDate, "dd MMMM yyyy", { locale: vi })
                  : "chưa chọn ngày"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockShifts.length > 0 ? (
                mockShifts.map((shift) => (
                  <div
                    key={shift.id}
                    className="p-4 border rounded-lg bg-card hover:bg-muted/50 cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      setSelectedShift(shift);
                      setIsShiftDialogOpen(true);
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{shift.name}</h4>
                      <Badge variant="outline" className="px-3 py-1 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        {shift.staffCount} nhân viên
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {shift.startTime} - {shift.endTime}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Không có ca làm việc nào được lên lịch cho ngày này.
                </p>
              )}
              <Button variant="secondary" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Thêm ca làm việc
              </Button>
            </CardContent>
          </Card>

          {/* Yêu cầu nghỉ phép */}
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">
                Yêu cầu nghỉ phép
              </CardTitle>
              <CardDescription>
                Các yêu cầu nghỉ phép cần duyệt hoặc đã duyệt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {mockLeaveRequests.length > 0 ? (
                    mockLeaveRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 border rounded-lg bg-card"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">
                              {request.staffName}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                {format(
                                  new Date(request.startDate),
                                  "dd/MM/yyyy",
                                  { locale: vi }
                                )}{" "}
                                -
                                {format(
                                  new Date(request.endDate),
                                  "dd/MM/yyyy",
                                  { locale: vi }
                                )}
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant={getStatusBadge(request.status).variant}
                          >
                            {getStatusBadge(request.status).label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Lý do: {request.reason}
                        </p>
                        {request.status === "pending" && (
                          <div className="flex gap-3 mt-3">
                            <Button size="sm" className="flex-1 shadow-sm">
                              Duyệt
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 shadow-sm"
                            >
                              Từ chối
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Không có yêu cầu nghỉ phép nào.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog chi tiết ca làm việc */}
      <Dialog open={isShiftDialogOpen} onOpenChange={setIsShiftDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Chi tiết ca làm việc
            </DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về {selectedShift?.name} (
              {selectedShift?.startTime} - {selectedShift?.endTime})
            </DialogDescription>
          </DialogHeader>
          {selectedShift && (
            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Nhân viên được phân công:
                </h3>
                <div className="space-y-3">
                  {selectedShift.assignedStaff.length > 0 ? (
                    selectedShift.assignedStaff.map((staff, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-secondary"
                      >
                        <span className="font-medium">{staff}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-primary"
                        >
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center">
                      Chưa có nhân viên nào được phân công.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 shadow-sm">Thêm nhân viên</Button>
                <Button variant="outline" className="flex-1 shadow-sm">
                  Chỉnh sửa ca
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
