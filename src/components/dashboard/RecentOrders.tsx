
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Order } from '@/types/dashboard';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ExternalLink } from 'lucide-react';

interface RecentOrdersProps {
  orders: Order[];
}

const statusLabels = {
  pending: 'Chờ xử lý',
  confirmed: 'Đã xác nhận',
  'in-progress': 'Đang thực hiện',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy'
};

const statusColors = {
  pending: 'bg-warning text-warning-foreground',
  confirmed: 'bg-info text-info-foreground',
  'in-progress': 'bg-primary text-primary-foreground',
  completed: 'bg-success text-success-foreground',
  cancelled: 'bg-destructive text-destructive-foreground'
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Đơn hàng gần đây</CardTitle>
          <CardDescription>
            {orders.length} đơn hàng mới nhất
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          Xem tất cả
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors animate-slide-in"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://avatar.vercel.sh/${order.customerName}`} />
                  <AvatarFallback>
                    {order.customerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{order.customerName}</h4>
                    <Badge className={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {order.eventType} • {formatCurrency(order.totalAmount)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(order.createdAt, { 
                      addSuffix: true, 
                      locale: vi 
                    })}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium">
                  {new Date(order.eventDate).toLocaleDateString('vi-VN')}
                </div>
                <div className="text-xs text-muted-foreground">
                  Sự kiện
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
