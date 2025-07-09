
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, AlertCircle, Calendar, User, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockTasks = [
  {
    id: 1,
    orderId: 'ORD001',
    title: 'Chuẩn bị menu cho tiệc cưới',
    description: 'Chuẩn bị 150 suất ăn cho tiệc cưới tại khách sạn ABC',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-01-20',
    estimatedHours: 8,
    completedHours: 3,
    customerName: 'Cô dâu Lan & Chú rể Nam',
    location: 'Khách sạn ABC, Q1'
  },
  {
    id: 2,
    orderId: 'ORD002',
    title: 'Trang trí sinh nhật trẻ em',
    description: 'Trang trí chủ đề công chúa cho bé 5 tuổi',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-01-22',
    estimatedHours: 4,
    completedHours: 0,
    customerName: 'Gia đình chị Hoa',
    location: 'Nhà riêng, Q7'
  },
  {
    id: 3,
    orderId: 'ORD003',
    title: 'Phục vụ hội nghị công ty',
    description: 'Phục vụ coffee break và buffet trưa',
    priority: 'medium',
    status: 'completed',
    dueDate: '2024-01-18',
    estimatedHours: 6,
    completedHours: 6,
    customerName: 'Công ty XYZ',
    location: 'Tòa nhà DEF, Q3'
  },
];

export function TaskList() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const { toast } = useToast();

  const filteredTasks = mockTasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const handleUpdateStatus = (taskId: number, newStatus: string) => {
    toast({
      title: 'Cập nhật thành công',
      description: 'Trạng thái công việc đã được cập nhật',
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Cao</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Trung bình</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Thấp</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Chờ thực hiện</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">Đang thực hiện</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Quá hạn</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = mockTasks.filter(t => t.status === 'in-progress').length;
  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Danh sách công việc</h1>
          <p className="text-muted-foreground">Quản lý và theo dõi các công việc được phân công</p>
        </div>
        <div className="flex space-x-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ thực hiện</SelectItem>
              <SelectItem value="in-progress">Đang thực hiện</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Ưu tiên" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="high">Cao</SelectItem>
              <SelectItem value="medium">Trung bình</SelectItem>
              <SelectItem value="low">Thấp</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng công việc</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTasks.length}</div>
            <p className="text-xs text-muted-foreground">Công việc được giao</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">Công việc đã xong</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang thực hiện</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">Đang xử lý</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ thực hiện</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-muted-foreground">Cần bắt đầu</p>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(task.status)}
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <Badge variant="outline">{task.orderId}</Badge>
                    {getPriorityBadge(task.priority)}
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{task.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{task.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{task.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Hạn: {task.dueDate}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tiến độ: {task.completedHours}/{task.estimatedHours} giờ</span>
                      <span>{Math.round((task.completedHours / task.estimatedHours) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(task.completedHours / task.estimatedHours) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>

                <div className="ml-4 flex flex-col space-y-2">
                  {getStatusBadge(task.status)}
                  
                  {task.status !== 'completed' && (
                    <div className="space-y-2">
                      {task.status === 'pending' && (
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus(task.id, 'in-progress')}
                        >
                          Bắt đầu
                        </Button>
                      )}
                      {task.status === 'in-progress' && (
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus(task.id, 'completed')}
                        >
                          Hoàn thành
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-40">
            <Clock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Không có công việc nào</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
