import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Search, UtensilsCrossed, Calendar } from "lucide-react";

// Mock data cho combo
const mockCombos = [
  {
    id: 1,
    name: "Combo Tiệc Sinh Nhật Cơ Bản",
    description: "Combo phù hợp cho tiệc sinh nhật nhỏ với 20-30 người",
    price: 2500000,
    image: "https://example.com/birthday-basic.jpg",
    isActive: true,
    menus: [
      { id: 1, name: "Gà rán", description: "Gà rán giòn", price: 150000 },
      { id: 2, name: "Pizza", description: "Pizza hải sản", price: 200000 },
      {
        id: 3,
        name: "Nước ngọt",
        description: "Các loại nước ngọt",
        price: 50000,
      },
    ],
    eventTypes: [
      { id: 1, name: "Sinh nhật" },
      { id: 2, name: "Họp mặt" },
    ],
  },
  {
    id: 2,
    name: "Combo Tiệc Cưới Cao Cấp",
    description: "Combo sang trọng cho tiệc cưới với 100-150 khách",
    price: 15000000,
    image: "https://example.com/wedding-premium.jpg",
    isActive: true,
    menus: [
      { id: 4, name: "Bò Wagyu", description: "Bò Wagyu A5", price: 1500000 },
      { id: 5, name: "Tôm hùm", description: "Tôm hùm Alaska", price: 2000000 },
      {
        id: 6,
        name: "Rượu vang",
        description: "Rượu vang Pháp",
        price: 1000000,
      },
    ],
    eventTypes: [
      { id: 3, name: "Tiệc cưới" },
      { id: 4, name: "Sự kiện" },
    ],
  },
  {
    id: 3,
    name: "Combo Tiệc Doanh Nghiệp",
    description: "Combo chuyên nghiệp cho các sự kiện doanh nghiệp",
    price: 8000000,
    image: "https://example.com/corporate.jpg",
    isActive: true,
    menus: [
      { id: 7, name: "Bánh mì", description: "Bánh mì sandwich", price: 50000 },
      { id: 8, name: "Salad", description: "Salad trộn", price: 80000 },
      { id: 9, name: "Cà phê", description: "Cà phê cao cấp", price: 45000 },
    ],
    eventTypes: [
      { id: 5, name: "Họp doanh nghiệp" },
      { id: 6, name: "Hội thảo" },
    ],
  },
];

// Mock data cho loại sự kiện
const mockEventTypes = [
  { id: 1, name: "Sinh nhật" },
  { id: 2, name: "Họp mặt" },
  { id: 3, name: "Tiệc cưới" },
  { id: 4, name: "Sự kiện" },
  { id: 5, name: "Họp doanh nghiệp" },
  { id: 6, name: "Hội thảo" },
];

export default function ComboManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [selectedCombo, setSelectedCombo] = useState<
    (typeof mockCombos)[0] | null
  >(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Lọc combo
  const filteredCombos = mockCombos.filter((combo) => {
    const matchesSearch = combo.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEventType =
      eventTypeFilter === "all" ||
      combo.eventTypes.some((type) => type.id.toString() === eventTypeFilter);
    return matchesSearch && matchesEventType;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý Combo</h1>
        <Badge variant="outline" className="flex items-center gap-1">
          <Package className="h-4 w-4" />
          Tổng số: {mockCombos.length}
        </Badge>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Tìm kiếm combo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Loại sự kiện" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            {mockEventTypes.map((type) => (
              <SelectItem key={type.id} value={type.id.toString()}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Danh sách combo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCombos.map((combo) => (
          <Card key={combo.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{combo.name}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {combo.description}
                  </p>
                </div>
                <Badge variant={combo.isActive ? "success" : "secondary"}>
                  {combo.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    {combo.price.toLocaleString("vi-VN")} VNĐ
                  </span>
                  <div className="flex gap-1">
                    {combo.eventTypes.map((type) => (
                      <Badge key={type.id} variant="outline">
                        {type.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedCombo(combo);
                      setIsDetailsOpen(true);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog chi tiết combo */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedCombo?.name}</DialogTitle>
            <DialogDescription>{selectedCombo?.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="space-y-6 pr-4">
              <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedCombo?.image}
                  alt={selectedCombo?.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thông tin cơ bản */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Thông tin cơ bản</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Giá combo
                        </p>
                        <p className="text-lg font-semibold">
                          {selectedCombo?.price.toLocaleString("vi-VN")} VNĐ
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Trạng thái
                        </p>
                        <Badge
                          variant={
                            selectedCombo?.isActive ? "success" : "secondary"
                          }
                        >
                          {selectedCombo?.isActive
                            ? "Đang hoạt động"
                            : "Ngừng hoạt động"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Loại sự kiện */}
                  <div>
                    <h4 className="font-medium mb-3">Loại sự kiện phù hợp</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCombo?.eventTypes.map((type) => (
                        <Badge key={type.id} variant="secondary">
                          {type.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Danh sách món ăn */}
                <div>
                  <h4 className="font-medium mb-3">Danh sách món ăn</h4>
                  <div className="space-y-3">
                    {selectedCombo?.menus.map((menu) => (
                      <div
                        key={menu.id}
                        className="flex justify-between items-start p-3 rounded-lg border"
                      >
                        <div>
                          <p className="font-medium">{menu.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {menu.description}
                          </p>
                        </div>
                        <p className="font-medium whitespace-nowrap ml-4">
                          {menu.price.toLocaleString("vi-VN")} VNĐ
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
