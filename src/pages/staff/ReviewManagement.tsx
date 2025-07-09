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
import { Search, Star, MessageSquare, Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
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

interface Review {
  id: string;
  orderId: string;
  customerName: string;
  eventType: string;
  eventDate: string;
  rating: number;
  comment: string;
  createdAt: string;
  staffResponse?: string;
  staffResponseDate?: string;
  status: "pending" | "responded";
}

// Mock data
const mockReviews: Review[] = [
  {
    id: "1",
    orderId: "ORD001",
    customerName: "Nguyễn Văn A",
    eventType: "Tiệc sinh nhật",
    eventDate: "2024-03-15",
    rating: 5,
    comment: "Dịch vụ rất tốt, nhân viên nhiệt tình và chuyên nghiệp.",
    createdAt: "2024-03-16T10:00:00",
    status: "pending",
  },
  {
    id: "2",
    orderId: "ORD002",
    customerName: "Trần Thị B",
    eventType: "Họp công ty",
    eventDate: "2024-03-10",
    rating: 4,
    comment: "Không gian đẹp, phục vụ tốt. Có một số vấn đề nhỏ về thời gian.",
    createdAt: "2024-03-11T15:30:00",
    staffResponse:
      "Cảm ơn quý khách đã phản hồi. Chúng tôi sẽ cải thiện vấn đề về thời gian.",
    staffResponseDate: "2024-03-11T16:00:00",
    status: "responded",
  },
  {
    id: "3",
    orderId: "ORD003",
    customerName: "Lê Văn C",
    eventType: "Đám cưới",
    eventDate: "2024-03-05",
    rating: 5,
    comment: "Tuyệt vời! Mọi thứ đều hoàn hảo.",
    createdAt: "2024-03-06T09:15:00",
    staffResponse:
      "Cảm ơn quý khách đã tin tưởng và lựa chọn dịch vụ của chúng tôi.",
    staffResponseDate: "2024-03-06T10:00:00",
    status: "responded",
  },
];

// Hàm giả lập API call
const fetchReviews = async (page: number, pageSize: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: mockReviews.slice(start, end),
    total: mockReviews.length,
  };
};

export default function ReviewManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();
  const pageSize = 6;

  // Fetch dữ liệu
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchReviews(currentPage, pageSize);
        setReviews(result.data);
        setTotalPages(Math.ceil(result.total / pageSize));
      } catch (err) {
        setError("Không thể tải danh sách đánh giá. Vui lòng thử lại sau.");
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải danh sách đánh giá",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, [currentPage, toast]);

  // Lọc đánh giá
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;
    const matchesRating =
      ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  // Xử lý phản hồi
  const handleResponse = () => {
    if (!selectedReview || !responseText.trim()) return;

    // Giả lập API call
    const updatedReview = {
      ...selectedReview,
      staffResponse: responseText,
      staffResponseDate: new Date().toISOString(),
      status: "responded" as const,
    };

    setReviews(
      reviews.map((r) => (r.id === selectedReview.id ? updatedReview : r))
    );
    setIsResponseDialogOpen(false);
    setResponseText("");
    toast({
      title: "Thành công",
      description: "Đã gửi phản hồi thành công",
    });
  };

  // Render rating stars
  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Quản lý đánh giá
          </h1>
          <p className="text-muted-foreground">
            Xem và phản hồi đánh giá từ khách hàng
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Tổng số: {mockReviews.length}
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
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chưa phản hồi</SelectItem>
              <SelectItem value="responded">Đã phản hồi</SelectItem>
            </SelectContent>
          </Select>
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Đánh giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="5">5 sao</SelectItem>
              <SelectItem value="4">4 sao</SelectItem>
              <SelectItem value="3">3 sao</SelectItem>
              <SelectItem value="2">2 sao</SelectItem>
              <SelectItem value="1">1 sao</SelectItem>
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
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        #{review.orderId}
                      </CardTitle>
                      <CardDescription>{review.customerName}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        review.status === "responded" ? "default" : "secondary"
                      }
                    >
                      {review.status === "responded"
                        ? "Đã phản hồi"
                        : "Chưa phản hồi"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Loại sự kiện:
                      </span>
                      <span className="font-medium">{review.eventType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Ngày diễn ra:
                      </span>
                      <span className="font-medium">
                        {format(new Date(review.eventDate), "dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Đánh giá:
                      </span>
                      {renderRating(review.rating)}
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">
                        Nhận xét:
                      </span>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                    {review.staffResponse && (
                      <div className="space-y-1">
                        <span className="text-sm text-muted-foreground">
                          Phản hồi của bạn:
                        </span>
                        <p className="text-sm">{review.staffResponse}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(review.staffResponseDate!),
                            "dd/MM/yyyy HH:mm",
                            {
                              locale: vi,
                            }
                          )}
                        </p>
                      </div>
                    )}
                    {review.status === "pending" && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSelectedReview(review);
                          setIsResponseDialogOpen(true);
                        }}
                      >
                        Phản hồi
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredReviews.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 text-muted-foreground mb-4">
                <MessageSquare className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                Không có đánh giá nào
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

      {/* Response Dialog */}
      <Dialog
        open={isResponseDialogOpen}
        onOpenChange={setIsResponseDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phản hồi đánh giá</DialogTitle>
            <DialogDescription>
              Gửi phản hồi cho đánh giá từ khách hàng
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Đánh giá từ khách hàng:</h4>
                <p className="text-sm">{selectedReview.comment}</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Phản hồi của bạn:</h4>
                <Textarea
                  placeholder="Nhập phản hồi của bạn..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResponseDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleResponse}>Gửi phản hồi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
