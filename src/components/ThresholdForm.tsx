import React from "react";
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

interface InventoryThreshold {
  itemId: string;
  itemName: string;
  lowThreshold: number;
  highThreshold?: number;
  unit: string;
}

interface ThresholdFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (threshold: InventoryThreshold) => void;
  initialData?: InventoryThreshold; // For editing
}

export function ThresholdForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ThresholdFormProps) {
  const [formData, setFormData] = React.useState<InventoryThreshold>({
    itemId: initialData?.itemId || "",
    itemName: initialData?.itemName || "",
    lowThreshold: initialData?.lowThreshold || 0,
    highThreshold: initialData?.highThreshold,
    unit: initialData?.unit || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? "Chỉnh sửa Ngưỡng Tồn kho"
              : "Đặt Ngưỡng Tồn kho Mới"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="itemName">Tên Mặt hàng</Label>
            <Input
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lowThreshold">Ngưỡng Thấp</Label>
            <Input
              id="lowThreshold"
              name="lowThreshold"
              type="number"
              value={formData.lowThreshold}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="highThreshold">Ngưỡng Cao (Tùy chọn)</Label>
            <Input
              id="highThreshold"
              name="highThreshold"
              type="number"
              value={formData.highThreshold || ""}
              onChange={handleChange}
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
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              {initialData ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
