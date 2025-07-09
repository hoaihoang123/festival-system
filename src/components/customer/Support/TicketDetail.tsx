import React, { useState } from "react";
import {
  Send,
  Star,
  Download,
  MessageCircle,
  Clock,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SupportTicket, TicketMessage } from "@/types/support";
import { useToast } from "@/hooks/use-toast";

interface TicketDetailProps {
  ticket: SupportTicket;
  onUpdate: (ticket: SupportTicket) => void;
  onClose: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({
  ticket,
  onUpdate,
  onClose,
}) => {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");
  const [satisfactionRating, setSatisfactionRating] = useState(0);
  const [satisfactionFeedback, setSatisfactionFeedback] = useState("");
  const [isSubmittingSatisfaction, setIsSubmittingSatisfaction] =
    useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 hover:bg-red-100/80 hover:text-red-800/80";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100/80 hover:text-orange/80";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:gbyellow-100/80 hover:text-green-800/80";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100/80 hover:text-green-800/80";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80 hover:text-gray-800/80";
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

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: TicketMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "customer",
      senderName: ticket.customerInfo.name,
      timestamp: new Date().toISOString(),
    };

    const updatedTicket = {
      ...ticket,
      messages: [...ticket.messages, message],
      lastUpdated: new Date().toISOString(),
      status: "pending" as const,
    };

    onUpdate(updatedTicket);
    setNewMessage("");

    toast({
      title: "Thành công",
      description: "Tin nhắn đã được gửi",
    });
  };

  const handleSatisfactionSubmit = async () => {
    if (satisfactionRating === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn đánh giá",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingSatisfaction(true);

    try {
      const updatedTicket = {
        ...ticket,
        satisfaction: {
          rating: satisfactionRating,
          feedback: satisfactionFeedback,
          date: new Date().toISOString(),
        },
        status: "closed" as const,
      };

      onUpdate(updatedTicket);

      toast({
        title: "Cảm ơn!",
        description: "Đánh giá của bạn đã được ghi nhận",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi gửi đánh giá",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingSatisfaction(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{ticket.title}</h2>
          <p className="text-gray-600">{ticket.ticketNumber}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mô tả vấn đề</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {ticket.description}
              </p>

              {/* Attachments */}
              {ticket.attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">File đính kèm:</h4>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm">{attachment.name}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Messages History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Lịch sử trao đổi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticket.messages.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  Chưa có tin nhắn nào
                </p>
              ) : (
                ticket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "customer" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.senderName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex-1 ${
                        message.sender === "customer" ? "text-right" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {message.senderName}
                        </span>
                        {message.sender === "support" && (
                          <Badge variant="outline" className="text-xs">
                            Hỗ trợ
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleString("vi-VN")}
                        </span>
                      </div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === "customer"
                            ? "bg-primary text-primary-foreground ml-8"
                            : "bg-gray-100 mr-8"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Reply Form */}
          {ticket.status !== "closed" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Phản hồi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn của bạn..."
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Gửi tin nhắn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Satisfaction Survey */}
          {ticket.status === "resolved" && !ticket.satisfaction && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Đánh giá mức độ hài lòng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="mb-3">
                      Bạn có hài lòng với cách giải quyết vấn đề?
                    </p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setSatisfactionRating(star)}
                          className={`p-1 ${
                            star <= satisfactionRating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    value={satisfactionFeedback}
                    onChange={(e) => setSatisfactionFeedback(e.target.value)}
                    placeholder="Chia sẻ thêm về trải nghiệm của bạn (tùy chọn)"
                    rows={3}
                  />

                  <Button
                    onClick={handleSatisfactionSubmit}
                    disabled={
                      isSubmittingSatisfaction || satisfactionRating === 0
                    }
                  >
                    {isSubmittingSatisfaction ? "Đang gửi..." : "Gửi đánh giá"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Satisfaction Display */}
          {ticket.satisfaction && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Đánh giá</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= ticket.satisfaction!.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {new Date(ticket.satisfaction.date).toLocaleDateString(
                      "vi-VN"
                    )}
                  </span>
                </div>
                {ticket.satisfaction.feedback && (
                  <p className="text-gray-700 italic">
                    "{ticket.satisfaction.feedback}"
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-gray-600">Tạo lúc</p>
                  <p className="font-medium">
                    {new Date(ticket.createdDate).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-gray-600">Cập nhật cuối</p>
                  <p className="font-medium">
                    {new Date(ticket.lastUpdated).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              {ticket.assignedTo && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Phụ trách</p>
                    <p className="font-medium">{ticket.assignedTo}</p>
                  </div>
                </div>
              )}

              {ticket.responseTime && (
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Thời gian phản hồi</p>
                    <p className="font-medium">{ticket.responseTime}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-gray-400" />
                <span>{ticket.customerInfo.name}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{ticket.customerInfo.email}</span>
              </div>

              {ticket.customerInfo.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{ticket.customerInfo.phone}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
