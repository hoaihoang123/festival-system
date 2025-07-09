import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { ComboForm } from "@/components/admin/ComboForm";
import { useToast } from "@/hooks/use-toast";

// Mock data cho loại sự kiện
const eventTypes = [
  { id: "1", name: "Sinh nhật" },
  { id: "2", name: "Cưới hỏi" },
  { id: "3", name: "Họp mặt" },
  { id: "4", name: "Hội nghị" },
];

// Mock data cho combo
const mockCombos = [
  {
    id: "1",
    name: "Combo Tiệc Sinh Nhật",
    description: "Gồm bánh kem + nước uống + trang trí",
    originalPrice: 800000,
    salePrice: 650000,
    image: "/api/placeholder/300/200",
    status: "active",
    eventTypes: ["Sinh nhật"],
    menus: [
      { id: "1", name: "Gà nướng mật ong", quantity: 1 },
      { id: "2", name: "Salad trộn", quantity: 2 },
      { id: "3", name: "Bánh kem sinh nhật", quantity: 1 },
    ],
  },
  {
    id: "2",
    name: "Combo Tiệc Cưới",
    description: "Menu hoàn chỉnh cho 100 khách",
    originalPrice: 15000000,
    salePrice: 12000000,
    image: "/api/placeholder/300/200",
    status: "active",
    eventTypes: ["Cưới hỏi"],
    menus: [
      { id: "1", name: "Gà nướng mật ong", quantity: 10 },
      { id: "2", name: "Salad trộn", quantity: 20 },
      { id: "3", name: "Bánh kem sinh nhật", quantity: 5 },
    ],
  },
];

export default function ComboManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [isAddComboDialogOpen, setIsAddComboDialogOpen] = useState(false);
  const [isEditComboDialogOpen, setIsEditComboDialogOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [combos, setCombos] = useState(mockCombos);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredCombos = combos.filter((combo) => {
    const matchesSearch = combo.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEventType =
      selectedEventType === "all" ||
      combo.eventTypes.includes(selectedEventType);
    return matchesSearch && matchesEventType;
  });

  const handleAddCombo = (data: any) => {
    const newCombo = {
      id: Date.now().toString(),
      ...data,
    };
    setCombos((prev) => [...prev, newCombo]);
    setIsAddComboDialogOpen(false);
    toast({
      title: "Thêm combo thành công",
      description: `Đã thêm combo ${data.name}`,
    });
  };

  const handleEditCombo = (data: any) => {
    setCombos((prev) =>
      prev.map((combo) =>
        combo.id === selectedCombo.id ? { ...combo, ...data } : combo
      )
    );
    setIsEditComboDialogOpen(false);
    setSelectedCombo(null);
    toast({
      title: "Cập nhật thành công",
      description: `Đã cập nhật combo ${data.name}`,
    });
  };

  const handleDeleteCombo = (id: string) => {
    setCombos((prev) => prev.filter((combo) => combo.id !== id));
    toast({
      title: "Xóa combo thành công",
      description: "Combo đã được xóa",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Combo</h1>
          <p className="text-muted-foreground">
            Quản lý các gói combo cho sự kiện
          </p>
        </div>
        <Dialog
          open={isAddComboDialogOpen}
          onOpenChange={setIsAddComboDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm combo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Thêm combo mới</DialogTitle>
              <DialogDescription>
                Tạo gói combo mới cho các loại sự kiện
              </DialogDescription>
            </DialogHeader>
            <ComboForm
              menuItems={[]}
              onClose={() => setIsAddComboDialogOpen(false)}
              onSubmit={handleAddCombo}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Danh sách combo</CardTitle>
              <CardDescription>
                Quản lý các gói combo cho sự kiện
              </CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm combo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-[200px]"
                />
              </div>
              <Select
                value={selectedEventType}
                onValueChange={setSelectedEventType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn loại sự kiện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại sự kiện</SelectItem>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredCombos.map((combo) => (
              <Card key={combo.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-48 h-32 rounded-lg overflow-hidden">
                      <img
                        src={combo.image}
                        alt={combo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {combo.name}
                          </h3>
                          <p className="text-muted-foreground">
                            {combo.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedCombo(combo);
                              setIsEditComboDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCombo(combo.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(combo.originalPrice)}
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(combo.salePrice)}
                        </span>
                        <Badge variant="destructive">
                          -
                          {Math.round(
                            (1 - combo.salePrice / combo.originalPrice) * 100
                          )}
                          %
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          {combo.eventTypes.map((type) => (
                            <Badge key={type} variant="secondary">
                              {type}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Bao gồm:{" "}
                          {combo.menus
                            .map((menu) => `${menu.name} (${menu.quantity})`)
                            .join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isEditComboDialogOpen}
        onOpenChange={setIsEditComboDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật combo</DialogTitle>
          </DialogHeader>
          <ComboForm
            combo={selectedCombo}
            menuItems={[]}
            onClose={() => {
              setIsEditComboDialogOpen(false);
              setSelectedCombo(null);
            }}
            onSubmit={handleEditCombo}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
