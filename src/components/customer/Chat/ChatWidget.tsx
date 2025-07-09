import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Phone, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Message {
  id: string;
  content: string;
  sender: "user" | "support";
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);

  // Mock data cho tin nhắn
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: "1",
          content: "Xin chào! Tôi có thể giúp gì cho bạn?",
          sender: "support",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Thêm tin nhắn của người dùng
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Giả lập đang nhập
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Thêm phản hồi từ nhân viên hỗ trợ
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.",
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Nút chat */}
      <Button
        variant="default"
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/80"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        Hỗ trợ trực tuyến
      </Button>

      {/* Dialog chat */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Hỗ trợ trực tuyến</span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConsultation(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Đặt lịch tư vấn
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFeedback(true)}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Gửi phản hồi
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Khu vực chat */}
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-[hsl(var(--hero-btn))] text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString("vi-VN")}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input gửi tin nhắn */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="flex-1 focus-visible:ring-black/50 focus-visible:border-black/10"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/80"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog đặt lịch tư vấn */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đặt lịch tư vấn</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Loại tư vấn</Label>
              <RadioGroup defaultValue="online" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="online"
                    id="online"
                    className="border-[hsl(var(--hero-btn))] data-[state=checked]:text-[hsl(var(--hero-btn))] focus-visible:ring-[hsl(var(--hero-btn))] focus-visible:border-[hsl(var(--hero-btn))]"
                  />
                  <Label htmlFor="online">Tư vấn trực tuyến</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="offline"
                    id="offline"
                    className="border-[hsl(var(--hero-btn))] data-[state=checked]:text-[hsl(var(--hero-btn))] focus-visible:ring-[hsl(var(--hero-btn))] focus-visible:border-[hsl(var(--hero-btn))]"
                  />
                  <Label htmlFor="offline">Tư vấn trực tiếp</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>Ngày tư vấn</Label>
              <Input
                type="date"
                className="mt-2 focus-visible:ring-black/50 focus-visible:border-black/10"
              />
            </div>
            <div>
              <Label>Thời gian</Label>
              <Input
                type="date"
                className="mt-2 focus-visible:ring-black/50 focus-visible:border-black/10"
              />
            </div>
            <div>
              <Label>Ghi chú</Label>
              <Textarea
                placeholder="Nhập thông tin bổ sung..."
                className="mt-2 focus-visible:ring-black/50 focus-visible:border-black/10"
              />
            </div>
            <Button className="w-full bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/80">
              Xác nhận đặt lịch
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog gửi phản hồi */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gửi phản hồi</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Loại phản hồi</Label>
              <RadioGroup defaultValue="suggestion" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="suggestion"
                    id="suggestion"
                    className="border-[hsl(var(--hero-btn))] data-[state=checked]:text-[hsl(var(--hero-btn))] focus-visible:ring-[hsl(var(--hero-btn))] focus-visible:border-[hsl(var(--hero-btn))]"
                  />
                  <Label htmlFor="suggestion">Đề xuất</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="complaint"
                    id="complaint"
                    className="border-[hsl(var(--hero-btn))] data-[state=checked]:text-[hsl(var(--hero-btn))] focus-visible:ring-[hsl(var(--hero-btn))] focus-visible:border-[hsl(var(--hero-btn))]"
                  />
                  <Label htmlFor="complaint">Khiếu nại</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="praise"
                    id="praise"
                    className="border-[hsl(var(--hero-btn))] data-[state=checked]:text-[hsl(var(--hero-btn))] focus-visible:ring-[hsl(var(--hero-btn))] focus-visible:border-[hsl(var(--hero-btn))]"
                  />
                  <Label htmlFor="praise">Khen ngợi</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label>Nội dung phản hồi</Label>
              <Textarea
                placeholder="Nhập nội dung phản hồi của bạn..."
                className="mt-2 focus-visible:ring-black/50 focus-visible:border-black/10 "
              />
            </div>
            <Button className="w-full bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/80">
              Gửi phản hồi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog khảo sát */}
      <Dialog open={showSurvey} onOpenChange={setShowSurvey}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Khảo sát sau dịch vụ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Bạn đánh giá dịch vụ của chúng tôi như thế nào?</Label>
              <div className="flex justify-center gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                  >
                    <Star className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label>Nhận xét của bạn</Label>
              <Textarea
                placeholder="Chia sẻ trải nghiệm của bạn..."
                className="mt-2"
              />
            </div>
            <div>
              <Label>Bạn có muốn giới thiệu dịch vụ của chúng tôi không?</Label>
              <RadioGroup defaultValue="yes" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Có</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">Không</Label>
                </div>
              </RadioGroup>
            </div>
            <Button className="w-full">Gửi khảo sát</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatWidget;
