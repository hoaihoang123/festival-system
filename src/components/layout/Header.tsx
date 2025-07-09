import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, Menu, Moon, Sun, User, LogOut, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationList, Notification } from "./NotificationList";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "info",
      title: "Đơn hàng mới",
      message: "Có một đơn hàng mới #ORDER123456",
      timestamp: "5 phút trước",
      read: false,
    },
    {
      id: "2",
      type: "success",
      title: "Thanh toán thành công",
      message: "Đơn hàng #ORDER12345 đã được thanh toán",
      timestamp: "1 giờ trước",
      read: true,
    },
    {
      id: "3",
      type: "warning",
      title: "Sắp hết hàng",
      message: "Món Gà rán chỉ còn 5 suất",
      timestamp: "1 ngày trước",
      read: false,
    },
    {
      id: "4",
      type: "event",
      title: "Sự kiện sắp tới",
      message: "Tiệc sinh nhật của khách hàng An vào 20/07",
      timestamp: "2 ngày trước",
      read: false,
    },
    {
      id: "5",
      type: "error",
      title: "Lỗi hệ thống",
      message: "Không thể kết nối đến cơ sở dữ liệu",
      timestamp: "3 ngày trước",
      read: true,
    },
  ]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-destructive";
      case "manager":
        return "bg-warning";
      case "staff":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "manager":
        return "Quản lý";
      case "staff":
        return "Nhân viên";
      default:
        return role;
    }
  };

  return (
    <header className="bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 py-3 animate-fade-in">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">
              PP
            </span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-semibold text-lg">Party Planning</h1>
            <p className="text-xs text-muted-foreground">
              Hệ thống quản lý tiệc
            </p>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="relative transition-transform hover:scale-110"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse-soft"
                >
                  {unreadNotificationsCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <NotificationList
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onClearAll={handleClearAllNotifications}
            />
          </PopoverContent>
        </Popover>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-auto pl-2 pr-3 hover:bg-accent"
            >
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getRoleColor(user?.role || "")}`}
                  >
                    {getRoleLabel(user?.role || "")}
                  </Badge>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                {user?.branch && (
                  <p className="text-xs text-muted-foreground">
                    Chi nhánh: {user.branch}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Thông tin cá nhân
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Cài đặt
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
