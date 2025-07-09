import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Search,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

// Mock data cho bài viết hướng dẫn
const helpArticles = [
  {
    id: "1",
    title: "Hướng dẫn quản lý sự kiện",
    content: `1. Xem danh sách sự kiện
2. Chi tiết sự kiện
3. Cập nhật trạng thái
4. Phản hồi khách hàng`,
    category: "event",
    priority: "high",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-15",
  },
  {
    id: "2",
    title: "Hướng dẫn xử lý thanh toán",
    content: `1. Kiểm tra thanh toán
2. Xác nhận thanh toán
3. In hóa đơn
4. Báo cáo doanh thu`,
    category: "payment",
    priority: "high",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-10",
  },
  {
    id: "3",
    title: "Hướng dẫn sử dụng hệ thống",
    content: `1. Đăng nhập/Đăng xuất
2. Quản lý tài khoản
3. Cài đặt thông báo
4. Bảo mật tài khoản`,
    category: "general",
    priority: "medium",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-05",
  },
];

// Mock data cho FAQ
const faqs = [
  {
    id: "1",
    question: "Làm thế nào để cập nhật trạng thái sự kiện?",
    answer:
      "Bạn có thể cập nhật trạng thái sự kiện bằng cách vào trang Quản lý sự kiện, chọn sự kiện cần cập nhật và nhấn vào nút 'Cập nhật trạng thái'.",
    category: "event",
    isPopular: true,
  },
  {
    id: "2",
    question: "Cách xử lý khi có sự cố kỹ thuật?",
    answer:
      "Nếu gặp sự cố kỹ thuật, vui lòng liên hệ với bộ phận IT qua email support@festive.com hoặc gọi số hotline 1900-xxxx.",
    category: "technical",
    isPopular: true,
  },
  {
    id: "3",
    question: "Làm thế nào để in hóa đơn?",
    answer:
      "Để in hóa đơn, vào trang Quản lý thanh toán, chọn đơn hàng cần in và nhấn vào nút 'In hóa đơn'.",
    category: "payment",
    isPopular: false,
  },
];

export default function HelpSupport() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const { toast } = useToast();

  // Lọc bài viết và FAQ
  const filteredArticles = helpArticles.filter(
    (article) =>
      (selectedCategory === "all" || article.category === selectedCategory) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFaqs = faqs.filter(
    (faq) =>
      (selectedCategory === "all" || faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Xử lý gửi liên hệ
  const handleContact = () => {
    if (!contactMessage.trim()) return;

    // Giả lập gửi liên hệ
    toast({
      title: "Thành công",
      description:
        "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.",
    });
    setIsContactDialogOpen(false);
    setContactMessage("");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Trợ giúp & Hỗ trợ
          </h1>
          <p className="text-muted-foreground">
            Tìm kiếm thông tin và liên hệ hỗ trợ
          </p>
        </div>
        <Button
          onClick={() => setIsContactDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Liên hệ hỗ trợ
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm hướng dẫn hoặc câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
          >
            Tất cả
          </Button>
          <Button
            variant={selectedCategory === "event" ? "default" : "outline"}
            onClick={() => setSelectedCategory("event")}
          >
            Sự kiện
          </Button>
          <Button
            variant={selectedCategory === "payment" ? "default" : "outline"}
            onClick={() => setSelectedCategory("payment")}
          >
            Thanh toán
          </Button>
          <Button
            variant={selectedCategory === "technical" ? "default" : "outline"}
            onClick={() => setSelectedCategory("technical")}
          >
            Kỹ thuật
          </Button>
        </div>
      </div>

      {/* Help Articles */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Hướng dẫn sử dụng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <Badge
                    variant={
                      article.priority === "high"
                        ? "destructive"
                        : article.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {article.priority === "high"
                      ? "Quan trọng"
                      : article.priority === "medium"
                      ? "Trung bình"
                      : "Thấp"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[100px]">
                  <div className="whitespace-pre-line text-sm">
                    {article.content}
                  </div>
                </ScrollArea>
                <div className="mt-4 text-xs text-muted-foreground">
                  Cập nhật lần cuối:{" "}
                  {format(new Date(article.updatedAt), "dd/MM/yyyy", {
                    locale: vi,
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <HelpCircle className="h-6 w-6" />
          Câu hỏi thường gặp
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  {faq.question}
                  {faq.isPopular && (
                    <Badge variant="secondary" className="ml-2">
                      Phổ biến
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Liên hệ hỗ trợ</DialogTitle>
            <DialogDescription>
              Gửi yêu cầu hỗ trợ hoặc báo cáo vấn đề
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Thông tin liên hệ:</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>Hotline: 1900-xxxx</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Email: support@festive.com</span>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Nội dung:</h4>
              <Textarea
                placeholder="Nhập nội dung cần hỗ trợ..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsContactDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleContact}>Gửi yêu cầu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
