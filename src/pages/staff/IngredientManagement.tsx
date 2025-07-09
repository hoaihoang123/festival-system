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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Search,
  Boxes,
  AlertTriangle,
  Package,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data cho nguyên liệu
const mockIngredients = [
  {
    id: 1,
    name: "Thịt bò",
    description: "Thịt bò tươi",
    unit: "kg",
    quantity: 15.5,
    minimumQuantity: 10,
    price: 250000,
    supplier: "Công ty TNHH Thực phẩm ABC",
    lastRestocked: "2024-03-15T08:00:00",
    isActive: true,
    category: "Thịt",
  },
  {
    id: 2,
    name: "Cá hồi",
    description: "Cá hồi Na Uy",
    unit: "kg",
    quantity: 8.2,
    minimumQuantity: 5,
    price: 450000,
    supplier: "Công ty TNHH Thủy sản XYZ",
    lastRestocked: "2024-03-14T10:30:00",
    isActive: true,
    category: "Hải sản",
  },
  {
    id: 3,
    name: "Rau xà lách",
    description: "Rau xà lách tươi",
    unit: "kg",
    quantity: 3.5,
    minimumQuantity: 5,
    price: 45000,
    supplier: "Công ty TNHH Nông sản DEF",
    lastRestocked: "2024-03-15T07:00:00",
    isActive: true,
    category: "Rau",
  },
];

export default function IngredientManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedIngredient, setSelectedIngredient] = useState<
    (typeof mockIngredients)[0] | null
  >(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdateQuantityOpen, setIsUpdateQuantityOpen] = useState(false);
  const [newQuantity, setNewQuantity] = useState("");

  // Lọc nguyên liệu
  const filteredIngredients = mockIngredients.filter((ingredient) => {
    const matchesSearch = ingredient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || ingredient.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Kiểm tra nguyên liệu sắp hết
  const lowStockIngredients = mockIngredients.filter(
    (ingredient) => ingredient.quantity <= ingredient.minimumQuantity
  );

  // Tính toán tỷ lệ số lượng
  const calculateQuantityRatio = (
    quantity: number,
    minimumQuantity: number
  ) => {
    return (quantity / minimumQuantity) * 100;
  };

  // Xử lý cập nhật số lượng
  const handleUpdateQuantity = () => {
    if (selectedIngredient && newQuantity) {
      // TODO: Gọi API cập nhật số lượng
      console.log(
        `Cập nhật số lượng ${selectedIngredient.name} thành ${newQuantity} ${selectedIngredient.unit}`
      );
      setIsUpdateQuantityOpen(false);
      setNewQuantity("");
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý nguyên liệu</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            Tổng số: {mockIngredients.length}
          </Badge>
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Sắp hết: {lowStockIngredients.length}
          </Badge>
        </div>
      </div>

      {/* Cảnh báo nguyên liệu sắp hết */}
      {lowStockIngredients.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Cảnh báo</AlertTitle>
          <AlertDescription>
            Có {lowStockIngredients.length} nguyên liệu sắp hết. Vui lòng liên
            hệ quản lý để nhập thêm.
          </AlertDescription>
        </Alert>
      )}

      {/* Bộ lọc và tìm kiếm */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Tìm kiếm nguyên liệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="Thịt">Thịt</SelectItem>
            <SelectItem value="Hải sản">Hải sản</SelectItem>
            <SelectItem value="Rau">Rau</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Danh sách nguyên liệu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIngredients.map((ingredient) => (
          <Card
            key={ingredient.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{ingredient.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {ingredient.category}
                  </p>
                </div>
                <Badge variant={ingredient.isActive ? "success" : "secondary"}>
                  {ingredient.isActive ? "Đang sử dụng" : "Ngừng sử dụng"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Số lượng hiện có</span>
                    <span
                      className={
                        ingredient.quantity <= ingredient.minimumQuantity
                          ? "text-red-500 font-medium"
                          : ""
                      }
                    >
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </div>
                  <Progress
                    value={calculateQuantityRatio(
                      ingredient.quantity,
                      ingredient.minimumQuantity
                    )}
                    className={
                      ingredient.quantity <= ingredient.minimumQuantity
                        ? "bg-red-100"
                        : ""
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Tối thiểu: {ingredient.minimumQuantity} {ingredient.unit}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Nhà cung cấp</span>
                  <span className="text-muted-foreground">
                    {ingredient.supplier}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lần nhập gần nhất</span>
                  <span className="text-muted-foreground">
                    {new Date(ingredient.lastRestocked).toLocaleDateString(
                      "vi-VN"
                    )}
                  </span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedIngredient(ingredient);
                      setIsDetailsOpen(true);
                    }}
                  >
                    Chi tiết
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedIngredient(ingredient);
                      setNewQuantity(ingredient.quantity.toString());
                      setIsUpdateQuantityOpen(true);
                    }}
                  >
                    Cập nhật số lượng
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog chi tiết nguyên liệu */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedIngredient?.name}</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về nguyên liệu
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Thông tin cơ bản</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Mô tả</p>
                  <p>{selectedIngredient?.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Danh mục</p>
                  <p>{selectedIngredient?.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Đơn vị</p>
                  <p>{selectedIngredient?.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giá mua vào</p>
                  <p>{selectedIngredient?.price.toLocaleString("vi-VN")} VNĐ</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Thông tin kho</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Số lượng hiện có
                  </p>
                  <p
                    className={
                      selectedIngredient?.quantity <=
                      selectedIngredient?.minimumQuantity
                        ? "text-red-500 font-medium"
                        : ""
                    }
                  >
                    {selectedIngredient?.quantity} {selectedIngredient?.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Số lượng tối thiểu
                  </p>
                  <p>
                    {selectedIngredient?.minimumQuantity}{" "}
                    {selectedIngredient?.unit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nhà cung cấp</p>
                  <p>{selectedIngredient?.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Lần nhập gần nhất
                  </p>
                  <p>
                    {new Date(
                      selectedIngredient?.lastRestocked || ""
                    ).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog cập nhật số lượng */}
      <Dialog
        open={isUpdateQuantityOpen}
        onOpenChange={setIsUpdateQuantityOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật số lượng</DialogTitle>
            <DialogDescription>
              Cập nhật số lượng cho {selectedIngredient?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Số lượng hiện tại: {selectedIngredient?.quantity}{" "}
                {selectedIngredient?.unit}
              </p>
              <Input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                placeholder="Nhập số lượng mới"
              />
            </div>
            {parseFloat(newQuantity) <=
              (selectedIngredient?.minimumQuantity || 0) && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Cảnh báo</AlertTitle>
                <AlertDescription>
                  Số lượng mới thấp hơn hoặc bằng số lượng tối thiểu. Vui lòng
                  liên hệ quản lý để nhập thêm.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsUpdateQuantityOpen(false)}
              >
                Hủy
              </Button>
              <Button onClick={handleUpdateQuantity}>Cập nhật</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
