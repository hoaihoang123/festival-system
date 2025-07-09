
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeLabels: Record<string, string> = {
  dashboard: 'Tổng quan',
  admin: 'Quản trị',
  manager: 'Quản lý',
  staff: 'Nhân viên',
  users: 'Người dùng',
  roles: 'Phân quyền',
  activity: 'Hoạt động',
  combos: 'Combo',
  menu: 'Menu',
  pricing: 'Giá cả',
  reports: 'Báo cáo',
  revenue: 'Doanh thu',
  branch: 'Chi nhánh',
  events: 'Sự kiện',
  settings: 'Cài đặt',
  general: 'Chung',
  notifications: 'Thông báo',
  logs: 'Nhật ký',
  orders: 'Đơn hàng',
  assignment: 'Phân công',
  progress: 'Tiến độ',
  schedule: 'Lịch trình',
  performance: 'Hiệu suất',
  inventory: 'Kho hàng',
  purchase: 'Mua hàng',
  history: 'Lịch sử',
  feedback: 'Phản hồi',
  tasks: 'Công việc',
  customers: 'Khách hàng',
  notes: 'Ghi chú',
  support: 'Hỗ trợ',
  guidelines: 'Hướng dẫn',
  contact: 'Liên hệ'
};

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Trang chủ', href: '/dashboard' }
    ];

    let currentPath = '';
    
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const isLast = index === pathnames.length - 1;
      
      items.push({
        label: routeLabels[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1),
        href: isLast ? undefined : currentPath
      });
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4 animate-fade-in">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center space-x-1 hover:text-foreground transition-colors"
            >
              {index === 0 && <Home className="h-4 w-4" />}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className={cn(
              "flex items-center space-x-1 font-medium text-foreground",
              index === 0 && "space-x-1"
            )}>
              {index === 0 && <Home className="h-4 w-4" />}
              <span>{item.label}</span>
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
