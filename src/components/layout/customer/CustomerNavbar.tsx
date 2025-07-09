import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Trash2, User, MapPin, HelpCircle, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItemClass =
  "rounded-md px-4 py-2 text-base font-medium transition-colors duration-200 cursor-pointer text-[#23272E] hover:bg-[#FDEEEA] hover:text-[#F45734] hover:font-bold";
const activeMenuItemClass =
  "bg-[#FDEEEA] text-[#F45734] font-bold rounded-md px-4 py-2 text-base";

const notificationsMock = [
  {
    id: 1,
    type: "order",
    typeColor: "bg-blue-100 text-blue-800",
    typeText: "Đơn hàng",
    time: "17:30 15/1/2024",
    title: "Đơn hàng đã được xác nhận",
    content:
      "Đơn hàng #DH-2024-001 của bạn đã được xác nhận và đang được chuẩn bị.",
    detail: "Xem chi tiết",
    isRead: false,
  },
  {
    id: 2,
    type: "promotion",
    typeColor: "bg-green-100 text-green-800",
    typeText: "Khuyến mãi",
    time: "16:15 15/1/2024",
    title: "Ưu đãi đặc biệt dành cho bạn!",
    content:
      "Giảm 20% cho tất cả dịch vụ tiệc cưới trong tháng này. Mã: WEDDING20",
    detail: "",
    isRead: false,
  },
  {
    id: 3,
    type: "support",
    typeColor: "bg-orange-100 text-orange-800",
    typeText: "Hỗ trợ",
    time: "15:00 14/1/2024",
    title: "Ticket hỗ trợ đã được phản hồi",
    content: "Ticket TK-2024-001 của bạn đã có phản hồi từ đội ngũ hỗ trợ.",
    detail: "Xem chi tiết",
    isRead: true,
  },
  {
    id: 4,
    type: "order",
    typeColor: "bg-blue-100 text-blue-800",
    typeText: "Đơn hàng",
    time: "14:00 14/1/2024",
    title: "Đơn hàng đã giao thành công",
    content: "Đơn hàng #DH-2024-002 của bạn đã được giao thành công.",
    detail: "Xem chi tiết",
    isRead: false,
  },
  {
    id: 5,
    type: "promotion",
    typeColor: "bg-green-100 text-green-800",
    typeText: "Khuyến mãi",
    time: "13:30 14/1/2024",
    title: "Mã giảm giá mới cho bạn!",
    content: "Nhập mã NEWYEAR để nhận ưu đãi 10% cho đơn tiếp theo.",
    detail: "",
    isRead: false,
  },
  {
    id: 6,
    type: "support",
    typeColor: "bg-orange-100 text-orange-800",
    typeText: "Hỗ trợ",
    time: "12:00 13/1/2024",
    title: "Yêu cầu hỗ trợ đã được tiếp nhận",
    content:
      "Chúng tôi đã nhận được yêu cầu hỗ trợ của bạn và sẽ phản hồi sớm nhất.",
    detail: "Xem chi tiết",
    isRead: true,
  },
  {
    id: 7,
    type: "system",
    typeColor: "bg-gray-100 text-gray-800",
    typeText: "Hệ thống",
    time: "10:00 13/1/2024",
    title: "Bảo trì hệ thống",
    content: "Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng ngày 16/01/2024.",
    detail: "",
    isRead: true,
  },
  {
    id: 8,
    type: "order",
    typeColor: "bg-blue-100 text-blue-800",
    typeText: "Đơn hàng",
    time: "09:00 13/1/2024",
    title: "Đơn hàng mới đã được tạo",
    content: "Bạn vừa tạo đơn hàng #DH-2024-003 thành công.",
    detail: "Xem chi tiết",
    isRead: false,
  },
];

export const CustomerNavbar: React.FC = () => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [notifications, setNotifications] = React.useState(notificationsMock);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };
  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const navItems = [
    { name: "Trang chủ", path: "/home" },
    { name: "Dịch vụ tiệc", path: "/services" },
    { name: "Đặt tiệc", path: "/booking" },
    { name: "Lịch sử", path: "/history" },
  ];
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="w-full h-16 shadow-lg sticky top-0 z-50 bg-white"
      style={{ height: 64 }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-8 relative">
        {/* Logo trái */}
        <div className="flex-1 flex items-center">
          <span
            className="text-2xl font-bold cursor-pointer"
            style={{ color: "#FF5630" }}
          >
            PartyPro
          </span>
        </div>
        {/* Menu giữa */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                isActive(item.path) ? activeMenuItemClass : menuItemClass
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* User phải */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {/* Notification Dropdown */}
          <DropdownMenu
            open={showNotifications}
            onOpenChange={setShowNotifications}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative p-2">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="#23272E"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FF5630] text-white text-xs rounded-full px-1.5 font-bold min-w-[16px] text-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h4 className="font-medium text-base">Thông báo</h4>
                {unreadCount > 0 && (
                  <button
                    className="text-xs text-primary hover:underline"
                    onClick={markAllAsRead}
                  >
                    Đánh dấu tất cả đã đọc
                  </button>
                )}
              </div>
              {/* List */}
              <ScrollArea className="h-[370px]">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Không có thông báo
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 border-b last:border-b-0 flex flex-col gap-1 transition-colors duration-100 text-sm hover:bg-gray-50 ${
                        !n.isRead ? "bg-blue-50/30" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={n.typeColor}>{n.typeText}</Badge>
                            <span className="text-xs text-gray-400 ml-2">
                              {n.time}
                            </span>
                          </div>
                          <div className="font-medium text-gray-900">
                            {n.title}
                          </div>
                          <div className="text-gray-600">{n.content}</div>
                          {n.detail && (
                            <div className="text-xs mt-1 text-[#FF5630] cursor-pointer font-medium">
                              {n.detail}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          {!n.isRead && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 p-0"
                              onClick={() => markAsRead(n.id)}
                              title="Đánh dấu đã đọc"
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 p-0"
                            onClick={() => deleteNotification(n.id)}
                            title="Xóa thông báo"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
              <div className="text-center py-2 text-[#FF5630] font-medium cursor-pointer border-t border-gray-200 bg-white text-sm">
                Xem tất cả thông báo
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden lg:block">Nguyễn Văn A</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Thông tin cá nhân</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/addresses" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Quản lý địa chỉ</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/support" className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Hỗ trợ</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center space-x-2 text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
