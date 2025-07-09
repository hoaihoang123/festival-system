
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Edit, Trash, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockRoles = [
  { id: 1, name: 'Admin', description: 'Toàn quyền hệ thống', userCount: 3, permissions: ['all'] },
  { id: 2, name: 'Manager', description: 'Quản lý chi nhánh', userCount: 8, permissions: ['orders', 'staff', 'inventory'] },
  { id: 3, name: 'Staff', description: 'Nhân viên thực hiện', userCount: 25, permissions: ['orders:read', 'customers:read'] },
];

const allPermissions = [
  { id: 'users', name: 'Quản lý người dùng', category: 'Admin' },
  { id: 'roles', name: 'Quản lý phân quyền', category: 'Admin' },
  { id: 'orders', name: 'Quản lý đơn hàng', category: 'Business' },
  { id: 'menu', name: 'Quản lý menu', category: 'Business' },
  { id: 'inventory', name: 'Quản lý kho', category: 'Business' },
  { id: 'staff', name: 'Quản lý nhân viên', category: 'Business' },
  { id: 'reports', name: 'Báo cáo', category: 'Analytics' },
  { id: 'settings', name: 'Cài đặt hệ thống', category: 'System' },
];

export function RoleManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);
  const { toast } = useToast();

  const filteredRoles = mockRoles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveRole = () => {
    toast({
      title: editingRole ? 'Cập nhật vai trò thành công' : 'Tạo vai trò thành công',
      description: 'Thông tin vai trò đã được lưu',
    });
    setIsDialogOpen(false);
    setEditingRole(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý phân quyền</h1>
          <p className="text-muted-foreground">Quản lý vai trò và quyền hạn trong hệ thống</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRole(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm vai trò
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRole ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tên vai trò</label>
                  <Input placeholder="Nhập tên vai trò" />
                </div>
                <div>
                  <label className="text-sm font-medium">Mô tả</label>
                  <Input placeholder="Nhập mô tả" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-4 block">Quyền hạn</label>
                <div className="space-y-4">
                  {['Admin', 'Business', 'Analytics', 'System'].map(category => (
                    <div key={category}>
                      <h4 className="font-medium mb-2">{category}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {allPermissions.filter(p => p.category === category).map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Switch id={permission.id} />
                            <label htmlFor={permission.id} className="text-sm">{permission.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                <Button onClick={handleSaveRole}>Lưu</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Danh sách vai trò</CardTitle>
              <CardDescription>Quản lý các vai trò và quyền hạn</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm vai trò..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vai trò</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Số người dùng</TableHead>
                <TableHead>Quyền hạn</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">{role.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{role.userCount} người</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {role.permissions.slice(0, 2).map((perm, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {perm}
                        </Badge>
                      ))}
                      {role.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRole(role);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
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
