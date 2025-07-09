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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  LineChart,
  PieChart,
  Users,
  Star,
  TrendingUp,
  Award,
  Calendar,
  Search,
  Filter,
  Package,
  Clock,
  AlertCircle,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EvaluationForm } from "@/components/forms/EvaluationForm";

// Mock Data Interfaces
interface EmployeePerformance {
  id: string;
  name: string;
  totalOrders: number;
  averageRating: number;
  totalWorkingHours: number;
  onTimeDeliveryRate: number; // % of orders delivered on time
  feedbackScore: number; // e.g., 1-5 from customer feedback
}

interface Evaluation {
  id: string;
  employeeName: string;
  evaluator: string;
  date: string; // ISO string
  score: number; // e.g., 1-100
  comments: string;
  kpisAchieved: string[];
}

interface KPI {
  id: string;
  name: string;
  target: number;
  actual: number;
  unit: string;
  description: string;
}

// Mock Data
const mockPerformanceData: EmployeePerformance[] = [
  {
    id: "emp1",
    name: "Trần Văn A",
    totalOrders: 150,
    averageRating: 4.8,
    totalWorkingHours: 640,
    onTimeDeliveryRate: 98,
    feedbackScore: 4.5,
  },
  {
    id: "emp2",
    name: "Nguyễn Thị B",
    totalOrders: 120,
    averageRating: 4.5,
    totalWorkingHours: 580,
    onTimeDeliveryRate: 95,
    feedbackScore: 4.2,
  },
  {
    id: "emp3",
    name: "Lê Văn C",
    totalOrders: 180,
    averageRating: 4.9,
    totalWorkingHours: 700,
    onTimeDeliveryRate: 99,
    feedbackScore: 4.7,
  },
];

const mockEvaluations: Evaluation[] = [
  {
    id: "eval1",
    employeeName: "Trần Văn A",
    evaluator: "Quản lý X",
    date: "2024-01-15T10:00:00Z",
    score: 92,
    comments: "Hiệu suất vượt trội, luôn hoàn thành công việc đúng hạn.",
    kpisAchieved: ["Tổng số đơn hàng", "Tỷ lệ giao hàng đúng hạn"],
  },
  {
    id: "eval2",
    employeeName: "Nguyễn Thị B",
    evaluator: "Quản lý Y",
    date: "2024-02-20T14:30:00Z",
    score: 88,
    comments:
      "Hoàn thành tốt nhiệm vụ, cần cải thiện khả năng giao tiếp khách hàng.",
    kpisAchieved: ["Điểm đánh giá trung bình", "Thời gian làm việc"],
  },
  {
    id: "eval3",
    employeeName: "Lê Văn C",
    evaluator: "Quản lý X",
    date: "2024-03-05T09:00:00Z",
    score: 95,
    comments: "Xuất sắc trong mọi khía cạnh, là một tài sản quý giá của đội.",
    kpisAchieved: [
      "Tổng số đơn hàng",
      "Điểm đánh giá trung bình",
      "Tỷ lệ giao hàng đúng hạn",
    ],
  },
];

const mockKPIs: KPI[] = [
  {
    id: "kpi1",
    name: "Tổng số đơn hàng",
    target: 5000,
    actual: 4850,
    unit: "đơn",
    description: "Tổng số đơn hàng được xử lý trong tháng.",
  },
  {
    id: "kpi2",
    name: "Điểm đánh giá trung bình",
    target: 4.7,
    actual: 4.6,
    unit: "/5",
    description: "Điểm đánh giá trung bình từ khách hàng.",
  },
  {
    id: "kpi3",
    name: "Tỷ lệ hoàn thành đúng hạn",
    target: 95,
    actual: 93,
    unit: "%",
    description: "Tỷ lệ các tác vụ được hoàn thành đúng thời hạn.",
  },
];

export default function StaffEvaluationAndReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const filteredEvaluations = mockEvaluations.filter(
    (evalItem) =>
      evalItem.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evalItem.evaluator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evalItem.comments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Đánh giá & Báo cáo Nhân viên
          </h1>
          <p className="text-muted-foreground mt-2">
            Theo dõi hiệu suất, xem xét đánh giá và phân tích KPI của nhân viên.
          </p>
        </div>
        <Button
          onClick={() => setIsFormDialogOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Tạo đánh giá mới
        </Button>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-fit p-1 h-auto bg-muted/40 rounded-lg shadow-inner">
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            Báo cáo Hiệu suất
          </TabsTrigger>
          <TabsTrigger
            value="evaluations"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            Đánh giá Định kỳ
          </TabsTrigger>
          <TabsTrigger
            value="kpis"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary font-semibold py-2 transition-colors"
          >
            Thống kê KPI
          </TabsTrigger>
        </TabsList>

        {/* Performance Reports Tab */}
        <TabsContent value="performance" className="mt-6 space-y-8">
          <h2 className="text-xl font-semibold">
            Tổng quan Hiệu suất Nhân viên
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPerformanceData.map((employee) => (
              <Card
                key={employee.id}
                className="shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {employee.name}
                  </CardTitle>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-end mb-2">
                    <div className="text-4xl font-extrabold text-primary">
                      {employee.averageRating.toFixed(1)}
                    </div>
                    <span className="text-lg font-normal text-muted-foreground ml-1">
                      / 5.0
                    </span>
                    <Star className="h-5 w-5 text-yellow-500 ml-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Điểm đánh giá trung bình
                  </p>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Package className="h-4 w-4" /> Tổng đơn hàng:
                      </span>
                      <Badge variant="outline" className="px-3 py-1 text-md">
                        {employee.totalOrders}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" /> Giờ làm việc:
                      </span>
                      <Badge variant="outline" className="px-3 py-1 text-md">
                        {employee.totalWorkingHours} giờ
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Award className="h-4 w-4" /> Tỷ lệ đúng hạn:
                      </span>
                      <Badge variant="outline" className="px-3 py-1 text-md">
                        {employee.onTimeDeliveryRate}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Placeholder for charts/graphs */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Biểu đồ Hiệu suất (Ví dụ)
              </CardTitle>
              <CardDescription>
                Hiệu suất tổng quan theo thời gian (dữ liệu giả định).
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center h-72 bg-muted/40 rounded-lg border border-dashed border-gray-300 text-muted-foreground">
              <BarChart className="h-16 w-16 text-muted-foreground mb-4 opacity-70" />
              <p className="text-lg font-medium">
                Dữ liệu biểu đồ sẽ hiển thị ở đây
              </p>
              <p className="text-sm text-center mt-1">
                Kết nối với API backend để tải dữ liệu thực tế.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evaluations Tab */}
        <TabsContent value="evaluations" className="mt-6 space-y-8">
          <h2 className="text-xl font-semibold">
            Đánh giá Định kỳ của Nhân viên
          </h2>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên nhân viên, người đánh giá, hoặc bình luận..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md focus:ring-primary focus:border-primary"
            />
            <Button variant="outline" className="shrink-0 border-dashed">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4 shadow-lg bg-card/50">
            <div className="space-y-4">
              {filteredEvaluations.length > 0 ? (
                filteredEvaluations.map((evaluation) => (
                  <Card
                    key={evaluation.id}
                    className="p-5 bg-card transition-colors hover:bg-muted/50 border border-transparent hover:border-primary/20 duration-200"
                  >
                    <CardHeader className="p-0 pb-3 flex flex-row justify-between items-center border-b border-dashed mb-3">
                      <div>
                        <CardTitle className="text-xl font-bold text-primary mb-1">
                          Đánh giá: {evaluation.employeeName}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          Người đánh giá:{" "}
                          <span className="font-medium">
                            {evaluation.evaluator}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-lg px-4 py-2 font-bold bg-blue-100 text-blue-700"
                        >
                          {evaluation.score}
                          <span className="text-sm font-normal ml-1">/100</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 pt-3">
                      <p className="text-base text-gray-700 mb-3">
                        "{evaluation.comments}"
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          Ngày đánh giá:{" "}
                          {format(parseISO(evaluation.date), "dd MMMM yyyy", {
                            locale: vi,
                          })}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-dashed flex flex-wrap gap-2">
                        <span className="font-medium text-sm text-muted-foreground mr-1">
                          KPIs đã đạt:
                        </span>
                        {evaluation.kpisAchieved.length > 0 ? (
                          evaluation.kpisAchieved.map((kpi, index) => (
                            <Badge
                              key={index}
                              variant="default"
                              className="bg-green-100 text-green-700 hover:bg-green-200"
                            >
                              {kpi}
                            </Badge>
                          ))
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            Không có KPI được đánh dấu
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-10 text-lg">
                  Không tìm thấy đánh giá nào phù hợp.
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* KPI Statistics Tab */}
        <TabsContent value="kpis" className="mt-6 space-y-8">
          <h2 className="text-xl font-semibold">Thống kê KPI</h2>
          <p className="text-muted-foreground mb-4">
            Xem xét các chỉ số hiệu suất chính (KPIs) của nhà hàng hoặc nhân
            viên.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockKPIs.map((kpi) => (
              <Card key={kpi.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {kpi.name}
                  </CardTitle>
                  <CardDescription>{kpi.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-extrabold text-primary">
                      {kpi.actual}
                      <span className="text-xl font-normal text-muted-foreground ml-1">
                        {kpi.unit}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Mục tiêu: {kpi.target} {kpi.unit}
                    </p>
                  </div>
                  {kpi.actual >= kpi.target ? (
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-700 border-green-200 px-3 py-1 text-md"
                    >
                      <Award className="h-4 w-4 mr-1" /> Đạt
                    </Badge>
                  ) : (
                    <Badge
                      variant="destructive"
                      className="bg-red-100 text-red-700 border-red-200 px-3 py-1 text-md"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" /> Chưa đạt
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-4">
            Biểu đồ KPI sẽ được hiển thị ở đây sau khi có dữ liệu thật.
          </p>
        </TabsContent>
      </Tabs>

      {/* Dialog for New Evaluation Form */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-[800px] p-6">
          <DialogHeader>
            <DialogTitle>Tạo Đánh giá Mới</DialogTitle>
            <DialogDescription>
              Điền thông tin đánh giá hiệu suất nhân viên.
            </DialogDescription>
          </DialogHeader>
          <EvaluationForm
            onSubmit={(data) => {
              console.log("New Evaluation Data:", data);
              // Here you would typically send data to your backend API
              setIsFormDialogOpen(false);
            }}
            onCancel={() => setIsFormDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
