import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Package,
  Warehouse,
  AlertTriangle,
  ShoppingCart,
  BarChart,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  CalendarIcon,
  Clock,
  Minus,
  Users,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { AddInventoryItemDialog } from "@/components/inventory/AddInventoryItemDialog";
import { EditInventoryItemDialog } from "@/components/inventory/EditInventoryItemDialog";
import { toast } from "sonner";
import { ThresholdForm } from "@/components/ThresholdForm";
import { PurchasePlanForm } from "@/components/PurchasePlanForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock Data Interfaces
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

interface PurchasePlan {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  status: "pending" | "approved" | "rejected" | "completed";
  requestedDate: string; // ISO string
  approvedBy?: string;
  approvedDate?: string; // ISO string
  reason?: string;
}

interface InventoryThreshold {
  itemId: string;
  itemName: string;
  lowThreshold: number;
  highThreshold?: number;
  unit: string;
}

interface InventoryHistoryEntry {
  id: string;
  itemName: string;
  type: "import" | "export"; // Nhập hoặc xuất
  quantity: number;
  unit: string;
  date: string; // ISO string
  reason?: string; // Lý do nhập/xuất (ví dụ: nhập từ nhà cung cấp, xuất cho tiệc X, hư hỏng)
  personInCharge?: string; // Người chịu trách nhiệm
}

// Mock Data
const mockInventoryItems: InventoryItem[] = [
  {
    id: "inv1",
    name: "Rượu vang đỏ",
    currentStock: 50,
    unit: "chai",
    category: "Đồ uống",
    supplier: "Công ty TNHH ABC",
    lastUpdated: "2024-02-20T10:00:00Z",
    thresholdLow: 20,
    thresholdHigh: 200,
  },
  {
    id: "inv2",
    name: "Bia tươi",
    currentStock: 30,
    unit: "thùng",
    category: "Đồ uống",
    supplier: "Công ty TNHH XYZ",
    lastUpdated: "2024-02-20T09:30:00Z",
    thresholdLow: 10,
    thresholdHigh: 100,
  },
  {
    id: "inv3",
    name: "Đĩa sứ",
    currentStock: 100,
    unit: "cái",
    category: "Dụng cụ",
    supplier: "Công ty TNHH DEF",
    lastUpdated: "2024-02-20T11:00:00Z",
    thresholdLow: 30,
    thresholdHigh: 50,
  },
  {
    id: "inv4",
    name: "Ly thủy tinh",
    currentStock: 200,
    unit: "cái",
    category: "Dụng cụ",
    supplier: "Công ty TNHH GHI",
    lastUpdated: "2024-02-20T10:30:00Z",
    thresholdLow: 50,
    thresholdHigh: 50,
  },
];

const mockPurchasePlans: PurchasePlan[] = [
  {
    id: "plan1",
    itemName: "Thịt bò Úc",
    quantity: 30,
    unit: "kg",
    status: "pending",
    requestedDate: "2024-03-25T10:00:00Z",
  },
  {
    id: "plan2",
    itemName: "Gạo ST25",
    quantity: 100,
    unit: "kg",
    status: "approved",
    requestedDate: "2024-03-20T11:00:00Z",
    approvedBy: "Quản lý A",
    approvedDate: "2024-03-20T15:00:00Z",
  },
  {
    id: "plan3",
    itemName: "Khăn giấy Napkin",
    quantity: 20,
    unit: "gói",
    status: "rejected",
    requestedDate: "2024-03-18T09:00:00Z",
    reason: "Không đủ ngân sách",
  },
];

const mockInventoryThresholds: InventoryThreshold[] = [
  {
    itemId: "inv1",
    itemName: "Gạo ST25",
    lowThreshold: 50,
    highThreshold: 200,
    unit: "kg",
  },
  {
    itemId: "inv2",
    itemName: "Nước ngọt Coca-Cola",
    lowThreshold: 20,
    highThreshold: 100,
    unit: "thùng",
  },
  {
    itemId: "inv3",
    itemName: "Thịt bò Úc",
    lowThreshold: 10,
    highThreshold: 50,
    unit: "kg",
  },
  {
    itemId: "inv4",
    itemName: "Khăn giấy Napkin",
    lowThreshold: 10,
    highThreshold: 50,
    unit: "gói",
  },
];

const mockInventoryHistory: InventoryHistoryEntry[] = [
  {
    id: "hist1",
    itemName: "Rượu vang đỏ",
    type: "import",
    quantity: 50,
    unit: "chai",
    date: "2024-03-01T09:00:00Z",
    reason: "Nhập từ nhà cung cấp ABC",
    personInCharge: "Nguyễn Văn A",
  },
  {
    id: "hist2",
    itemName: "Bia tươi",
    type: "export",
    quantity: 10,
    unit: "thùng",
    date: "2024-03-05T14:30:00Z",
    reason: "Xuất cho tiệc sinh nhật của khách hàng X",
    personInCharge: "Trần Thị B",
  },
  {
    id: "hist3",
    itemName: "Đĩa sứ",
    type: "import",
    quantity: 20,
    unit: "cái",
    date: "2024-03-10T11:00:00Z",
    reason: "Nhập bổ sung",
    personInCharge: "Lê Văn C",
  },
  {
    id: "hist4",
    itemName: "Ly thủy tinh",
    type: "export",
    quantity: 5,
    unit: "cái",
    date: "2024-03-12T16:00:00Z",
    reason: "Hư hỏng trong quá trình sử dụng",
    personInCharge: "Phạm Văn D",
  },
];

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [historySearchTerm, setHistorySearchTerm] = useState("");
  const [historyTypeFilter, setHistoryTypeFilter] = useState("all");
  const [currentTab, setCurrentTab] = useState("overview");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [inventoryItems, setInventoryItems] =
    useState<InventoryItem[]>(mockInventoryItems);
  const [isThresholdFormOpen, setIsThresholdFormOpen] = useState(false);
  const [editingThreshold, setEditingThreshold] = useState<
    InventoryThreshold | undefined
  >();
  const [thresholds, setThresholds] = useState<InventoryThreshold[]>(
    mockInventoryThresholds
  );
  const [isPurchasePlanFormOpen, setIsPurchasePlanFormOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PurchasePlan | undefined>();
  const [purchasePlans, setPurchasePlans] =
    useState<PurchasePlan[]>(mockPurchasePlans);

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventoryItems.filter(
    (item) => item.currentStock <= (item.thresholdLow || 0)
  );

  const overstockItems = inventoryItems.filter(
    (item) => item.currentStock >= (item.thresholdHigh || Infinity)
  );

  const filteredHistory = mockInventoryHistory.filter((entry) => {
    const matchesSearch =
      entry.itemName.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
      entry.reason?.toLowerCase().includes(historySearchTerm.toLowerCase()) ||
      entry.personInCharge
        ?.toLowerCase()
        .includes(historySearchTerm.toLowerCase());
    const matchesType =
      historyTypeFilter === "all" || entry.type === historyTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddItem = (
    newItem: Omit<InventoryItem, "id" | "lastUpdated">
  ) => {
    // In a real application, this would be an API call
    const item: InventoryItem = {
      ...newItem,
      id: `inv${inventoryItems.length + 1}`,
      lastUpdated: new Date().toISOString(),
    };
    setInventoryItems((prev) => [...prev, item]);
    toast.success("Đã thêm mặt hàng mới thành công!");
  };

  const handleEditItem = (itemId: string) => {
    const item = inventoryItems.find((item) => item.id === itemId);
    if (item) {
      setSelectedItem(item);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveEdit = (editedItem: InventoryItem) => {
    // In a real application, this would be an API call
    setInventoryItems((prev) =>
      prev.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
    toast.success("Đã cập nhật mặt hàng thành công!");
  };

  const handleDeleteItem = (itemId: string) => {
    setInventoryItems((prev) => prev.filter((item) => item.id !== itemId));
    toast.success("Đã xóa mặt hàng thành công!");
  };

  const getInventoryStatusBadge = (item: InventoryItem) => {
    if (item.currentStock <= item.thresholdLow) {
      return (
        <Badge
          variant="destructive"
          className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200 px-3 py-1 text-md"
        >
          <AlertTriangle className="h-4 w-4" /> Tồn kho thấp
        </Badge>
      );
    } else if (item.thresholdHigh && item.currentStock >= item.thresholdHigh) {
      return (
        <Badge
          variant="default"
          className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 px-3 py-1 text-md"
        >
          <Warehouse className="h-4 w-4" /> Tồn kho cao
        </Badge>
      );
    }
    return (
      <Badge
        variant="default"
        className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 text-md"
      >
        <Package className="h-4 w-4" /> Bình thường
      </Badge>
    );
  };

  const getPurchasePlanStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Chờ duyệt
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Đã duyệt
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Từ chối
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="flex items-center gap-1">
            {status}
          </Badge>
        );
    }
  };

  const handleAddThreshold = () => {
    setEditingThreshold(undefined);
    setIsThresholdFormOpen(true);
  };

  const handleEditThreshold = (threshold: InventoryThreshold) => {
    setEditingThreshold(threshold);
    setIsThresholdFormOpen(true);
  };

  const handleDeleteThreshold = (thresholdId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ngưỡng này?")) {
      setThresholds(thresholds.filter((t) => t.itemId !== thresholdId));
      toast.success("Đã xóa ngưỡng thành công!");
    }
  };

  const handleThresholdSubmit = (threshold: InventoryThreshold) => {
    if (editingThreshold) {
      // Update existing threshold
      setThresholds(
        thresholds.map((t) => (t.itemId === threshold.itemId ? threshold : t))
      );
    } else {
      // Add new threshold
      setThresholds([
        ...thresholds,
        { ...threshold, itemId: `threshold-${Date.now()}` },
      ]);
    }
    toast.success("Đã lưu ngưỡng thành công!");
    setIsThresholdFormOpen(false);
  };

  const handleAddPurchasePlan = () => {
    setEditingPlan(undefined);
    setIsPurchasePlanFormOpen(true);
  };

  const handleEditPurchasePlan = (plan: PurchasePlan) => {
    setEditingPlan(plan);
    setIsPurchasePlanFormOpen(true);
  };

  const handleDeletePurchasePlan = (planId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kế hoạch này?")) {
      setPurchasePlans(purchasePlans.filter((p) => p.id !== planId));
    }
  };

  const handleApprovePlan = (plan: PurchasePlan) => {
    if (window.confirm("Bạn có chắc chắn muốn duyệt kế hoạch này?")) {
      setPurchasePlans(
        purchasePlans.map((p) =>
          p.id === plan.id
            ? {
                ...p,
                status: "approved",
                approvedBy: "Quản lý hiện tại", // This should come from auth context
                approvedDate: new Date().toISOString(),
              }
            : p
        )
      );
    }
  };

  const handleRejectPlan = (plan: PurchasePlan) => {
    const reason = window.prompt("Vui lòng nhập lý do từ chối:");
    if (reason) {
      setPurchasePlans(
        purchasePlans.map((p) =>
          p.id === plan.id
            ? {
                ...p,
                status: "rejected",
                reason,
              }
            : p
        )
      );
    }
  };

  const handlePurchasePlanSubmit = (plan: PurchasePlan) => {
    if (editingPlan) {
      // Update existing plan
      setPurchasePlans(purchasePlans.map((p) => (p.id === plan.id ? plan : p)));
    } else {
      // Add new plan
      setPurchasePlans([
        ...purchasePlans,
        { ...plan, id: `plan-${Date.now()}` },
      ]);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý Tồn kho</h1>
          <p className="text-muted-foreground mt-2">
            Theo dõi, kiểm soát và quản lý hàng tồn kho của nhà hàng.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Thêm mặt hàng mới
        </Button>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-fit p-1 h-auto bg-muted/40 rounded-lg shadow-inner mb-6">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            Tổng quan
          </TabsTrigger>
          <TabsTrigger
            value="thresholds"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            Ngưỡng tồn kho
          </TabsTrigger>
          <TabsTrigger
            value="purchase-plans"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            Kế hoạch mua hàng
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            Lịch sử XNK
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            Báo cáo
          </TabsTrigger>
        </TabsList>

        {/* Tab: Tổng quan Tồn kho / Danh sách Mặt hàng */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold">Danh sách Mặt hàng Tồn kho</h2>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm mặt hàng, danh mục, nhà cung cấp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4 shadow-lg bg-card/50">
            <div className="space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="p-5 bg-card transition-colors hover:bg-muted/50 border border-transparent hover:border-primary/20 duration-200"
                  >
                    <CardHeader className="p-0 pb-3 flex flex-row justify-between items-center border-b border-dashed mb-3">
                      <div>
                        <CardTitle className="text-lg font-semibold text-primary mb-1">
                          {item.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Hiện có:{" "}
                          <span className="font-medium">
                            {item.currentStock} {item.unit}
                          </span>
                        </CardDescription>
                      </div>
                      {getInventoryStatusBadge(item)}
                    </CardHeader>
                    <CardContent className="p-0 pt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" /> Danh mục:{" "}
                          <span className="font-medium">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" /> Nhà cung cấp:{" "}
                          <span className="font-medium">{item.supplier}</span>
                        </div>
                        {item.lastUpdated && (
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" /> Cập nhật cuối:{" "}
                            <span className="font-medium">
                              {format(
                                parseISO(item.lastUpdated),
                                "dd MMMM yyyy",
                                { locale: vi }
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                      {item.thresholdLow !== undefined && (
                        <div className="mt-3 pt-3 border-t border-dashed flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <span className="font-medium mr-1">
                            Ngưỡng cảnh báo:
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 px-3 py-1 text-md flex items-center gap-1"
                          >
                            <AlertTriangle className="h-4 w-4" /> Thấp:{" "}
                            {item.thresholdLow} {item.unit}
                          </Badge>
                          {item.thresholdHigh !== undefined && (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 px-3 py-1 text-md flex items-center gap-1"
                            >
                              <Warehouse className="h-4 w-4" /> Cao:{" "}
                              {item.thresholdHigh} {item.unit}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Xóa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-10 text-lg">
                  Không tìm thấy mặt hàng nào trong kho.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Tab: Ngưỡng Tồn kho */}
        <TabsContent value="thresholds" className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold">Quản lý Ngưỡng Tồn kho</h2>
          <p className="text-muted-foreground mb-4">
            Thiết lập và theo dõi các ngưỡng cảnh báo cho từng mặt hàng.
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
            onClick={handleAddThreshold}
          >
            <Plus className="h-4 w-4 mr-2" />
            Đặt ngưỡng mới
          </Button>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4 shadow-lg bg-card/50">
            <div className="space-y-4">
              {thresholds.length > 0 ? (
                thresholds.map((threshold) => (
                  <Card
                    key={threshold.itemId}
                    className="p-5 bg-card transition-colors hover:bg-muted/50 border border-transparent hover:border-primary/20 duration-200"
                  >
                    <CardHeader className="p-0 pb-3 flex flex-row justify-between items-center border-b border-dashed mb-3">
                      <CardTitle className="text-lg font-semibold text-primary mb-1">
                        {threshold.itemName}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 px-3 py-1 text-md flex items-center gap-1"
                        >
                          <AlertTriangle className="h-4 w-4" /> Thấp:{" "}
                          {threshold.lowThreshold} {threshold.unit}
                        </Badge>
                        {threshold.highThreshold && (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 px-3 py-1 text-md flex items-center gap-1"
                          >
                            <Warehouse className="h-4 w-4" /> Cao:{" "}
                            {threshold.highThreshold} {threshold.unit}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 pt-3">
                      <p className="text-sm text-muted-foreground mb-3">
                        Ngưỡng cảnh báo giúp bạn quản lý tồn kho hiệu quả, tránh
                        thiếu hụt hoặc dư thừa.
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEditThreshold(threshold)}
                        >
                          <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa ngưỡng
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={() =>
                            handleDeleteThreshold(threshold.itemId)
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Xóa ngưỡng
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-10 text-lg">
                  Chưa có ngưỡng tồn kho nào được thiết lập.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Tab: Kế hoạch Mua hàng */}
        <TabsContent value="purchase-plans" className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold">Kế hoạch Mua hàng</h2>
          <p className="text-muted-foreground mb-4">
            Theo dõi và quản lý các kế hoạch mua sắm nguyên vật liệu, sản phẩm.
          </p>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
            onClick={handleAddPurchasePlan}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tạo kế hoạch mới
          </Button>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4 shadow-lg bg-card/50">
            <div className="space-y-4">
              {purchasePlans.length > 0 ? (
                purchasePlans.map((plan) => (
                  <Card
                    key={plan.id}
                    className="p-5 bg-card transition-colors hover:bg-muted/50 border border-transparent hover:border-primary/20 duration-200"
                  >
                    <CardHeader className="p-0 pb-3 flex flex-row justify-between items-center border-b border-dashed mb-3">
                      <div>
                        <CardTitle className="text-lg font-semibold text-primary mb-1">
                          Kế hoạch mua: {plan.itemName}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Số lượng:{" "}
                          <span className="font-medium">
                            {plan.quantity} {plan.unit}
                          </span>
                        </CardDescription>
                      </div>
                      {getPurchasePlanStatusBadge(plan.status)}
                    </CardHeader>
                    <CardContent className="p-0 pt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" /> Ngày yêu cầu:{" "}
                          <span className="font-medium">
                            {format(
                              parseISO(plan.requestedDate),
                              "dd MMMM yyyy",
                              { locale: vi }
                            )}
                          </span>
                        </div>
                        {plan.approvedBy && plan.approvedDate && (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="h-4 w-4" /> Duyệt bởi:{" "}
                            <span className="font-medium">
                              {plan.approvedBy}
                            </span>{" "}
                            vào ngày{" "}
                            <span className="font-medium">
                              {format(
                                parseISO(plan.approvedDate),
                                "dd MMMM yyyy",
                                { locale: vi }
                              )}
                            </span>
                          </div>
                        )}
                        {plan.status === "rejected" && plan.reason && (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle className="h-4 w-4" /> Lý do từ chối:{" "}
                            <span className="font-medium">{plan.reason}</span>
                          </div>
                        )}
                      </div>
                      {plan.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleApprovePlan(plan)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" /> Duyệt
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleRejectPlan(plan)}
                          >
                            <XCircle className="h-4 w-4 mr-2" /> Từ chối
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleEditPurchasePlan(plan)}
                        >
                          <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleDeletePurchasePlan(plan.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Xóa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-10 text-lg">
                  Không có kế hoạch mua hàng nào.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Tab: Lịch sử Xuất Nhập */}
        <TabsContent value="history" className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold">Lịch sử Xuất Nhập Kho</h2>
          <p className="text-muted-foreground mb-4">
            Theo dõi chi tiết các giao dịch nhập và xuất hàng hóa.
          </p>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên mặt hàng, lý do, người phụ trách..."
              value={historySearchTerm}
              onChange={(e) => setHistorySearchTerm(e.target.value)}
              className="max-w-sm focus:ring-primary focus:border-primary"
            />
            <Select
              value={historyTypeFilter}
              onValueChange={setHistoryTypeFilter}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Loại giao dịch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="import">Nhập kho</SelectItem>
                <SelectItem value="export">Xuất kho</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4 shadow-lg bg-card/50">
            <div className="space-y-4">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((entry) => (
                  <Card
                    key={entry.id}
                    className="p-5 bg-card transition-colors hover:bg-muted/50 border border-transparent hover:border-primary/20 duration-200"
                  >
                    <CardHeader className="p-0 pb-3 flex flex-row justify-between items-center border-b border-dashed mb-3">
                      <div>
                        <CardTitle className="text-lg font-semibold text-primary mb-1">
                          {entry.itemName}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Số lượng:{" "}
                          <span className="font-medium">
                            {entry.quantity} {entry.unit}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          entry.type === "import" ? "default" : "secondary"
                        }
                        className="flex items-center gap-1"
                      >
                        {entry.type === "import" ? (
                          <Plus className="h-3 w-3" />
                        ) : (
                          <Minus className="h-3 w-3" />
                        )}
                        {entry.type === "import" ? "Nhập kho" : "Xuất kho"}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-0 pt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" /> Ngày:{" "}
                          <span className="font-medium">
                            {format(
                              parseISO(entry.date),
                              "dd MMMM yyyy HH:mm",
                              { locale: vi }
                            )}
                          </span>
                        </div>
                        {entry.personInCharge && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" /> Người phụ trách:{" "}
                            <span className="font-medium">
                              {entry.personInCharge}
                            </span>
                          </div>
                        )}
                      </div>
                      {entry.reason && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Lý do:{" "}
                          <span className="font-medium text-foreground">
                            {entry.reason}
                          </span>
                        </p>
                      )}
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Xóa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-10 text-lg">
                  Không có lịch sử xuất nhập nào.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Tab: Báo cáo Tồn kho */}
        <TabsContent value="reports" className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold">Báo cáo Tồn kho</h2>
          <p className="text-muted-foreground mb-4">
            Tổng hợp các báo cáo về tình trạng tồn kho, bao gồm tồn kho thấp và
            tồn kho dư thừa.
          </p>

          {/* Báo cáo Tồn kho thấp */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Mặt hàng Tồn kho thấp
              </CardTitle>
              <CardDescription>
                Các mặt hàng cần được bổ sung sớm.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {lowStockItems.length > 0 ? (
                    lowStockItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg"
                      >
                        <span className="font-medium text-red-800">
                          {item.name}
                        </span>
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <AlertTriangle className="h-4 w-4" /> Còn:{" "}
                          {item.currentStock} {item.unit}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      Không có mặt hàng nào tồn kho thấp.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Báo cáo Tồn kho dư thừa */}
          <Card className="shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Mặt hàng Tồn kho dư thừa
              </CardTitle>
              <CardDescription>
                Các mặt hàng có thể xem xét tối ưu hóa không gian lưu trữ.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {overstockItems.length > 0 ? (
                    overstockItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <span className="font-medium text-green-800">
                          {item.name}
                        </span>
                        <Badge
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          <Warehouse className="h-4 w-4" /> Còn:{" "}
                          {item.currentStock} {item.unit}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      Không có mặt hàng nào tồn kho dư thừa.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddInventoryItemDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddItem}
      />
      <EditInventoryItemDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onEdit={handleSaveEdit}
        item={selectedItem}
      />

      <ThresholdForm
        isOpen={isThresholdFormOpen}
        onClose={() => setIsThresholdFormOpen(false)}
        onSubmit={handleThresholdSubmit}
        initialData={editingThreshold}
      />

      <PurchasePlanForm
        isOpen={isPurchasePlanFormOpen}
        onClose={() => setIsPurchasePlanFormOpen(false)}
        onSubmit={handlePurchasePlanSubmit}
        initialData={editingPlan}
      />
    </div>
  );
}
