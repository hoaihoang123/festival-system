
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Phone, Mail, MapPin, Calendar, Star, MessageSquare } from 'lucide-react';

const mockCustomers = [
  {
    id: 1,
    name: 'Nguyễn Thị Lan',
    email: 'lan.nguyen@email.com',
    phone: '0901234567',
    address: '123 Đường ABC, Q1, TP.HCM',
    avatar: '/avatars/customer1.jpg',
    totalOrders: 5,
    totalSpent: 15000000,
    rating: 4.8,
    lastOrderDate: '2024-01-15',
    preferredEventTypes: ['Tiệc cưới', 'Sinh nhật'],
    notes: 'Khách hàng VIP, thích màu hồng và phong cách lãng mạn'
  },
  {
    id: 2,
    name: 'Công ty ABC Ltd',
    email: 'contact@abc.com',
    phone: '0287654321',
    address: '456 Đường XYZ, Q3, TP.HCM',
    avatar: '/avatars/company1.jpg',
    totalOrders: 12,
    totalSpent: 45000000,
    rating: 4.6,
    lastOrderDate: '2024-01-10',
    preferredEventTypes: ['Hội nghị', 'Team building'],
    notes: 'Khách hàng doanh nghiệp, đặt định kỳ hàng tháng'
  },
];

const mockOrderHistory = [
  {
    id: 'ORD001',
    date: '2024-01-15',
    eventType: 'Tiệc cưới',
    guests: 150,
    amount: 8500000,
    status: 'Hoàn thành',
    rating: 5
  },
  {
    id: 'ORD002',
    date: '2023-12-20',
    eventType: 'Sinh nhật',
    guests: 25,
    amount: 2500000,
    status: 'Hoàn thành',
    rating: 4
  },
  {
    id: 'ORD003',
    date: '2023-11-10',
    eventType: 'Kỷ niệm',
    guests: 50,
    amount: 4000000,
    status: 'Hoàn thành',
    rating: 5
  },
];

const mockNotes = [
  {
    id: 1,
    date: '2024-01-15',
    author: 'Nguyễn Văn A',
    content: 'Khách hàng rất hài lòng với chất lượng món ăn và dịch vụ',
    type: 'positive'
  },
  {
    id: 2,
    date: '2024-01-10',
    author: 'Trần Thị B',
    content: 'Lưu ý: Khách hàng không ăn hải sản, cần menu thay thế',
    type: 'note'
  },
];

export function CustomerDetails() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(mockCustomers[0]);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Hoàn thành':
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case 'Đang thực hiện':
        return <Badge className="bg-blue-100 text-blue-800">Đang thực hiện</Badge>;
      case 'Đã hủy':
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Thông tin khách hàng</h1>
          <p className="text-muted-foreground">Xem chi tiết và lịch sử khách hàng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách khách hàng</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedCustomer.id === customer.id
                      ? 'bg-primary/10 border-primary border'
                      : 'border hover:bg-muted'
                  }`}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{customer.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs">{customer.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          {customer.totalOrders} đơn
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList>
              <TabsTrigger value="info">Thông tin cơ bản</TabsTrigger>
              <TabsTrigger value="orders">Lịch sử đơn hàng</TabsTrigger>
              <TabsTrigger value="notes">Ghi chú</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedCustomer.avatar} />
                      <AvatarFallback className="text-xl">
                        {selectedCustomer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{selectedCustomer.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{selectedCustomer.rating}/5</span>
                        <Badge variant="outline">
                          {selectedCustomer.totalOrders} đơn hàng
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Số điện thoại</p>
                          <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Địa chỉ</p>
                          <p className="text-sm text-muted-foreground">{selectedCustomer.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-2">Tổng chi tiêu</p>
                        <p className="text-2xl font-bold">{formatCurrency(selectedCustomer.totalSpent)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Đơn hàng cuối</p>
                          <p className="text-sm text-muted-foreground">{selectedCustomer.lastOrderDate}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Loại sự kiện ưa thích</p>
                        <div className="flex space-x-2">
                          {selectedCustomer.preferredEventTypes.map((type, index) => (
                            <Badge key={index} variant="outline">{type}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Ghi chú đặc biệt</p>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      {selectedCustomer.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử đơn hàng</CardTitle>
                  <CardDescription>Danh sách các đơn hàng đã thực hiện</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã đơn</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Loại sự kiện</TableHead>
                        <TableHead>Số khách</TableHead>
                        <TableHead>Giá trị</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Đánh giá</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrderHistory.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.eventType}</TableCell>
                          <TableCell>{order.guests} người</TableCell>
                          <TableCell>{formatCurrency(order.amount)}</TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>{order.rating}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Ghi chú khách hàng</CardTitle>
                  <CardDescription>Lịch sử ghi chú và tương tác</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNotes.map((note) => (
                      <div key={note.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{note.author}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{note.date}</span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                        <Badge 
                          variant={note.type === 'positive' ? 'default' : 'outline'}
                          className="mt-2"
                        >
                          {note.type === 'positive' ? 'Tích cực' : 'Ghi chú'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
