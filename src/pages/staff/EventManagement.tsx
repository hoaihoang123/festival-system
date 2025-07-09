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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  Download,
  Bell,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Định nghĩa type cho Event
interface Event {
  id: string;
  orderId: string;
  customerName: string;
  eventType: string;
  eventDate: string;
  location: string;
  guestCount: number;
  role: string;
  status: "upcoming" | "in_progress" | "completed" | "cancelled";
  notes: string;
  isNew?: boolean;
}

// Mock data cho sự kiện
const mockEvents: Event[] = [
  {
    id: "1",
    orderId: "ORD001",
    customerName: "Nguyễn Văn A",
    eventType: "Tiệc sinh nhật",
    eventDate: "2024-03-20",
    location: "Hội trường A",
    guestCount: 50,
    status: "upcoming",
    role: "Phục vụ",
    notes: "Chuẩn bị đồ ăn và thức uống",
  },
  {
    id: "2",
    orderId: "ORD002",
    customerName: "Trần Thị B",
    eventType: "Họp công ty",
    eventDate: "2024-03-22",
    location: "Phòng họp B",
    guestCount: 30,
    status: "upcoming",
    role: "Phục vụ",
    notes: "Chuẩn bị nước uống và đồ ăn nhẹ",
  },
  {
    id: "3",
    orderId: "ORD003",
    customerName: "Lê Văn C",
    eventType: "Đám cưới",
    eventDate: "2024-03-25",
    location: "Sảnh chính",
    guestCount: 200,
    status: "upcoming",
    role: "Phục vụ",
    notes: "Chuẩn bị bàn tiệc và phục vụ",
  },
];

// Hàm giả lập API call
const fetchEvents = async (page: number, pageSize: number) => {
  // Giả lập delay network
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: mockEvents.slice(start, end),
    total: mockEvents.length,
  };
};

export default function EventManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [hasNewEvents, setHasNewEvents] = useState(false);
  const { toast } = useToast();
  const pageSize = 6; // Số sự kiện mỗi trang

  // Fetch dữ liệu
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchEvents(currentPage, pageSize);
        // Đánh dấu sự kiện mới
        const eventsWithNew = result.data.map((event) => ({
          ...event,
          isNew: Math.random() > 0.7, // Giả lập 30% sự kiện là mới
        }));
        setEvents(eventsWithNew);
        setTotalPages(Math.ceil(result.total / pageSize));

        // Kiểm tra nếu có sự kiện mới
        const hasNew = eventsWithNew.some((event) => event.isNew);
        if (hasNew) {
          setHasNewEvents(true);
          toast({
            title: "Sự kiện mới",
            description: "Có sự kiện mới được phân công cho bạn",
          });
        }
      } catch (err) {
        setError("Không thể tải danh sách sự kiện. Vui lòng thử lại sau.");
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải danh sách sự kiện",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, [currentPage, toast]);

  // Giả lập thông báo sự kiện mới
  useEffect(() => {
    const checkNewEvents = async () => {
      // Giả lập kiểm tra sự kiện mới mỗi 30 giây
      const interval = setInterval(async () => {
        const hasNew = Math.random() > 0.7; // 30% cơ hội có sự kiện mới
        if (hasNew) {
          setHasNewEvents(true);
          toast({
            title: "Sự kiện mới",
            description: "Có sự kiện mới được phân công cho bạn",
          });
        }
      }, 100000);

      return () => clearInterval(interval);
    };

    checkNewEvents();
  }, [toast]);

  // Export danh sách sự kiện
  const handleExport = () => {
    const csvContent = [
      // Header
      [
        "Mã đơn",
        "Khách hàng",
        "Loại sự kiện",
        "Ngày diễn ra",
        "Địa điểm",
        "Số khách",
        "Vai trò",
        "Trạng thái",
      ].join(","),
      // Data
      ...events.map((event) =>
        [
          event.orderId,
          event.customerName,
          event.eventType,
          event.eventDate,
          event.location,
          event.guestCount,
          event.role,
          event.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `events_${format(new Date(), "yyyy-MM-dd")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Lọc và sắp xếp sự kiện
  const filteredEvents = mockEvents
    .filter((event) => {
      const matchesSearch =
        event.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = selectedDate
        ? event.eventDate === format(selectedDate, "yyyy-MM-dd")
        : true;
      const matchesType =
        eventTypeFilter === "all" || event.eventType === eventTypeFilter;
      return matchesSearch && matchesDate && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Render badge trạng thái
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary">Sắp diễn ra</Badge>;
      case "in_progress":
        return <Badge variant="destructive">Đang diễn ra</Badge>;
      case "completed":
        return <Badge variant="default">Đã kết thúc</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Lịch sự kiện</h1>
            {hasNewEvents && (
              <Badge variant="destructive" className="animate-pulse">
                <Bell className="h-4 w-4 mr-1" />
                Mới
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Xem và quản lý các sự kiện được phân công
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            Tổng số: {mockEvents.length}
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
          <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Loại sự kiện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Tiệc sinh nhật">Tiệc sinh nhật</SelectItem>
              <SelectItem value="Họp công ty">Họp công ty</SelectItem>
              <SelectItem value="Đám cưới">Đám cưới</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: vi })
                ) : (
                  <span>Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                locale={vi}
              />
            </PopoverContent>
          </Popover>
          <Select
            value={sortOrder}
            onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sắp xếp theo ngày" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Sớm nhất trước</SelectItem>
              <SelectItem value="desc">Muộn nhất trước</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSelectedDate(undefined);
              setEventTypeFilter("all");
              setSortOrder("asc");
            }}
            className="shrink-0"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className={cn(
                  "hover:shadow-lg transition-shadow",
                  event.isNew && "border-primary"
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          #{event.orderId}
                        </CardTitle>
                        {event.isNew && (
                          <Badge
                            variant="destructive"
                            className="animate-pulse"
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Mới
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{event.customerName}</CardDescription>
                    </div>
                    {renderStatusBadge(event.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Loại sự kiện:
                      </span>
                      <span className="font-medium">{event.eventType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Ngày diễn ra:
                      </span>
                      <span className="font-medium">
                        {format(new Date(event.eventDate), "dd/MM/yyyy", {
                          locale: vi,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Vai trò của bạn:
                      </span>
                      <span className="font-medium">{event.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Địa điểm:
                      </span>
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Số lượng khách:
                      </span>
                      <span className="font-medium">
                        {event.guestCount} người
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsDetailOpen(true);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {events.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 text-muted-foreground mb-4">
                <CalendarIcon className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium mb-2">Không có sự kiện nào</h3>
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

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Chi tiết sự kiện</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về sự kiện được phân công
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && (
            <ScrollArea className="max-h-[80vh]">
              <div className="space-y-6 pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Mã đơn hàng
                      </h4>
                      <p className="font-medium">#{selectedEvent.orderId}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Khách hàng
                      </h4>
                      <p className="font-medium">
                        {selectedEvent.customerName}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Loại sự kiện
                      </h4>
                      <p className="font-medium">{selectedEvent.eventType}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Ngày diễn ra
                      </h4>
                      <p className="font-medium">
                        {format(
                          new Date(selectedEvent.eventDate),
                          "dd/MM/yyyy",
                          { locale: vi }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Vai trò của bạn
                      </h4>
                      <p className="font-medium">{selectedEvent.role}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Trạng thái
                      </h4>
                      {renderStatusBadge(selectedEvent.status)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Địa điểm
                      </h4>
                      <p className="font-medium">{selectedEvent.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Số lượng khách
                      </h4>
                      <p className="font-medium">
                        {selectedEvent.guestCount} người
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Ghi chú
                  </h4>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedEvent.notes}
                  </p>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
