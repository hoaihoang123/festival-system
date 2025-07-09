import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  User,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Star,
} from "lucide-react";

// Định nghĩa type cho Assignment
interface Assignment {
  id: number;
  orderId: string;
  customerName: string;
  eventType: string;
  eventDate: string;
  role: string;
  status: string;
  location: string;
  guestCount: number;
  notes: string;
  rating?: number;
  feedback?: string;
}

// Mock data cho phân công
const mockAssignments: Assignment[] = [
  {
    id: 1,
    orderId: "ORD001",
    customerName: "Nguyễn Văn A",
    eventType: "Tiệc sinh nhật",
    eventDate: "2024-03-20T18:00:00",
    role: "Phục vụ",
    status: "pending",
    location: "Quận 1, TP.HCM",
    guestCount: 50,
    notes: "Cần chuẩn bị bàn tiệc và đồ uống",
  },
  {
    id: 2,
    orderId: "ORD002",
    customerName: "Trần Thị B",
    eventType: "Tiệc cưới",
    eventDate: "2024-03-25T11:00:00",
    role: "Phục vụ chính",
    status: "in_progress",
    location: "Quận 7, TP.HCM",
    guestCount: 200,
    notes: "Phụ trách khu vực sảnh chính",
  },
  {
    id: 3,
    orderId: "ORD003",
    customerName: "Lê Văn C",
    eventType: "Họp mặt doanh nghiệp",
    eventDate: "2024-03-22T09:00:00",
    role: "Phục vụ",
    status: "completed",
    location: "Quận 3, TP.HCM",
    guestCount: 30,
    notes: "Đã hoàn thành tốt",
  },
];

// Mock data cho lịch sử
const mockHistory: Assignment[] = [
  {
    id: 4,
    orderId: "ORD004",
    customerName: "Phạm Thị D",
    eventType: "Tiệc sinh nhật",
    eventDate: "2024-03-15T18:00:00",
    role: "Phục vụ",
    status: "completed",
    location: "Quận 2, TP.HCM",
    guestCount: 40,
    notes: "Khách hàng hài lòng",
    rating: 5,
    feedback: "Nhân viên phục vụ nhiệt tình, chu đáo",
  },
  {
    id: 5,
    orderId: "ORD005",
    customerName: "Hoàng Văn E",
    eventType: "Tiệc cưới",
    eventDate: "2024-03-10T11:00:00",
    role: "Phục vụ chính",
    status: "completed",
    location: "Quận 5, TP.HCM",
    guestCount: 150,
    notes: "Đã hoàn thành tốt",
    rating: 4,
    feedback: "Phục vụ chuyên nghiệp",
  },
];

export default function AssignmentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Lọc danh sách công việc
  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesSearch =
      assignment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = (status: string) => {
    if (selectedAssignment) {
      // TODO: Gọi API cập nhật trạng thái
      console.log(
        `Cập nhật trạng thái ${selectedAssignment.id} thành ${status}`
      );
      setIsDetailOpen(false);
    }
  };

  // Render badge trạng thái
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Chờ xử lý</Badge>;
      case "in_progress":
        return <Badge variant="destructive">Đang thực hiện</Badge>;
      case "completed":
        return <Badge variant="default">Hoàn thành</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Công việc của tôi</h1>
          <p className="text-muted-foreground">
            Quản lý và theo dõi các công việc được phân công
          </p>
        </div>
        <div className="flex gap-4">
          <Input
            placeholder="Tìm kiếm theo mã đơn hoặc khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="in_progress">Đang thực hiện</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="in_progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="in_progress">Đang thực hiện</TabsTrigger>
          <TabsTrigger value="history">Lịch sử công việc</TabsTrigger>
        </TabsList>

        <TabsContent value="in_progress">
          {filteredAssignments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Không có công việc nào đang thực hiện
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssignments.map((assignment) => (
                <Card
                  key={assignment.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          #{assignment.orderId}
                        </CardTitle>
                        <CardDescription>
                          {assignment.customerName}
                        </CardDescription>
                      </div>
                      {renderStatusBadge(assignment.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Loại sự kiện:
                        </span>
                        <span className="font-medium">
                          {assignment.eventType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Ngày diễn ra:
                        </span>
                        <span className="font-medium">
                          {assignment.eventDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Vai trò của bạn:
                        </span>
                        <span className="font-medium">{assignment.role}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedAssignment(assignment);
                        setIsDetailOpen(true);
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockHistory.map((assignment) => (
              <Card
                key={assignment.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        #{assignment.orderId}
                      </CardTitle>
                      <CardDescription>
                        {assignment.customerName}
                      </CardDescription>
                    </div>
                    {renderStatusBadge(assignment.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Loại sự kiện:
                      </span>
                      <span className="font-medium">
                        {assignment.eventType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Ngày diễn ra:
                      </span>
                      <span className="font-medium">
                        {assignment.eventDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Vai trò của bạn:
                      </span>
                      <span className="font-medium">{assignment.role}</span>
                    </div>
                    {assignment.rating && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Đánh giá:
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">
                            {assignment.rating}/5
                          </span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedAssignment(assignment);
                      setIsDetailOpen(true);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chi tiết công việc</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về công việc được phân công
            </DialogDescription>
          </DialogHeader>

          {selectedAssignment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Mã đơn hàng
                  </h4>
                  <p className="font-medium">#{selectedAssignment.orderId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Khách hàng
                  </h4>
                  <p className="font-medium">
                    {selectedAssignment.customerName}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Loại sự kiện
                  </h4>
                  <p className="font-medium">{selectedAssignment.eventType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Ngày diễn ra
                  </h4>
                  <p className="font-medium">{selectedAssignment.eventDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Vai trò của bạn
                  </h4>
                  <p className="font-medium">{selectedAssignment.role}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Trạng thái
                  </h4>
                  {renderStatusBadge(selectedAssignment.status)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Địa điểm
                  </h4>
                  <p className="font-medium">{selectedAssignment.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Số lượng khách
                  </h4>
                  <p className="font-medium">
                    {selectedAssignment.guestCount} người
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Ghi chú
                </h4>
                <p className="text-sm">{selectedAssignment.notes}</p>
              </div>

              {selectedAssignment.rating && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Đánh giá
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedAssignment.rating!
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedAssignment.rating}/5
                    </span>
                  </div>
                  {selectedAssignment.feedback && (
                    <p className="text-sm mt-2">
                      {selectedAssignment.feedback}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                {selectedAssignment.status === "pending" && (
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={() => handleUpdateStatus("in_progress")}
                  >
                    Bắt đầu
                  </Button>
                )}
                {selectedAssignment.status === "in_progress" && (
                  <Button
                    variant="default"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleUpdateStatus("completed")}
                  >
                    Hoàn thành
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
