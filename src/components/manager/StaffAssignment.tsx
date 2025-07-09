
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Users, Calendar, Clock, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockStaff = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    role: 'Bếp trưởng',
    avatar: '/avatars/01.png',
    skills: ['Nấu ăn', 'Quản lý bếp'],
    availability: 'Có thể',
    currentTasks: 2,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Trần Thị B',
    role: 'Phục vụ',
    avatar: '/avatars/02.png',
    skills: ['Phục vụ bàn', 'Giao tiếp'],
    availability: 'Bận',
    currentTasks: 4,
    rating: 4.6
  },
  {
    id: 3,
    name: 'Lê Văn C',
    role: 'Trang trí',
    avatar: '/avatars/03.png',
    skills: ['Thiết kế', 'Trang trí'],
    availability: 'Có thể',
    currentTasks: 1,
    rating: 4.9
  },
];

const mockOrders = [
  {
    id: 'ORD001',
    customerName: 'Công ty ABC',
    eventType: 'Hội nghị',
    date: '2024-01-20',
    guestCount: 50,
    status: 'Chờ phân công',
    requiredSkills: ['Nấu ăn', 'Phục vụ bàn']
  },
  {
    id: 'ORD002',
    customerName: 'Gia đình Nguyễn',
    eventType: 'Sinh nhật',
    date: '2024-01-22',
    guestCount: 25,
    status: 'Chờ phân công',
    requiredSkills: ['Trang trí', 'Phục vụ bàn']
  },
];

export function StaffAssignment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredStaff = mockStaff.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignStaff = (orderId: string, staffIds: number[]) => {
    toast({
      title: 'Phân công thành công',
      description: `Đã phân công ${staffIds.length} nhân viên cho đơn hàng ${orderId}`,
    });
    setIsAssignDialogOpen(false);
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'Có thể':
        return <Badge className="bg-green-100 text-green-800">Có thể</Badge>;
      case 'Bận':
        return <Badge className="bg-red-100 text-red-800">Bận</Badge>;
      case 'Nghỉ phép':
        return <Badge className="bg-yellow-100 text-yellow-800">Nghỉ phép</Badge>;
      default:
        return <Badge variant="secondary">{availability}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Phân công nhân viên</h1>
          <p className="text-muted-foreground">Quản lý và phân công nhân viên cho các đơn hàng</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Phân công tự động
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Waiting Assignment */}
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng chờ phân công</CardTitle>
            <CardDescription>Danh sách đơn hàng cần phân công nhân viên</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{order.id}</h4>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.customerName}</p>
                  <div className="flex justify-between text-sm">
                    <span>{order.eventType}</span>
                    <span>{order.guestCount} khách</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{order.date}</span>
                    <span>Kỹ năng: {order.requiredSkills.join(', ')}</span>
                  </div>
                  <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedOrder(order)}
                      >
                        Phân công nhân viên
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Phân công nhân viên cho {selectedOrder?.id}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Khách hàng</p>
                            <p className="text-sm">{selectedOrder?.customerName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Loại sự kiện</p>
                            <p className="text-sm">{selectedOrder?.eventType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Ngày tổ chức</p>
                            <p className="text-sm">{selectedOrder?.date}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Số khách</p>
                            <p className="text-sm">{selectedOrder?.guestCount} người</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Chọn nhân viên</h4>
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {mockStaff.map((staff) => (
                              <div key={staff.id} className="flex items-center space-x-3 p-2 border rounded">
                                <input type="checkbox" />
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={staff.avatar} />
                                  <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{staff.name}</p>
                                  <p className="text-xs text-muted-foreground">{staff.role}</p>
                                </div>
                                <div className="text-right">
                                  {getAvailabilityBadge(staff.availability)}
                                  <p className="text-xs text-muted-foreground">
                                    {staff.currentTasks} công việc
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                            Hủy
                          </Button>
                          <Button onClick={() => handleAssignStaff(selectedOrder?.id, [1, 2])}>
                            Phân công
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Danh sách nhân viên</CardTitle>
                <CardDescription>Trạng thái và khả năng của nhân viên</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm nhân viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStaff.map((staff) => (
                <div key={staff.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar>
                    <AvatarImage src={staff.avatar} />
                    <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{staff.name}</h4>
                      {getAvailabilityBadge(staff.availability)}
                    </div>
                    <p className="text-sm text-muted-foreground">{staff.role}</p>
                    <div className="flex space-x-1 mt-1">
                      {staff.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{staff.currentTasks} công việc</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ⭐ {staff.rating}/5
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nhân viên có sẵn</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStaff.filter(s => s.availability === 'Có thể').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Trên tổng {mockStaff.length} nhân viên
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn chờ phân công</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrders.length}</div>
            <p className="text-xs text-muted-foreground">Cần xử lý ngay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Công việc đang thực hiện</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStaff.reduce((sum, staff) => sum + staff.currentTasks, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Tổng công việc</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiệu suất TB</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockStaff.reduce((sum, staff) => sum + staff.rating, 0) / mockStaff.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Đánh giá trung bình</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
