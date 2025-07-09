import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image as ImageIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const comboSchema = z.object({
  name: z.string().min(2, "Tên combo phải có ít nhất 2 ký tự"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  originalPrice: z.number().min(0, "Giá gốc phải lớn hơn 0"),
  salePrice: z.number().min(0, "Giá bán phải lớn hơn 0"),
  isActive: z.boolean().default(true),
});

type ComboFormData = z.infer<typeof comboSchema>;

interface ComboFormProps {
  combo?: {
    id: string;
    name: string;
    type: string;
    description: string;
    price: number;
    image: string;
    status: string;
    menuItems: string[];
  };
  menuItems: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const mockMenuItems = [
  { id: "1", name: "Gà nướng mật ong", price: 250000 },
  { id: "2", name: "Salad trộn", price: 120000 },
  { id: "3", name: "Bánh kem sinh nhật", price: 350000 },
  { id: "4", name: "Nước cam tươi", price: 50000 },
  { id: "5", name: "Trang trí bàn", price: 200000 },
];

// Mock data cho loại combo
const comboTypes = [
  { id: "1", name: "Tiệc sinh nhật" },
  { id: "2", name: "Tiệc cưới" },
  { id: "3", name: "Tiệc công ty" },
  { id: "4", name: "Tiệc gia đình" },
];

export function ComboForm({
  combo,
  menuItems,
  onClose,
  onSubmit,
}: ComboFormProps) {
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    name: combo?.name || "",
    type: combo?.type || "",
    description: combo?.description || "",
    price: combo?.price || 0,
    image: combo?.image || "",
    status: combo?.status || "active",
    menuItems: combo?.menuItems || [],
  });

  const form = useForm<ComboFormData>({
    resolver: zodResolver(comboSchema),
    defaultValues: {
      name: combo?.name || "",
      description: combo?.description || "",
      originalPrice: combo?.originalPrice || 0,
      salePrice: combo?.salePrice || 0,
      isActive: combo?.isActive !== false,
    },
  });

  const addItem = (item) => {
    if (!selectedItems.find((selected) => selected.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
      updatePrices([...selectedItems, item]);
    }
  };

  const removeItem = (itemId) => {
    const newItems = selectedItems.filter((item) => item.id !== itemId);
    setSelectedItems(newItems);
    updatePrices(newItems);
  };

  const updatePrices = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    form.setValue("originalPrice", totalPrice);
    // Suggest 15% discount
    form.setValue("salePrice", Math.round(totalPrice * 0.85));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement image upload
      console.log("Upload image:", file);
    }
  };

  const handleMenuItemToggle = (itemId: string) => {
    setFormData((prev) => ({
      ...prev,
      menuItems: prev.menuItems.includes(itemId)
        ? prev.menuItems.filter((id) => id !== itemId)
        : [...prev.menuItems, itemId],
    }));
  };

  const onSubmitForm = async (data: ComboFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: combo ? "Cập nhật thành công" : "Tạo combo thành công",
        description: `Đã ${combo ? "cập nhật" : "tạo"} combo ${data.name}`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể lưu thông tin combo",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên combo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Nhập tên combo"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Loại combo</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại combo" />
                </SelectTrigger>
                <SelectContent>
                  {comboTypes.map((type) => (
                    <SelectItem key={type.id} value={type.name}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Nhập mô tả combo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Giá</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              placeholder="Nhập giá"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Hình ảnh</Label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  Chọn ảnh
                </Button>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG hoặc GIF. Tối đa 2MB.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Món ăn trong combo</Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
              {menuItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`menu-item-${item.id}`}
                    checked={formData.menuItems.includes(item.id)}
                    onCheckedChange={() => handleMenuItemToggle(item.id)}
                  />
                  <Label
                    htmlFor={`menu-item-${item.id}`}
                    className="text-sm font-normal"
                  >
                    {item.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Đang bán</SelectItem>
                <SelectItem value="inactive">Ngừng bán</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Đang lưu..."
                : combo
                ? "Cập nhật"
                : "Tạo mới"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
