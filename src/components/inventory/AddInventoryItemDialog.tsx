import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
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

export interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  category: string;
  supplier: string;
  lastUpdated: string;
  thresholdLow: number;
  thresholdHigh: number;
}

interface AddInventoryItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<InventoryItem, "id" | "lastUpdated">) => void;
}

export function AddInventoryItemDialog({
  isOpen,
  onClose,
  onAdd,
}: AddInventoryItemDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    currentStock: 0,
    unit: "",
    category: "",
    supplier: "",
    thresholdLow: 0,
    thresholdHigh: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "currentStock" ||
        name === "thresholdLow" ||
        name === "thresholdHigh"
          ? Number(value)
          : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      currentStock: 0,
      unit: "",
      category: "",
      supplier: "",
      thresholdLow: 0,
      thresholdHigh: 0,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm mặt hàng mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên mặt hàng</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentStock">Số lượng hiện tại</Label>
            <Input
              id="currentStock"
              name="currentStock"
              type="number"
              value={formData.currentStock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Đơn vị</Label>
            <Input
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nguyên liệu">Nguyên liệu</SelectItem>
                <SelectItem value="Đồ uống">Đồ uống</SelectItem>
                <SelectItem value="Dụng cụ">Dụng cụ</SelectItem>
                <SelectItem value="Khác">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="supplier">Nhà cung cấp</Label>
            <Input
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thresholdLow">Ngưỡng cảnh báo thấp</Label>
            <Input
              id="thresholdLow"
              name="thresholdLow"
              type="number"
              value={formData.thresholdLow}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thresholdHigh">Ngưỡng cảnh báo cao</Label>
            <Input
              id="thresholdHigh"
              name="thresholdHigh"
              type="number"
              value={formData.thresholdHigh}
              onChange={handleChange}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">Thêm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
