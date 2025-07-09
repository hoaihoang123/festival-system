import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Eye,
  X,
  CheckCircle,
  Clock,
  Ban,
  FileX,
  Receipt,
  Download,
  Printer,
  Star,
  FileText,
} from "lucide-react";
import { HistoryListSkeleton } from "@/components/ui/loading-skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReviewForm from "@/components/customer/review/ReviewForm";
// import ReviewList from "@/components/Review/ReviewList";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "success" | "pending" | "failed";
  transactionId?: string;
}

interface Invoice {
  id: string;
  bookingId: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  status: "paid" | "pending" | "overdue";
  paymentHistory: PaymentHistory[];
  notes?: string;
}

interface BookingHistoryItem {
  id: string;
  serviceName: string;
  eventDate: string;
  guestCount: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  bookingDate: string;
  specialNotes?: string;
  invoice?: Invoice;
  createdAt: string;
}

interface Order {
  orderId: number;
  createdAt: string;
  status: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  venue: string;
  menuItems: string[];
  totalAmount: number;
}

interface Review {
  reviewId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const mockBookings: BookingHistoryItem[] = [
  {
    id: "BK001",
    serviceName: "Tiệc cưới cổ điển",
    eventDate: "2024-12-25",
    guestCount: 150,
    totalAmount: 15000000,
    status: "confirmed",
    bookingDate: "2024-11-15",
    specialNotes: "Yêu cầu trang trí hoa hồng đỏ",
    invoice: {
      id: "INV001",
      bookingId: "BK001",
      issueDate: "2024-11-15",
      dueDate: "2024-12-15",
      totalAmount: 15000000,
      paidAmount: 5000000,
      status: "pending",
      paymentHistory: [
        {
          id: "PAY001",
          date: "2024-11-15",
          amount: 5000000,
          method: "Chuyển khoản ngân hàng",
          status: "success",
          transactionId: "TRX001",
        },
      ],
      notes: "Thanh toán đợt 1: 5,000,000 VNĐ",
    },
    createdAt: "2024-11-15",
  },
  {
    id: "BK002",
    serviceName: "Tiệc sinh nhật trẻ em",
    eventDate: "2024-11-30",
    guestCount: 25,
    totalAmount: 5000000,
    status: "pending",
    bookingDate: "2024-11-10",
    invoice: {
      id: "INV002",
      bookingId: "BK002",
      issueDate: "2024-11-10",
      dueDate: "2024-11-25",
      totalAmount: 5000000,
      paidAmount: 0,
      status: "pending",
      paymentHistory: [],
    },
    createdAt: "2024-11-10",
  },
  {
    id: "BK003",
    serviceName: "Sự kiện doanh nghiệp",
    eventDate: "2024-10-15",
    guestCount: 100,
    totalAmount: 20000000,
    status: "completed",
    bookingDate: "2024-09-20",
    invoice: {
      id: "INV003",
      bookingId: "BK003",
      issueDate: "2024-09-20",
      dueDate: "2024-10-05",
      totalAmount: 20000000,
      paidAmount: 20000000,
      status: "paid",
      paymentHistory: [
        {
          id: "PAY002",
          date: "2024-09-20",
          amount: 10000000,
          method: "Chuyển khoản ngân hàng",
          status: "success",
          transactionId: "TRX002",
        },
        {
          id: "PAY003",
          date: "2024-10-05",
          amount: 10000000,
          method: "Chuyển khoản ngân hàng",
          status: "success",
          transactionId: "TRX003",
        },
      ],
    },
    createdAt: "2024-09-20",
  },
  {
    id: "BK004",
    serviceName: "Tiệc thôi nôi",
    eventDate: "2024-09-20",
    guestCount: 50,
    totalAmount: 8000000,
    status: "cancelled",
    bookingDate: "2024-08-25",
    invoice: {
      id: "INV004",
      bookingId: "BK004",
      issueDate: "2024-08-25",
      dueDate: "2024-09-10",
      totalAmount: 8000000,
      paidAmount: 0,
      status: "overdue",
      paymentHistory: [],
    },
    createdAt: "2024-08-25",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 hover:bg-yellow-100/50 text-yellow-800 hover:text-yellow-800/80 border-yellow-200";
    case "confirmed":
      return "bg-blue-100 hover:bg-blue-100/50 text-blue-800 hover:text-blue-800/80 border-blue-200";
    case "completed":
      return "bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/50 text-white border-[hsl(var(--hero-btn))] hover:text-white border-[hsl(var(--hero-btn))]/80";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Đang chờ xác nhận";
    case "confirmed":
      return "Đã xác nhận";
    case "completed":
      return "Đã hoàn thành";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />;
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    case "cancelled":
      return <Ban className="w-4 h-4" />;
    default:
      return null;
  }
};

const getAvailableActions = (status: string) => {
  switch (status) {
    case "pending":
      return [
        { label: "Xem chi tiết", action: "view", variant: "outline" as const },
        {
          label: "Hủy đặt tiệc",
          action: "cancel",
          variant: "destructive" as const,
        },
      ];
    case "confirmed":
      return [
        { label: "Xem chi tiết", action: "view", variant: "outline" as const },
        {
          label: "Liên hệ hỗ trợ",
          action: "contact",
          variant: "secondary" as const,
        },
      ];
    case "completed":
      return [
        { label: "Xem chi tiết", action: "view", variant: "outline" as const },
        { label: "Đặt lại", action: "rebook", variant: "default" as const },
        { label: "Đánh giá", action: "review", variant: "secondary" as const },
      ];
    case "cancelled":
      return [
        { label: "Xem chi tiết", action: "view", variant: "outline" as const },
        { label: "Đặt lại", action: "rebook", variant: "default" as const },
      ];
    default:
      return [];
  }
};

const InvoiceDetail = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Mã hóa đơn</p>
          <p className="font-medium">{invoice.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Ngày phát hành</p>
          <p className="font-medium">
            {new Date(invoice.issueDate).toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Hạn thanh toán</p>
          <p className="font-medium">
            {new Date(invoice.dueDate).toLocaleDateString("vi-VN")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Trạng thái</p>
          <Badge
            variant={
              invoice.status === "paid"
                ? "default"
                : invoice.status === "pending"
                ? "secondary"
                : "destructive"
            }
          >
            {invoice.status === "paid"
              ? "Đã thanh toán"
              : invoice.status === "pending"
              ? "Chờ thanh toán"
              : "Quá hạn"}
          </Badge>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Chi tiết thanh toán</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Tổng tiền:</span>
            <span className="font-medium">
              {formatCurrency(invoice.totalAmount)}
            </span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Đã thanh toán:</span>
            <span className="font-medium">
              {formatCurrency(invoice.paidAmount)}
            </span>
          </div>
          <div className="flex justify-between text-orange-600">
            <span>Còn lại:</span>
            <span className="font-medium">
              {formatCurrency(invoice.totalAmount - invoice.paidAmount)}
            </span>
          </div>
        </div>
      </div>

      {invoice.paymentHistory.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Lịch sử thanh toán</h4>
          <div className="space-y-2">
            {invoice.paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">
                    {formatCurrency(payment.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(payment.date).toLocaleDateString("vi-VN")} •{" "}
                    {payment.method}
                  </p>
                </div>
                <Badge
                  variant={
                    payment.status === "success"
                      ? "default"
                      : payment.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {payment.status === "success"
                    ? "Thành công"
                    : payment.status === "pending"
                    ? "Đang xử lý"
                    : "Thất bại"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {invoice.notes && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Ghi chú</h4>
          <p className="text-sm text-gray-600">{invoice.notes}</p>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button variant="outline" size="sm" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Tải PDF
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <Printer className="w-4 h-4 mr-2" />
          In hóa đơn
        </Button>
      </div>
    </div>
  );
};

const BookingDetail = ({
  booking,
  onAction,
}: {
  booking: BookingHistoryItem;
  onAction: (action: string, bookingId: string) => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Thông tin cơ bản */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Mã đặt tiệc</p>
          <p className="font-medium">{booking.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Trạng thái</p>
          <Badge className={getStatusColor(booking.status)}>
            <div className="flex items-center space-x-1">
              {getStatusIcon(booking.status)}
              <span>{getStatusText(booking.status)}</span>
            </div>
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-500">Dịch vụ</p>
          <p className="font-medium">{booking.serviceName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Ngày đặt</p>
          <p className="font-medium">
            {new Date(booking.bookingDate).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>

      {/* Thông tin sự kiện */}
      <div className="border-t pt-4">
        <h4 className="font-medium mb-4">Thông tin sự kiện</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Ngày tổ chức</p>
            <p className="font-medium">
              {new Date(booking.eventDate).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Số lượng khách</p>
            <p className="font-medium">{booking.guestCount} người</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tổng tiền</p>
            <p className="font-medium text-primary">
              {formatCurrency(booking.totalAmount)}
            </p>
          </div>
        </div>
      </div>

      {/* Ghi chú */}
      {booking.specialNotes && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Ghi chú</h4>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{booking.specialNotes}</p>
          </div>
        </div>
      )}

      {/* Hóa đơn */}
      {booking.invoice && (
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Thông tin hóa đơn</h4>
            <Badge
              variant={
                booking.invoice.status === "paid"
                  ? "default"
                  : booking.invoice.status === "pending"
                  ? "secondary"
                  : "destructive"
              }
            >
              {booking.invoice.status === "paid"
                ? "Đã thanh toán"
                : booking.invoice.status === "pending"
                ? "Chờ thanh toán"
                : "Quá hạn"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Mã hóa đơn</p>
              <p className="font-medium">{booking.invoice.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hạn thanh toán</p>
              <p className="font-medium">
                {new Date(booking.invoice.dueDate).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Đã thanh toán</p>
              <p className="font-medium text-green-600">
                {formatCurrency(booking.invoice.paidAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Còn lại</p>
              <p className="font-medium text-orange-600">
                {formatCurrency(
                  booking.invoice.totalAmount - booking.invoice.paidAmount
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Các nút hành động */}
      <div className="border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {getAvailableActions(booking.status).map((action) => (
            <Button
              key={action.action}
              variant={action.variant}
              size="sm"
              onClick={() => onAction(action.action, booking.id)}
              className="focus:ring-2 focus:ring-offset-2"
            >
              {action.label}
            </Button>
          ))}
          {booking.invoice && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="focus:ring-2 focus:ring-offset-2"
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Xem hóa đơn
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Chi tiết hóa đơn</DialogTitle>
                </DialogHeader>
                <InvoiceDetail invoice={booking.invoice} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] =
    useState<BookingHistoryItem | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filterBookings = (bookings: BookingHistoryItem[], status?: string) => {
    let filtered = bookings;

    if (status && status !== "all") {
      filtered = filtered.filter((booking) => booking.status === status);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const handleAction = (action: string, bookingId: string) => {
    const booking = mockBookings.find((b) => b.id === bookingId);
    if (!booking) return;

    switch (action) {
      case "view":
        setSelectedBooking(booking);
        break;
      case "cancel":
        toast({
          title: "Hủy đặt tiệc",
          description: "Đơn đặt tiệc đã được hủy thành công",
          variant: "destructive",
        });
        break;
      case "contact":
        toast({
          title: "Liên hệ hỗ trợ",
          description: "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ",
        });
        break;
      case "rebook":
        toast({
          title: "Đặt lại tiệc",
          description: "Chuyển hướng đến trang đặt tiệc...",
        });
        break;
      case "review":
        toast({
          title: "Đánh giá dịch vụ",
          description: "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi",
        });
        break;
    }
  };

  const handleReviewSuccess = async () => {
    setShowReviewDialog(false);
    // Refresh reviews
    if (selectedOrder) {
      const response = await fetch(
        `/api/reviews/order/${selectedOrder.orderId}`
      );
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    }
  };

  const renderBookingCard = (booking: BookingHistoryItem) => (
    <Card key={booking.id} className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Đơn hàng #{booking.id}
        </CardTitle>
        <Badge className={getStatusColor(booking.status)}>
          {getStatusText(booking.status)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Dịch vụ</p>
              <p className="text-sm text-gray-500">{booking.serviceName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Tổng tiền</p>
              <p className="text-sm text-gray-500">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(booking.totalAmount)}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Ngày đặt</p>
              <p className="text-sm text-gray-500">
                {format(new Date(booking.createdAt), "dd/MM/yyyy", {
                  locale: vi,
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Trạng thái</p>
              <p className="text-sm text-gray-500">
                {getStatusText(booking.status)}
              </p>
            </div>
          </div>

          {booking.status === "completed" && (
            <div className="flex items-center justify-between pt-2 border-t">
              <div>
                <p className="text-sm font-medium">Đánh giá dịch vụ</p>
                <p className="text-sm text-gray-500">
                  Chia sẻ trải nghiệm của bạn
                </p>
              </div>
              <Dialog
                open={showReviewDialog}
                onOpenChange={setShowReviewDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSelectedOrder({
                        orderId: parseInt(booking.id),
                        createdAt: booking.createdAt,
                        status: booking.status,
                        eventType: booking.serviceName,
                        guestCount: 0,
                        eventDate: booking.createdAt,
                        venue: "",
                        menuItems: [],
                        totalAmount: booking.totalAmount,
                      })
                    }
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Viết đánh giá
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Đánh giá dịch vụ</DialogTitle>
                  </DialogHeader>
                  {selectedOrder && (
                    <ReviewForm
                      orderId={selectedOrder.orderId}
                      onSuccess={handleReviewSuccess}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction("view", booking.id)}
            >
              <FileText className="mr-2 h-4 w-4" />
              Chi tiết
            </Button>
            {booking.invoice && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction("view", booking.id)}
              >
                <Receipt className="mr-2 h-4 w-4" />
                Tải hóa đơn
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <FileX className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Chưa có đơn đặt tiệc nào
      </h3>
      <p className="text-gray-600 mb-4">
        Bạn chưa có đơn đặt tiệc nào trong mục này
      </p>
      <Button asChild className="bg-gradient-primary hover:opacity-90">
        <a href="/services">Khám phá dịch vụ</a>
      </Button>
    </div>
  );

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lịch Sử <span className="text-gradient">Đặt Tiệc</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center w-full">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo mã đặt tiệc hoặc tên dịch vụ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 rounded-full shadow-sm border border-gray-200 focus:border-[hsl(var(--hero-btn))] focus:ring-2 focus:ring-[hsl(var(--hero-btn))]/30 transition-all text-base"
                  aria-label="Tìm kiếm lịch sử đặt tiệc"
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <HistoryListSkeleton />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
                <TabsTrigger value="confirmed">Đã xác nhận</TabsTrigger>
                <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-4">
                  {filterBookings(mockBookings).length > 0
                    ? filterBookings(mockBookings).map(renderBookingCard)
                    : renderEmptyState()}
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <div className="space-y-4">
                  {filterBookings(mockBookings, "pending").length > 0
                    ? filterBookings(mockBookings, "pending").map(
                        renderBookingCard
                      )
                    : renderEmptyState()}
                </div>
              </TabsContent>

              <TabsContent value="confirmed">
                <div className="space-y-4">
                  {filterBookings(mockBookings, "confirmed").length > 0
                    ? filterBookings(mockBookings, "confirmed").map(
                        renderBookingCard
                      )
                    : renderEmptyState()}
                </div>
              </TabsContent>

              <TabsContent value="completed">
                <div className="space-y-4">
                  {filterBookings(mockBookings, "completed").length > 0
                    ? filterBookings(mockBookings, "completed").map(
                        renderBookingCard
                      )
                    : renderEmptyState()}
                </div>
              </TabsContent>

              <TabsContent value="cancelled">
                <div className="space-y-4">
                  {filterBookings(mockBookings, "cancelled").length > 0
                    ? filterBookings(mockBookings, "cancelled").map(
                        renderBookingCard
                      )
                    : renderEmptyState()}
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Dialog chi tiết đặt tiệc */}
          <Dialog
            open={!!selectedBooking}
            onOpenChange={() => setSelectedBooking(null)}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Chi tiết đặt tiệc</DialogTitle>
              </DialogHeader>
              {selectedBooking && (
                <BookingDetail
                  booking={selectedBooking}
                  onAction={handleAction}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Review Dialog */}
          <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Đánh giá dịch vụ</DialogTitle>
              </DialogHeader>
              {selectedOrder && (
                <ReviewForm
                  orderId={selectedOrder.orderId}
                  onSuccess={handleReviewSuccess}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default History;
