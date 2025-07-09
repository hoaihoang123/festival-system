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
import { Textarea } from "@/components/ui/textarea";

interface PurchasePlan {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  status: "pending" | "approved" | "rejected" | "completed";
  requestedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  reason?: string;
}

interface PurchasePlanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: PurchasePlan) => void;
  initialData?: PurchasePlan;
}

export function PurchasePlanForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: PurchasePlanFormProps) {
  const [formData, setFormData] = React.useState<PurchasePlan>({
    id: initialData?.id || "",
    itemName: initialData?.itemName || "",
    quantity: initialData?.quantity || 0,
    unit: initialData?.unit || "",
    status: initialData?.status || "pending",
    requestedDate: initialData?.requestedDate || new Date().toISOString(),
    approvedBy: initialData?.approvedBy,
    approvedDate: initialData?.approvedDate,
    reason: initialData?.reason,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
              ? "Chỉnh sửa Kế hoạch Mua hàng"
              : "Tạo Kế hoạch Mua hàng Mới"}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Số lượng</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
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
          </div>
          {initialData?.status === "rejected" && (
            <div>
              <Label htmlFor="reason">Lý do từ chối</Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              {initialData ? "Cập nhật" : "Tạo mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
