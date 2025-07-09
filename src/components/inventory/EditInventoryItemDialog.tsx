import React, { useState, useEffect } from "react";
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

interface InventoryItem {
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

interface EditInventoryItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: InventoryItem) => void;
  item: InventoryItem | null;
}

export function EditInventoryItemDialog({
  isOpen,
  onClose,
  onEdit,
  item,
}: EditInventoryItemDialogProps) {
  const [formData, setFormData] = useState<InventoryItem | null>(null);

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (formData) {
      setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onEdit({
        ...formData,
        lastUpdated: new Date().toISOString(),
      });
      onClose();
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa Mặt hàng</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Tên mặt hàng</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
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
          <div>
            <Label htmlFor="unit">Đơn vị</Label>
            <Input
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </div>
          <div>
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
                <SelectItem value="Vật tư">Vật tư</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="supplier">Nhà cung cấp</Label>
            <Input
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="thresholdLow">Ngưỡng thấp</Label>
            <Input
              id="thresholdLow"
              name="thresholdLow"
              type="number"
              value={formData.thresholdLow}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="thresholdHigh">Ngưỡng cao</Label>
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
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
