import React from "react";
import { BellRing, Calendar, CheckCircle, Info, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error" | "event";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />;
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "warning":
      return <BellRing className="h-4 w-4 text-yellow-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "event":
      return <Calendar className="h-4 w-4 text-purple-500" />;
    default:
      return <Info className="h-4 w-4 text-gray-500" />;
  }
};

const getTypeColor = (type: Notification["type"]) => {
  switch (type) {
    case "info":
      return "text-blue-500";
    case "success":
      return "text-green-500";
    case "warning":
      return "text-yellow-500";
    case "error":
      return "text-red-500";
    case "event":
      return "text-purple-500";
    default:
      return "text-gray-500";
  }
};

export function NotificationList({
  notifications,
  onMarkAsRead,
  onClearAll,
}: NotificationListProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-80">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-lg font-semibold">Thông báo ({unreadCount})</h3>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                notifications.forEach((n) => !n.read && onMarkAsRead(n.id))
              }
            >
              Đọc tất cả
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              Xóa tất cả
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <ScrollArea className="h-[300px]">
        {notifications.length === 0 ? (
          <p className="p-4 text-center text-muted-foreground">
            Không có thông báo nào
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start gap-3 p-4 border-b last:border-b-0 cursor-pointer hover:bg-accent ${
                notification.read ? "opacity-70" : "font-medium"
              }`}
              onClick={() =>
                !notification.read && onMarkAsRead(notification.id)
              }
            >
              <div className="flex-shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-sm font-semibold ${getTypeColor(
                      notification.type
                    )}`}
                  >
                    {notification.title}
                  </span>
                  {!notification.read && (
                    <Badge
                      variant="destructive"
                      className="h-2 w-2 p-0 animate-pulse-soft"
                    />
                  )}
                </div>
                <p className="text-sm text-foreground line-clamp-2 mb-1">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}
