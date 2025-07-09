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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Mock data cho danh sách món ăn
const mockMenuItems = [
  {
    id: "1",
    name: "Gỏi cuốn",
    category: "Khai vị",
    currentPrice: 45000,
    priceHistory: [
      { date: "2024-01-01", price: 40000 },
      { date: "2024-02-01", price: 45000 },
    ],
  },
  {
    id: "2",
    name: "Cơm rang",
    category: "Món chính",
    currentPrice: 65000,
    priceHistory: [
      { date: "2024-01-01", price: 60000 },
      { date: "2024-02-01", price: 65000 },
    ],
  },
];

// Mock data cho danh sách combo
const mockCombos = [
  {
    id: "1",
    name: "Combo Sinh Nhật Cơ Bản",
    type: "Tiệc sinh nhật",
    currentPrice: 1500000,
    priceHistory: [
      { date: "2024-01-01", price: 1400000 },
      { date: "2024-02-01", price: 1500000 },
    ],
  },
  {
    id: "2",
    name: "Combo Cưới Hỏi",
    type: "Tiệc cưới",
    currentPrice: 5000000,
    priceHistory: [
      { date: "2024-01-01", price: 4800000 },
      { date: "2024-02-01", price: 5000000 },
    ],
  },
];

export default function PricingManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("menu");
  const [isUpdatePriceDialogOpen, setIsUpdatePriceDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [newPrice, setNewPrice] = useState("");

  const handleUpdatePrice = () => {
    if (!selectedItem || !newPrice) return;

    const price = Number(newPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập giá hợp lệ",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement API call to update price
    toast({
      title: "Cập nhật giá thành công",
      description: `Đã cập nhật giá ${
        selectedItem.name
      } thành ${price.toLocaleString("vi-VN")}đ`,
    });

    setIsUpdatePriceDialogOpen(false);
    setSelectedItem(null);
    setNewPrice("");
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý giá</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="combos">Combo</TabsTrigger>
        </TabsList>

        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách món ăn</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên món</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Giá hiện tại</TableHead>
                    <TableHead>Lịch sử giá</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMenuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        {item.currentPrice.toLocaleString("vi-VN")}đ
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {item.priceHistory.map((history, index) => (
                            <div
                              key={index}
                              className="text-sm text-muted-foreground"
                            >
                              {new Date(history.date).toLocaleDateString(
                                "vi-VN"
                              )}
                              : {history.price.toLocaleString("vi-VN")}đ
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setNewPrice(item.currentPrice.toString());
                            setIsUpdatePriceDialogOpen(true);
                          }}
                        >
                          Cập nhật giá
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="combos">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách combo</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên combo</TableHead>
                    <TableHead>Loại combo</TableHead>
                    <TableHead>Giá hiện tại</TableHead>
                    <TableHead>Lịch sử giá</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCombos.map((combo) => (
                    <TableRow key={combo.id}>
                      <TableCell>{combo.name}</TableCell>
                      <TableCell>{combo.type}</TableCell>
                      <TableCell>
                        {combo.currentPrice.toLocaleString("vi-VN")}đ
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {combo.priceHistory.map((history, index) => (
                            <div
                              key={index}
                              className="text-sm text-muted-foreground"
                            >
                              {new Date(history.date).toLocaleDateString(
                                "vi-VN"
                              )}
                              : {history.price.toLocaleString("vi-VN")}đ
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(combo);
                            setNewPrice(combo.currentPrice.toString());
                            setIsUpdatePriceDialogOpen(true);
                          }}
                        >
                          Cập nhật giá
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog
        open={isUpdatePriceDialogOpen}
        onOpenChange={setIsUpdatePriceDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật giá</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tên {activeTab === "menu" ? "món" : "combo"}</Label>
              <Input value={selectedItem?.name} disabled />
            </div>
            <div className="space-y-2">
              <Label>Giá mới</Label>
              <Input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Nhập giá mới"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsUpdatePriceDialogOpen(false);
                  setSelectedItem(null);
                  setNewPrice("");
                }}
              >
                Hủy
              </Button>
              <Button onClick={handleUpdatePrice}>Cập nhật</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
