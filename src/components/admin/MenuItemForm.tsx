import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image as ImageIcon } from "lucide-react";

interface MenuItemFormProps {
  menuItem?: {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
    status: string;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
}

// Mock data cho danh mục món ăn
const categories = [
  { id: "1", name: "Khai vị" },
  { id: "2", name: "Món chính" },
  { id: "3", name: "Tráng miệng" },
  { id: "4", name: "Đồ uống" },
];

export function MenuItemForm({
  menuItem,
  onClose,
  onSubmit,
}: MenuItemFormProps) {
  const [formData, setFormData] = useState({
    name: menuItem?.name || "",
    category: menuItem?.category || "",
    description: menuItem?.description || "",
    price: menuItem?.price || 0,
    image: menuItem?.image || "",
    status: menuItem?.status || "active",
  });

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên món</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Nhập tên món"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
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
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Nhập mô tả món"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Giá</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))
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
              onClick={() => document.getElementById("image-upload")?.click()}
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

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">{menuItem ? "Cập nhật" : "Thêm món"}</Button>
      </div>
    </form>
  );
}
