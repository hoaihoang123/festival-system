import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
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
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus, Search, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface InventoryThreshold {
  id: number;
  itemName: string;
  currentQuantity: number;
  minimumThreshold: number;
  maximumThreshold: number;
  unit: string;
}

interface PurchasePlan {
  id: number;
  itemName: string;
  quantity: number;
  unit: string;
  estimatedCost: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestDate: string;
  approvalDate?: string;
  approverId?: number;
  rejectionReason?: string;
}

export default function InventoryManagement() {
  const [thresholds, setThresholds] = useState<InventoryThreshold[]>([]);
  const [purchasePlans, setPurchasePlans] = useState<PurchasePlan[]>([]);
  const [lowStockItems, setLowStockItems] = useState<InventoryThreshold[]>([]);
  const [overstockItems, setOverstockItems] = useState<InventoryThreshold[]>(
    []
  );
  const [selectedTab, setSelectedTab] = useState("thresholds");
  const [isAddThresholdOpen, setIsAddThresholdOpen] = useState(false);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  // Mock data - sẽ thay thế bằng API calls
  useEffect(() => {
    // Mock data cho ngưỡng tồn kho
    setThresholds([
      {
        id: 1,
        itemName: "Bàn tiệc",
        currentQuantity: 50,
        minimumThreshold: 20,
        maximumThreshold: 100,
        unit: "cái",
      },
      // Thêm dữ liệu mẫu khác...
    ]);

    // Mock data cho kế hoạch mua hàng
    setPurchasePlans([
      {
        id: 1,
        itemName: "Ghế tiệc",
        quantity: 30,
        unit: "cái",
        estimatedCost: 1500000,
        status: "PENDING",
        requestDate: "2024-03-20",
      },
      // Thêm dữ liệu mẫu khác...
    ]);
  }, []);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý kho</h1>

      <Tabs defaultValue="thresholds" className="space-y-4">
        <TabsList>
          <TabsTrigger value="thresholds">Ngưỡng tồn kho</TabsTrigger>
          <TabsTrigger value="purchase-plans">Kế hoạch mua hàng</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo tồn kho</TabsTrigger>
        </TabsList>

        {/* Tab Ngưỡng tồn kho */}
        <TabsContent value="thresholds">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ngưỡng tồn kho</CardTitle>
              <Dialog
                open={isAddThresholdOpen}
                onOpenChange={setIsAddThresholdOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Thêm ngưỡng mới
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm ngưỡng tồn kho mới</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="itemName" className="text-right">
                        Tên vật phẩm
                      </Label>
                      <Input id="itemName" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="minThreshold" className="text-right">
                        Ngưỡng tối thiểu
                      </Label>
                      <Input
                        id="minThreshold"
                        type="number"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="maxThreshold" className="text-right">
                        Ngưỡng tối đa
                      </Label>
                      <Input
                        id="maxThreshold"
                        type="number"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="unit" className="text-right">
                        Đơn vị
                      </Label>
                      <Input id="unit" className="col-span-3" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => setIsAddThresholdOpen(false)}>
                      Lưu
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên vật phẩm</TableHead>
                    <TableHead>Số lượng hiện tại</TableHead>
                    <TableHead>Ngưỡng tối thiểu</TableHead>
                    <TableHead>Ngưỡng tối đa</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {thresholds.map((threshold) => (
                    <TableRow key={threshold.id}>
                      <TableCell>{threshold.itemName}</TableCell>
                      <TableCell>{threshold.currentQuantity}</TableCell>
                      <TableCell>{threshold.minimumThreshold}</TableCell>
                      <TableCell>{threshold.maximumThreshold}</TableCell>
                      <TableCell>{threshold.unit}</TableCell>
                      <TableCell>
                        {threshold.currentQuantity <
                        threshold.minimumThreshold ? (
                          <Badge variant="destructive">Thiếu hàng</Badge>
                        ) : threshold.currentQuantity >
                          threshold.maximumThreshold ? (
                          <Badge variant="secondary">Dư hàng</Badge>
                        ) : (
                          <Badge variant="success">Bình thường</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Sửa
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Kế hoạch mua hàng */}
        <TabsContent value="purchase-plans">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Kế hoạch mua hàng</CardTitle>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: vi }) : "Chọn ngày"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Chờ duyệt</SelectItem>
                    <SelectItem value="APPROVED">Đã duyệt</SelectItem>
                    <SelectItem value="REJECTED">Đã từ chối</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Tạo kế hoạch mới
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tạo kế hoạch mua hàng mới</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="planItemName" className="text-right">
                          Tên vật phẩm
                        </Label>
                        <Input id="planItemName" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                          Số lượng
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="unit" className="text-right">
                          Đơn vị
                        </Label>
                        <Input id="unit" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="estimatedCost" className="text-right">
                          Chi phí dự kiến
                        </Label>
                        <Input
                          id="estimatedCost"
                          type="number"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button onClick={() => setIsAddPlanOpen(false)}>
                        Lưu
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên vật phẩm</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Đơn vị</TableHead>
                    <TableHead>Chi phí dự kiến</TableHead>
                    <TableHead>Ngày yêu cầu</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchasePlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>{plan.itemName}</TableCell>
                      <TableCell>{plan.quantity}</TableCell>
                      <TableCell>{plan.unit}</TableCell>
                      <TableCell>
                        {plan.estimatedCost.toLocaleString("vi-VN")} VNĐ
                      </TableCell>
                      <TableCell>{plan.requestDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            plan.status === "APPROVED"
                              ? "success"
                              : plan.status === "REJECTED"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {plan.status === "PENDING"
                            ? "Chờ duyệt"
                            : plan.status === "APPROVED"
                            ? "Đã duyệt"
                            : "Đã từ chối"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {plan.status === "PENDING" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-500"
                            >
                              Duyệt
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                            >
                              Từ chối
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Báo cáo tồn kho */}
        <TabsContent value="reports">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vật phẩm sắp hết hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên vật phẩm</TableHead>
                      <TableHead>Số lượng hiện tại</TableHead>
                      <TableHead>Ngưỡng tối thiểu</TableHead>
                      <TableHead>Đơn vị</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.currentQuantity}</TableCell>
                        <TableCell>{item.minimumThreshold}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vật phẩm dư hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên vật phẩm</TableHead>
                      <TableHead>Số lượng hiện tại</TableHead>
                      <TableHead>Ngưỡng tối đa</TableHead>
                      <TableHead>Đơn vị</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {overstockItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.currentQuantity}</TableCell>
                        <TableCell>{item.maximumThreshold}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
