import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Search,
  CreditCard,
  Mail,
  Printer,
  Download,
  Loader2,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  eventType: string;
  eventDate: string;
  amount: number;
  status: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: string;
  paymentDate?: string;
  notes?: string;
}

// Mock data
const mockPayments: Payment[] = [
  {
    id: "1",
    orderId: "ORD001",
    customerName: "Nguyễn Văn A",
    eventType: "Tiệc sinh nhật",
    eventDate: "2024-03-15",
    amount: 5000000,
    status: "pending",
    paymentMethod: "Chuyển khoản",
  },
  {
    id: "2",
    orderId: "ORD002",
    customerName: "Trần Thị B",
    eventType: "Họp công ty",
    eventDate: "2024-03-10",
    amount: 8000000,
    status: "paid",
    paymentMethod: "Tiền mặt",
    paymentDate: "2024-03-09T10:00:00",
  },
  {
    id: "3",
    orderId: "ORD003",
    customerName: "Lê Văn C",
    eventType: "Đám cưới",
    eventDate: "2024-03-05",
    amount: 15000000,
    status: "failed",
    paymentMethod: "Chuyển khoản",
    notes: "Giao dịch bị từ chối",
  },
];

// Hàm giả lập API call
const fetchPayments = async (page: number, pageSize: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: mockPayments.slice(start, end),
    total: mockPayments.length,
  };
};

export default function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [payments, setPayments] = useState<Payment[]>([]);
  const { toast } = useToast();
  const pageSize = 6;

  // Fetch dữ liệu
  useEffect(() => {
    const loadPayments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchPayments(currentPage, pageSize);
        setPayments(result.data);
        setTotalPages(Math.ceil(result.total / pageSize));
      } catch (err) {
        setError("Không thể tải danh sách thanh toán. Vui lòng thử lại sau.");
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải danh sách thanh toán",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPayments();
  }, [currentPage, toast]);

  // Lọc thanh toán
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = (
    paymentId: string,
    newStatus: Payment["status"]
  ) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status: newStatus,
              paymentDate:
                newStatus === "paid" ? new Date().toISOString() : undefined,
            }
          : payment
      )
    );
    toast({
      title: "Thành công",
      description: "Đã cập nhật trạng thái thanh toán",
    });
  };

  // Xử lý gửi hóa đơn
  const handleSendInvoice = (payment: Payment) => {
    // Giả lập gửi hóa đơn
    toast({
      title: "Thành công",
      description: "Đã gửi hóa đơn qua email",
    });
  };

  // Xử lý in hóa đơn
  const handlePrintInvoice = (payment: Payment) => {
    // Giả lập in hóa đơn
    window.print();
  };

  // Render trạng thái
  const renderStatus = (status: Payment["status"]) => {
    const statusConfig = {
      pending: {
        label: "Chờ thanh toán",
        icon: Clock,
        variant: "secondary" as const,
      },
      paid: {
        label: "Đã thanh toán",
        icon: CheckCircle2,
        variant: "default" as const,
      },
      failed: {
        label: "Thanh toán thất bại",
        icon: AlertCircle,
        variant: "destructive" as const,
      },
      refunded: {
        label: "Đã hoàn tiền",
        icon: CheckCircle2,
        variant: "outline" as const,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý thanh toán
          </h1>
          <p className="text-muted-foreground">
            Xem và quản lý thanh toán của đơn hàng
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" />
            Tổng số: {mockPayments.length}
          </Badge>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo mã đơn hoặc tên khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ thanh toán</SelectItem>
              <SelectItem value="paid">Đã thanh toán</SelectItem>
              <SelectItem value="failed">Thanh toán thất bại</SelectItem>
              <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Payments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPayments.map((payment) => (
              <Card
                key={payment.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        #{payment.orderId}
                      </CardTitle>
                      <CardDescription>{payment.customerName}</CardDescription>
                    </div>
                    {renderStatus(payment.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Loại sự kiện:
                      </span>
                      <span className="font-medium">{payment.eventType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Ngày diễn ra:
                      </span>
                      <span className="font-medium">
                        {format(new Date(payment.eventDate), "dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Số tiền:
                      </span>
                      <span className="font-medium">
                        {payment.amount.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Phương thức:
                      </span>
                      <span className="font-medium">
                        {payment.paymentMethod}
                      </span>
                    </div>
                    {payment.paymentDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Ngày thanh toán:
                        </span>
                        <span className="font-medium">
                          {format(
                            new Date(payment.paymentDate),
                            "dd/MM/yyyy HH:mm",
                            {
                              locale: vi,
                            }
                          )}
                        </span>
                      </div>
                    )}
                    {payment.notes && (
                      <div className="text-sm text-muted-foreground">
                        {payment.notes}
                      </div>
                    )}
                    <div className="flex gap-2 mt-4">
                      {payment.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              handleUpdateStatus(payment.id, "paid")
                            }
                          >
                            Xác nhận thanh toán
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                              handleUpdateStatus(payment.id, "failed")
                            }
                          >
                            Đánh dấu thất bại
                          </Button>
                        </>
                      )}
                      {payment.status === "paid" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleSendInvoice(payment)}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Gửi hóa đơn
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handlePrintInvoice(payment)}
                          >
                            <Printer className="h-4 w-4 mr-1" />
                            In hóa đơn
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredPayments.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 text-muted-foreground mb-4">
                <CreditCard className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                Không có thanh toán nào
              </h3>
              <p className="text-muted-foreground">
                Hãy thử thay đổi bộ lọc hoặc tìm kiếm khác
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className={cn(
                        currentPage === 1 && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={cn(
                        currentPage === totalPages &&
                          "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
