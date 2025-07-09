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
  DialogTrigger,
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  AlertCircle,
  FileText,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";

// Mock data cho đơn hàng
const mockOrders = [
  {
    id: 1,
    customerName: "Nguyễn Văn A",
    eventType: "Tiệc sinh nhật",
    date: "2024-03-20",
    time: "18:00",
    status: "pending",
    priority: "high",
    assignedRole: "Phục vụ",
  },
  {
    id: 2,
    customerName: "Trần Thị B",
    eventType: "Tiệc cưới",
    date: "2024-03-25",
    time: "12:00",
    status: "in_progress",
    priority: "medium",
    assignedRole: "Đầu bếp",
  },
  {
    id: 3,
    customerName: "Lê Văn C",
    eventType: "Tiệc công ty",
    date: "2024-03-22",
    time: "19:00",
    status: "completed",
    priority: "low",
    assignedRole: "Phục vụ",
  },
];

// Mock data cho chi tiết đơn hàng
const mockOrderDetails = {
  id: 1,
  customerName: "Nguyễn Văn A",
  customerPhone: "0123456789",
  customerEmail: "nguyenvana@email.com",
  eventType: "Tiệc sinh nhật",
  date: "2024-03-15",
  time: "18:00",
  status: "pending",
  priority: "high",
  assignedRole: "Phục vụ",
  guestCount: 50,
  location: "Hội trường A",
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
  notes: [
    "Khách hàng yêu cầu phục vụ món tráng miệng sau cùng",
    "Có 2 khách ăn chay, cần chuẩn bị món riêng",
  ],
  issues: [
    {
      id: 1,
      type: "Thiếu nguyên liệu",
      description: "Không đủ số lượng thịt bò cho món chính",
      severity: "high",
      status: "pending",
    },
  ],
};

// Thêm interface cho chi tiết món
interface MenuItemDetail {
  id: number;
  name: string;
  ingredients: string[];
  servingInstructions: string;
  requiredTools: string[];
  importantNotes: string;
}

// Mock data cho chi tiết món
const mockMenuItemDetails: Record<string, MenuItemDetail> = {
  "Salad trộn": {
    id: 1,
    name: "Salad trộn",
    ingredients: [
      "Rau xà lách",
      "Cà chua bi",
      "Dưa leo",
      "Sốt mayonnaise",
      "Tiêu đen",
    ],
    servingInstructions:
      "Trộn đều các nguyên liệu với sốt mayonnaise, rắc tiêu đen lên trên. Phục vụ lạnh.",
    requiredTools: ["Tô trộn lớn", "Thìa trộn", "Đĩa lạnh"],
    importantNotes:
      "Kiểm tra độ tươi của rau trước khi phục vụ. Không để sốt quá lâu ngoài nhiệt độ phòng.",
  },
  "Súp hải sản": {
    id: 2,
    name: "Súp hải sản",
    ingredients: ["Tôm", "Mực", "Cá", "Nấm", "Rau mùi", "Gia vị"],
    servingInstructions: "Phục vụ nóng trong tô sứ. Rắc rau mùi lên trên.",
    requiredTools: ["Tô sứ", "Thìa súp", "Khăn lót tô"],
    importantNotes:
      "Đảm bảo súp luôn nóng khi phục vụ. Kiểm tra độ mặn trước khi phục vụ.",
  },
  "Bò bít tết": {
    id: 3,
    name: "Bò bít tết",
    ingredients: ["Thịt bò", "Khoai tây", "Rau sống", "Sốt nấm", "Gia vị"],
    servingInstructions:
      "Phục vụ nóng trên đĩa nóng. Kèm theo khoai tây chiên và rau sống.",
    requiredTools: ["Đĩa nóng", "Dao thịt", "Nĩa", "Khăn lót đĩa"],
    importantNotes:
      "Hỏi khách về độ chín của thịt. Đảm bảo đĩa luôn nóng khi phục vụ.",
  },
};

export default function StaffOrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState<
    typeof mockOrderDetails | null
  >(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);
  const [isCancelRequestOpen, setIsCancelRequestOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedItemDetail, setSelectedItemDetail] =
    useState<MenuItemDetail | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Chờ xử lý", variant: "secondary" as const },
      in_progress: { label: "Đang thực hiện", variant: "default" as const },
      completed: { label: "Hoàn thành", variant: "success" as const },
      cancelled: { label: "Đã hủy", variant: "destructive" as const },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { label: "Cao", variant: "destructive" as const },
      medium: { label: "Trung bình", variant: "default" as const },
      low: { label: "Thấp", variant: "secondary" as const },
    };
    return (
      priorityConfig[priority as keyof typeof priorityConfig] ||
      priorityConfig.medium
    );
  };

  const openOrderDetails = (order: (typeof mockOrders)[0]) => {
    setSelectedOrder(mockOrderDetails);
    setIsDetailsOpen(true);
  };

  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || order.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  // Đơn giản hóa việc kiểm tra quyền
  const canViewItemDetails = true; // Tạm thời cho phép tất cả staff xem

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="in_progress">Đang thực hiện</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc theo độ ưu tiên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả độ ưu tiên</SelectItem>
              <SelectItem value="high">Cao</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="low">Thấp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng được phân công</CardTitle>
          <CardDescription>
            Xem và quản lý các đơn hàng được phân công cho bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Loại sự kiện</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Giờ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Độ ưu tiên</TableHead>
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
                    <Badge variant={getPriorityBadge(order.priority).variant}>
                      {getPriorityBadge(order.priority).label}
                    </Badge>
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
              Thông tin chi tiết và quản lý đơn hàng
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Thông tin</TabsTrigger>
              <TabsTrigger value="menu">Thực đơn</TabsTrigger>
              <TabsTrigger value="issues">Vấn đề</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
                  <p>Tên: {selectedOrder?.customerName}</p>
                  <p>SĐT: {selectedOrder?.customerPhone}</p>
                  <p>Email: {selectedOrder?.customerEmail}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Thông tin sự kiện</h3>
                  <p>Loại: {selectedOrder?.eventType}</p>
                  <p>Ngày: {selectedOrder?.date}</p>
                  <p>Giờ: {selectedOrder?.time}</p>
                  <p>Số khách: {selectedOrder?.guestCount}</p>
                  <p>Địa điểm: {selectedOrder?.location}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ghi chú</h3>
                <p>{selectedOrder?.notes}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsUpdateStatusOpen(true)}>
                  Cập nhật trạng thái
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsReportIssueOpen(true)}
                >
                  Báo cáo vấn đề
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsCancelRequestOpen(true)}
                >
                  Yêu cầu hủy
                </Button>
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
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.name}</span>
                                {canViewItemDetails &&
                                  mockMenuItemDetails[item.name] && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        setSelectedItemDetail(
                                          mockMenuItemDetails[item.name]
                                        )
                                      }
                                    >
                                      <Info className="h-4 w-4" />
                                    </Button>
                                  )}
                              </div>
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

                {/* Ghi chú */}
                {mockOrderDetails.notes.length > 0 && (
                  <div className="bg-card rounded-lg border p-4">
                    <h3 className="font-semibold text-lg mb-2">Ghi chú</h3>
                    <div className="space-y-2">
                      {mockOrderDetails.notes.map((note, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <p className="text-sm text-muted-foreground">
                            {note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="issues">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loại vấn đề</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Mức độ</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder?.issues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>{issue.type}</TableCell>
                      <TableCell>{issue.description}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            issue.severity === "high"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {issue.severity === "high" ? "Cao" : "Trung bình"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            issue.status === "pending" ? "secondary" : "default"
                          }
                        >
                          {issue.status === "pending"
                            ? "Chờ xử lý"
                            : "Đã xử lý"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Dialog cập nhật trạng thái */}
      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
            <DialogDescription>
              Cập nhật trạng thái hiện tại của đơn hàng
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="in_progress">Đang thực hiện</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Ghi chú (nếu có)" />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsUpdateStatusOpen(false)}
              >
                Hủy
              </Button>
              <Button>Xác nhận</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog báo cáo vấn đề */}
      <Dialog open={isReportIssueOpen} onOpenChange={setIsReportIssueOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Báo cáo vấn đề</DialogTitle>
            <DialogDescription>
              Báo cáo vấn đề phát sinh trong quá trình thực hiện đơn hàng
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Loại vấn đề" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Thiếu nguyên liệu</SelectItem>
                <SelectItem value="equipment">Thiết bị hỏng</SelectItem>
                <SelectItem value="staff">Vấn đề nhân sự</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Mức độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Cao</SelectItem>
                <SelectItem value="medium">Trung bình</SelectItem>
                <SelectItem value="low">Thấp</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Mô tả chi tiết vấn đề" />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsReportIssueOpen(false)}
              >
                Hủy
              </Button>
              <Button>Gửi báo cáo</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog yêu cầu hủy đơn */}
      <Dialog open={isCancelRequestOpen} onOpenChange={setIsCancelRequestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yêu cầu hủy đơn hàng</DialogTitle>
            <DialogDescription>
              Gửi yêu cầu hủy đơn hàng đến quản lý
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Lý do hủy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Khách hàng yêu cầu</SelectItem>
                <SelectItem value="technical">Vấn đề kỹ thuật</SelectItem>
                <SelectItem value="resource">Thiếu nguồn lực</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Chi tiết lý do hủy" />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="requiresRefund" />
              <label htmlFor="requiresRefund">Yêu cầu hoàn tiền</label>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsCancelRequestOpen(false)}
              >
                Hủy
              </Button>
              <Button variant="destructive">Gửi yêu cầu</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog chi tiết món */}
      <Dialog
        open={!!selectedItemDetail}
        onOpenChange={() => setSelectedItemDetail(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedItemDetail?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Nguyên liệu */}
            <div>
              <h4 className="font-medium mb-2">Nguyên liệu chính</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedItemDetail?.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-muted/50 p-2 rounded"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-sm">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cách phục vụ */}
            <div>
              <h4 className="font-medium mb-2">Cách phục vụ</h4>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                {selectedItemDetail?.servingInstructions}
              </p>
            </div>

            {/* Dụng cụ cần thiết */}
            <div>
              <h4 className="font-medium mb-2">Dụng cụ cần thiết</h4>
              <div className="flex flex-wrap gap-2">
                {selectedItemDetail?.requiredTools.map((tool, index) => (
                  <Badge key={index} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Lưu ý quan trọng */}
            <div>
              <h4 className="font-medium mb-2">Lưu ý quan trọng</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-sm text-yellow-800">
                  {selectedItemDetail?.importantNotes}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
