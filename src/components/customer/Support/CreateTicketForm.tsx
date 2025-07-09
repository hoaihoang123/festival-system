import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SupportTicket, TicketAttachment } from "@/types/support";
import { useToast } from "@/hooks/use-toast";

interface CreateTicketFormProps {
  onSubmit: (ticket: Partial<SupportTicket>) => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "technical", label: "Kỹ thuật" },
    { value: "billing", label: "Thanh toán" },
    { value: "general", label: "Chung" },
    { value: "complaint", label: "Khiếu nại" },
    { value: "feature-request", label: "Yêu cầu tính năng" },
  ];

  const priorities = [
    { value: "low", label: "Thấp" },
    { value: "medium", label: "Trung bình" },
    { value: "high", label: "Cao" },
    { value: "urgent", label: "Khẩn cấp" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + attachments.length > 5) {
      toast({
        title: "Lỗi",
        description: "Chỉ được upload tối đa 5 file",
        variant: "destructive",
      });
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        toast({
          title: "Lỗi",
          description: `File ${file.name} quá lớn (>10MB)`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setAttachments((prev) => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.priority
    ) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate file upload
      const uploadedAttachments: TicketAttachment[] = attachments.map(
        (file, index) => ({
          id: `${Date.now()}-${index}`,
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          uploadDate: new Date().toISOString(),
        })
      );

      const ticketData: Partial<SupportTicket> = {
        title: formData.title,
        description: formData.description,
        category: formData.category as any,
        priority: formData.priority as any,
        customerInfo: {
          name: formData.customerName || "Nguyễn Văn A",
          email: formData.customerEmail || "user@example.com",
          phone: formData.customerPhone,
        },
        attachments: uploadedAttachments,
      };

      onSubmit(ticketData);

      toast({
        title: "Thành công",
        description: "Ticket hỗ trợ đã được tạo thành công",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi tạo ticket",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName">Họ và tên</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => handleInputChange("customerName", e.target.value)}
            placeholder="Nhập họ và tên"
            className="focus-visible:ring-black/10 focus-visible:border-black/10"
          />
        </div>
        <div>
          <Label htmlFor="customerEmail">Email</Label>
          <Input
            id="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange("customerEmail", e.target.value)}
            placeholder="Nhập email"
            className="focus-visible:ring-black/10 focus-visible:border-black/10"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="customerPhone">Số điện thoại</Label>
        <Input
          id="customerPhone"
          value={formData.customerPhone}
          onChange={(e) => handleInputChange("customerPhone", e.target.value)}
          placeholder="Nhập số điện thoại"
          className="focus-visible:ring-black/10 focus-visible:border-black/10"
        />
      </div>

      {/* Ticket Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Loại vấn đề *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger className="focus:ring-black/10 focus:border-black/10">
              <SelectValue placeholder="Chọn loại vấn đề" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="priority">Độ ưu tiên *</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) => handleInputChange("priority", value)}
          >
            <SelectTrigger className="focus:ring-black/10 focus:border-black/10">
              <SelectValue placeholder="Chọn độ ưu tiên" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="title">Tiêu đề *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Nhập tiêu đề vấn đề"
          className="focus-visible:ring-black/10 focus-visible:border-black/10"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Mô tả chi tiết *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
          rows={6}
          className="focus-visible:ring-black/10 focus-visible:border-black/10"
          required
        />
      </div>

      {/* File Upload */}
      <div>
        <Label>File đính kèm</Label>
        <div className="mt-2">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Kéo thả file hoặc click để chọn
            </p>
            <p className="text-xs text-gray-500">
              Hỗ trợ: PNG, JPG, PDF, DOC (tối đa 10MB mỗi file, 5 file)
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
              className="hidden"
              id="file-upload"
            />
            <Label htmlFor="file-upload" className="mt-2 inline-block">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
              >
                Chọn File
              </Button>
            </Label>
          </div>

          {/* Uploaded Files */}
          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachments.map((file, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Upload className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/80"
        >
          {isSubmitting ? "Đang tạo..." : "Tạo Ticket"}
        </Button>
      </div>
    </form>
  );
};

export default CreateTicketForm;
