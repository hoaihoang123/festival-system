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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { MenuItemForm } from "@/components/admin/MenuItemForm";
import { useToast } from "@/hooks/use-toast";

// Mock data cho danh mục món ăn
const categories = [
  { id: "1", name: "Khai vị" },
  { id: "2", name: "Món chính" },
  { id: "3", name: "Tráng miệng" },
  { id: "4", name: "Đồ uống" },
];

// Mock data cho menu items
const mockMenuItems = [
  {
    id: "1",
    name: "Gà nướng mật ong",
    category: "Món chính",
    description: "Gà nướng với sốt mật ong đặc biệt",
    price: 250000,
    image: "/api/placeholder/150/150",
    status: "active",
  },
  {
    id: "2",
    name: "Salad trộn",
    category: "Khai vị",
    description: "Salad rau củ tươi với sốt đặc biệt",
    price: 120000,
    image: "/api/placeholder/150/150",
    status: "active",
  },
  {
    id: "3",
    name: "Bánh kem sinh nhật",
    category: "Tráng miệng",
    description: "Bánh kem tươi với nhiều lớp",
    price: 350000,
    image: "/api/placeholder/150/150",
    status: "inactive",
  },
];

export default function MenuManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState(mockMenuItems);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddMenuItem = (data: any) => {
    const newMenuItem = {
      id: Date.now().toString(),
      ...data,
    };
    setMenuItems((prev) => [...prev, newMenuItem]);
    setIsAddItemDialogOpen(false);
    toast({
      title: "Thêm món thành công",
      description: `Đã thêm món ${data.name}`,
    });
  };

  const handleEditMenuItem = (data: any) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id ? { ...item, ...data } : item
      )
    );
    setIsEditDialogOpen(false);
    setSelectedItem(null);
    toast({
      title: "Cập nhật thành công",
      description: `Đã cập nhật món ${data.name}`,
    });
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Xóa món thành công",
      description: "Món đã được xóa khỏi menu",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Menu</h1>
          <p className="text-muted-foreground">
            Quản lý món ăn và đồ uống cho các sự kiện
          </p>
        </div>
        <Dialog
          open={isAddItemDialogOpen}
          onOpenChange={setIsAddItemDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm món
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Thêm món mới</DialogTitle>
              <DialogDescription>
                Thêm món ăn hoặc đồ uống mới vào menu
              </DialogDescription>
            </DialogHeader>
            <MenuItemForm
              onClose={() => setIsAddItemDialogOpen(false)}
              onSubmit={handleAddMenuItem}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Danh sách món</CardTitle>
              <CardDescription>Quản lý các món ăn và đồ uống</CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm món..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-[200px]"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tên món</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "active" ? "default" : "secondary"
                      }
                    >
                      {item.status === "active" ? "Đang bán" : "Ngừng bán"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMenuItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật món</DialogTitle>
          </DialogHeader>
          <MenuItemForm
            menuItem={selectedItem}
            onClose={() => {
              setIsEditDialogOpen(false);
              setSelectedItem(null);
            }}
            onSubmit={handleEditMenuItem}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
