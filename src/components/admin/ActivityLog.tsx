
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';

const mockActivities = [
  {
    id: 1,
    user: 'Nguyễn Văn A',
    action: 'Đăng nhập',
    target: 'Hệ thống',
    timestamp: new Date('2024-01-15 09:30:00'),
    ip: '192.168.1.100',
    userAgent: 'Chrome 120.0.0.0',
    status: 'success'
  },
  {
    id: 2,
    user: 'Trần Thị B',
    action: 'Tạo đơn hàng',
    target: 'Đơn hàng #12345',
    timestamp: new Date('2024-01-15 10:15:00'),
    ip: '192.168.1.101',
    userAgent: 'Firefox 121.0.0.0',
    status: 'success'
  },
  {
    id: 3,
    user: 'Lê Văn C',
    action: 'Xóa người dùng',
    target: 'User ID: 456',
    timestamp: new Date('2024-01-15 11:00:00'),
    ip: '192.168.1.102',
    userAgent: 'Safari 17.0.0.0',
    status: 'failed'
  },
];

export function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || activity.action.includes(filterAction);
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Thành công</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Thất bại</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Cảnh báo</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Lịch sử hoạt động</h1>
          <p className="text-muted-foreground">Theo dõi tất cả hoạt động trong hệ thống</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Xuất báo cáo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Nhật ký hoạt động</CardTitle>
              <CardDescription>Danh sách các hoạt động gần đây</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm hoạt động..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Loại hoạt động" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Đăng nhập">Đăng nhập</SelectItem>
                  <SelectItem value="Tạo">Tạo</SelectItem>
                  <SelectItem value="Cập nhật">Cập nhật</SelectItem>
                  <SelectItem value="Xóa">Xóa</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="success">Thành công</SelectItem>
                  <SelectItem value="failed">Thất bại</SelectItem>
                  <SelectItem value="warning">Cảnh báo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Hoạt động</TableHead>
                <TableHead>Đối tượng</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.target}</TableCell>
                  <TableCell>{format(activity.timestamp, 'dd/MM/yyyy HH:mm')}</TableCell>
                  <TableCell className="font-mono text-sm">{activity.ip}</TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
