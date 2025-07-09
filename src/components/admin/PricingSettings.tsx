
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash, Percent, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockPricingRules = [
  {
    id: 1,
    name: 'Giảm giá nhóm',
    description: 'Giảm 10% cho đơn hàng trên 50 khách',
    type: 'percentage',
    value: 10,
    condition: 'guests >= 50',
    isActive: true
  },
  {
    id: 2,
    name: 'Khuyến mãi cuối tuần',
    description: 'Giảm 500.000đ cho đơn hàng cuối tuần',
    type: 'fixed',
    value: 500000,
    condition: 'weekend',
    isActive: true
  },
  {
    id: 3,
    name: 'Combo tiết kiệm',
    description: 'Giảm 15% khi đặt combo từ 3 món trở lên',
    type: 'percentage',
    value: 15,
    condition: 'combo_items >= 3',
    isActive: false
  },
];

export function PricingSettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<any>(null);
  const { toast } = useToast();

  const handleSaveRule = () => {
    toast({
      title: editingRule ? 'Cập nhật quy tắc giá thành công' : 'Tạo quy tắc giá thành công',
      description: 'Quy tắc giá đã được lưu và áp dụng',
    });
    setIsDialogOpen(false);
    setEditingRule(null);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cài đặt giá</h1>
          <p className="text-muted-foreground">Quản lý quy tắc giá và khuyến mãi</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRule(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm quy tắc
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRule ? 'Chỉnh sửa quy tắc' : 'Thêm quy tắc giá'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên quy tắc</label>
                <Input placeholder="Nhập tên quy tắc" />
              </div>
              <div>
                <label className="text-sm font-medium">Mô tả</label>
                <Input placeholder="Nhập mô tả" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Loại giảm giá</label>
                  <select className="w-full p-2 border rounded">
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed">Cố định (VNĐ)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Giá trị</label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Điều kiện áp dụng</label>
                <Input placeholder="VD: guests >= 50" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch />
                <label className="text-sm">Kích hoạt quy tắc</label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                <Button onClick={handleSaveRule}>Lưu</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Tổng giảm giá
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(2500000)}</div>
            <p className="text-sm text-muted-foreground">Trong tháng này</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Tỷ lệ áp dụng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-sm text-muted-foreground">Đơn hàng có khuyến mãi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quy tắc hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPricingRules.filter(rule => rule.isActive).length}
            </div>
            <p className="text-sm text-muted-foreground">Trên tổng {mockPricingRules.length} quy tắc</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách quy tắc giá</CardTitle>
          <CardDescription>Quản lý các quy tắc giá và khuyến mãi</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên quy tắc</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Điều kiện</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPricingRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>{rule.description}</TableCell>
                  <TableCell>
                    <Badge variant={rule.type === 'percentage' ? 'default' : 'secondary'}>
                      {rule.type === 'percentage' ? 'Phần trăm' : 'Cố định'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {rule.type === 'percentage' ? `${rule.value}%` : formatPrice(rule.value)}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{rule.condition}</TableCell>
                  <TableCell>
                    <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                      {rule.isActive ? 'Hoạt động' : 'Tạm dừng'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRule(rule);
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
