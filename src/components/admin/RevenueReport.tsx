
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Calendar, Download } from 'lucide-react';

const revenueData = [
  { month: 'T1', revenue: 120000000, orders: 156, customers: 89 },
  { month: 'T2', revenue: 135000000, orders: 178, customers: 102 },
  { month: 'T3', revenue: 142000000, orders: 189, customers: 115 },
  { month: 'T4', revenue: 128000000, orders: 165, customers: 95 },
  { month: 'T5', revenue: 156000000, orders: 201, customers: 128 },
  { month: 'T6', revenue: 168000000, orders: 215, customers: 142 },
];

const categoryData = [
  { name: 'Tiệc cưới', value: 45, color: '#8884d8' },
  { name: 'Sinh nhật', value: 25, color: '#82ca9d' },
  { name: 'Hội nghị', value: 20, color: '#ffc658' },
  { name: 'Khác', value: 10, color: '#ff7300' },
];

export function RevenueReport() {
  const [timeRange, setTimeRange] = useState('6months');
  const [reportType, setReportType] = useState('overview');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0);
  const totalCustomers = revenueData.reduce((sum, item) => sum + item.customers, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  const currentMonth = revenueData[revenueData.length - 1];
  const previousMonth = revenueData[revenueData.length - 2];
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Báo cáo doanh thu</h1>
          <p className="text-muted-foreground">Phân tích doanh thu và hiệu suất kinh doanh</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 tháng</SelectItem>
              <SelectItem value="3months">3 tháng</SelectItem>
              <SelectItem value="6months">6 tháng</SelectItem>
              <SelectItem value="1year">1 năm</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {revenueGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={revenueGrowth > 0 ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(revenueGrowth).toFixed(1)}%
              </span>
              <span className="ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Đơn hàng hoàn thành</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Khách hàng đầu tiên</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giá trị TB/đơn</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(avgOrderValue)}</div>
            <p className="text-xs text-muted-foreground">Trung bình mỗi đơn</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng doanh thu</CardTitle>
            <CardDescription>Doanh thu theo tháng trong 6 tháng gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  name="Doanh thu"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders vs Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng & Khách hàng</CardTitle>
            <CardDescription>So sánh số đơn hàng và khách hàng mới</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" name="Đơn hàng" />
                <Bar dataKey="customers" fill="#82ca9d" name="Khách hàng mới" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Phân bố theo loại tiệc</CardTitle>
            <CardDescription>Tỷ lệ doanh thu theo loại sự kiện</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performing Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Thống kê chi tiết</CardTitle>
            <CardDescription>Các chỉ số hiệu suất quan trọng</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tỷ lệ chuyển đổi</span>
              <Badge className="bg-green-100 text-green-800">78.5%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Khách hàng quay lại</span>
              <Badge className="bg-blue-100 text-blue-800">62.3%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Thời gian xử lý TB</span>
              <Badge className="bg-yellow-100 text-yellow-800">2.5 ngày</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Đánh giá TB</span>
              <Badge className="bg-purple-100 text-purple-800">4.6/5</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
