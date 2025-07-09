import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  MessageCircle,
  Clock,
  User,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SupportTicket, TicketFilters } from "@/types/support";
import CreateTicketForm from "@/components/customer/Support/CreateTicketForm";
import TicketDetail from "@/components/customer/Support/TicketDetail";
import TicketFiltersPanel from "@/components/customer/Support/TicketFiltersPanel";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";

const Support = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );
  const [filters, setFilters] = useState<TicketFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Mock data
  useEffect(() => {
    const mockTickets: SupportTicket[] = [
      {
        id: "1",
        ticketNumber: "TK-2024-001",
        title: "Lỗi thanh toán không thành công",
        description:
          'Tôi gặp lỗi khi thanh toán đơn hàng. Hệ thống báo lỗi "Payment failed".',
        category: "technical",
        priority: "high",
        status: "in-progress",
        createdDate: "2024-01-15T10:30:00Z",
        lastUpdated: "2024-01-15T14:20:00Z",
        responseTime: "2 giờ",
        assignedTo: "Nguyễn Văn A",
        customerInfo: {
          name: "Trần Thị B",
          email: "tran.b@email.com",
          phone: "0901234567",
        },
        attachments: [],
        messages: [
          {
            id: "1",
            content:
              'Tôi gặp lỗi khi thanh toán đơn hàng. Hệ thống báo lỗi "Payment failed".',
            sender: "customer",
            senderName: "Trần Thị B",
            timestamp: "2024-01-15T10:30:00Z",
          },
          {
            id: "2",
            content:
              "Chào bạn! Chúng tôi đã nhận được yêu cầu hỗ trợ. Vui lòng cho biết phương thức thanh toán bạn đang sử dụng.",
            sender: "support",
            senderName: "Nguyễn Văn A",
            timestamp: "2024-01-15T11:15:00Z",
          },
        ],
      },
      {
        id: "2",
        ticketNumber: "TK-2024-002",
        title: "Yêu cầu hoàn tiền",
        description:
          "Tôi muốn hủy đơn hàng và yêu cầu hoàn tiền vì thay đổi kế hoạch.",
        category: "billing",
        priority: "medium",
        status: "pending",
        createdDate: "2024-01-14T16:45:00Z",
        lastUpdated: "2024-01-15T09:30:00Z",
        responseTime: "1 ngày",
        assignedTo: "Lê Thị C",
        customerInfo: {
          name: "Phạm Văn D",
          email: "pham.d@email.com",
          phone: "0912345678",
        },
        attachments: [],
        messages: [],
      },
    ];
    setTickets(mockTickets);
    setFilteredTickets(mockTickets);
  }, []);

  // Filter tickets
  useEffect(() => {
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.ticketNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter((ticket) => ticket.status === filters.status);
    }

    if (filters.category) {
      filtered = filtered.filter(
        (ticket) => ticket.category === filters.category
      );
    }

    if (filters.priority) {
      filtered = filtered.filter(
        (ticket) => ticket.priority === filters.priority
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, filters]);

  const handleCreateTicket = (newTicket: Partial<SupportTicket>) => {
    const ticket: SupportTicket = {
      id: Date.now().toString(),
      ticketNumber: `TK-2024-${String(tickets.length + 1).padStart(3, "0")}`,
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: "open",
      messages: [],
      attachments: [],
      customerInfo: {
        name: "Nguyễn Văn A",
        email: "user@example.com",
      },
      ...newTicket,
    } as SupportTicket;

    setTickets((prev) => [ticket, ...prev]);
    setIsCreateModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 hover:bg-[hsl(var(--hero-btn))]/80";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 hover:bg-[hsl(var(--hero-btn))]/80";
      case "pending":
        return "bg-orange-100 text-orange-800 hover:bg-[hsl(var(--hero-btn))]/80";
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-[hsl(var(--hero-btn))]/80";
      case "closed":
        return "bg-gray-100 text-gray-800 hover:bg-[hsl(var(--hero-btn))]/80";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-[hsl(var(--hero-btn))]/80";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 hover:bg-[hsl(var(--hero-btn))]/80";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-[hsl(var(--hero-btn))]/80";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-[hsl(var(--hero-btn))]/80";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-[hsl(var(--hero-btn))]/80";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-[hsl(var(--hero-btn))]/80";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Mở";
      case "in-progress":
        return "Đang xử lý";
      case "pending":
        return "Chờ phản hồi";
      case "resolved":
        return "Đã giải quyết";
      case "closed":
        return "Đã đóng";
      default:
        return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "Khẩn cấp";
      case "high":
        return "Cao";
      case "medium":
        return "Trung bình";
      case "low":
        return "Thấp";
      default:
        return priority;
    }
  };

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Trung Tâm <span className="text-gradient">Hỗ Trợ</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gửi yêu cầu hỗ trợ và theo dõi tiến trình xử lý
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <Dialog
              open={isCreateModalOpen}
              onOpenChange={setIsCreateModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center justify-center gap-2 min-w-[180px] px-6 py-3 rounded-lg shadow-md bg-[hsl(var(--hero-btn))] text-white hover:bg-[hsl(var(--hero-btn))]/90 active:scale-95 transition font-semibold text-base">
                  <Plus className="h-4 w-4 mr-1" />
                  Tạo Ticket Mới
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tạo Ticket Hỗ Trợ Mới</DialogTitle>
                </DialogHeader>
                <CreateTicketForm onSubmit={handleCreateTicket} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Tìm kiếm ticket..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 focus-visible:ring-black/50 focus-visible:border-black/10"
                  />
                </div>
              </div>
              <TicketFiltersPanel
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className="font-semibold text-lg hover:text-primary transition-colors"
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setIsDetailModalOpen(true);
                            }}
                          >
                            {ticket.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {ticket.ticketNumber}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(ticket.status)}>
                            {getStatusText(ticket.status)}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {getPriorityText(ticket.priority)}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {ticket.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(ticket.createdDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </div>
                        {ticket.responseTime && (
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            Phản hồi trong {ticket.responseTime}
                          </div>
                        )}
                        {ticket.assignedTo && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {ticket.assignedTo}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không có ticket nào
                </h3>
                <p className="text-gray-600">
                  {searchTerm || Object.keys(filters).length > 0
                    ? "Không tìm thấy ticket phù hợp với bộ lọc"
                    : "Bạn chưa có ticket hỗ trợ nào"}
                </p>
              </div>
            )}
          </div>

          {/* Ticket Detail Modal */}
          <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              {selectedTicket && (
                <TicketDetail
                  ticket={selectedTicket}
                  onUpdate={(updatedTicket) => {
                    setTickets((prev) =>
                      prev.map((t) =>
                        t.id === updatedTicket.id ? updatedTicket : t
                      )
                    );
                    setSelectedTicket(updatedTicket);
                  }}
                  onClose={() => setIsDetailModalOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Support;
