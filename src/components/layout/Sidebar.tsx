import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  BarChart3,
  Users,
  Calendar,
  Settings,
  FileText,
  Package,
  UserCheck,
  Clock,
  MessageSquare,
  HelpCircle,
  Home,
  ShoppingCart,
  UtensilsCrossed,
  LayoutDashboard,
  Shield,
  History,
  UserCog,
  Building2,
  Sliders,
  BellRing,
  PieChart,
  ClipboardList,
  List,
  Boxes,
  AlertTriangle,
  Gift,
  ClipboardCheck,
  CreditCard,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: MenuItem[];
  roles?: string[];
  description?: string;
}

const menuItems: MenuItem[] = [
  // Admin menu
  {
    title: "Dashboard Admin",
    href: "/admin/dashboard",
    icon: BarChart3,
    roles: ["admin"],
  },
  // Manager menu
  {
    title: "Dashboard Quản lý",
    href: "/manager/dashboard",
    icon: LayoutDashboard,
    roles: ["manager"],
  },
  {
    title: "Báo cáo Quản lý",
    href: "/manager/reports",
    icon: PieChart,
    roles: ["manager"],
  },
  {
    title: "Quản lý người dùng",
    icon: Users,
    roles: ["admin"],
    children: [
      { title: "Danh sách người dùng", href: "/admin/users", icon: Users },
      { title: "Nhóm người dùng", href: "/admin/user-groups", icon: UserCog },
      { title: "Phân quyền", href: "/admin/permissions", icon: Shield },
      { title: "Lịch sử hoạt động", href: "/admin/activity", icon: History },
    ],
  },
  {
    title: "Quản lý Menu & Combo",
    icon: UtensilsCrossed,
    roles: ["admin"],
    children: [
      { title: "Danh sách Combo", href: "/admin/combos", icon: Package },
      { title: "Quản lý Menu", href: "/admin/menu", icon: UtensilsCrossed },
      { title: "Cài đặt giá", href: "/admin/pricing", icon: Settings },
    ],
  },
  {
    title: "Báo cáo",
    icon: BarChart3,
    roles: ["admin"],
    children: [{ title: "Tổng hợp", href: "/admin/reports", icon: BarChart3 }],
  },
  {
    title: "Cài đặt hệ thống",
    icon: Settings,
    roles: ["admin"],
    children: [
      {
        title: "Cài đặt chung",
        href: "/admin/settings/general",
        icon: Sliders,
      },
      {
        title: "Thông báo",
        href: "/admin/settings/notifications",
        icon: BellRing,
      },
      {
        title: "Nhật ký hệ thống",
        href: "/admin/settings/logs",
        icon: History,
      },
    ],
  },
  // Manager menu
  {
    title: "Quản lý đơn hàng",
    icon: ClipboardList,
    roles: ["admin", "manager"],
    href: "/manager/orders",
  },
  {
    title: "Quản lý nhân viên",
    icon: Users,
    roles: ["admin", "manager"],
    children: [
      {
        title: "Danh sách nhân viên",
        href: "/manager/staff",
        icon: List,
        description: "Quản lý thông tin và hiệu suất nhân viên",
      },
      {
        title: "Quản lý ca làm việc",
        href: "/manager/schedule",
        icon: Calendar,
        description: "Phân ca và theo dõi lịch làm việc",
      },
      {
        title: "Đánh giá và báo cáo",
        href: "/manager/evaluation-reports",
        icon: BarChart3,
        description:
          "Theo dõi hiệu suất, xem xét đánh giá và phân tích KPI của nhân viên",
      },
    ],
  },
  {
    title: "Quản lý kho",
    icon: Package,
    roles: ["admin", "manager"],
    children: [
      {
        title: "Tồn kho",
        href: "/admin/inventory",
        icon: Package,
        description: "Quản lý ngưỡng tồn kho và theo dõi số lượng",
      },
      {
        title: "Kế hoạch mua hàng",
        href: "/admin/inventory/purchase-plans",
        icon: ClipboardCheck,
        description: "Quản lý kế hoạch mua hàng và phê duyệt",
      },
      {
        title: "Báo cáo tồn kho",
        href: "/admin/inventory/reports",
        icon: BarChart3,
        description: "Xem báo cáo tồn kho và thống kê",
      },
    ],
  },

  // Staff menu
  {
    title: "Dashboard Staff",
    href: "/staff/dashboard",
    icon: BarChart3,
    roles: ["staff"],
  },
  {
    title: "Quản lý đơn hàng",
    icon: ClipboardList,
    roles: ["staff"],
    children: [
      {
        title: "Danh sách đơn hàng",
        href: "/staff/orders",
        icon: List,
        description: "Xem và quản lý các đơn hàng được phân công",
      },
      {
        title: "Lịch sử đơn hàng",
        href: "/staff/orders/history",
        icon: History,
        description: "Xem lịch sử các đơn hàng đã thực hiện",
      },
    ],
  },
  {
    title: "Quản lý phân công",
    icon: ClipboardCheck,
    roles: ["staff"],
    children: [
      {
        title: "Đang thực hiện",
        href: "/staff/assignments",
        icon: Clock,
        description: "Xem và quản lý các công việc đang thực hiện",
      },
      {
        title: "Lịch sử công việc",
        href: "/staff/assignments/history",
        icon: History,
        description: "Xem lịch sử và đánh giá công việc đã hoàn thành",
      },
    ],
  },
  {
    title: "Quản lý nguyên liệu",
    icon: Boxes,
    roles: ["staff"],
    href: "/staff/ingredients",
    description: "Xem và quản lý số lượng nguyên liệu",
  },
  {
    title: "Quản lý Combo",
    icon: Gift,
    roles: ["staff"],
    href: "/staff/combos",
    description: "Xem và quản lý các combo dịch vụ",
  },
  {
    title: "Quản lý sự kiện",
    icon: Calendar,
    roles: ["staff"],
    href: "/staff/events",
    description: "Xem và quản lý lịch sự kiện",
  },
  {
    title: "Quản lý đánh giá",
    icon: MessageSquare,
    roles: ["staff"],
    href: "/staff/reviews",
    description: "Xem và phản hồi đánh giá từ khách hàng",
  },
  {
    title: "Quản lý thanh toán",
    href: "/staff/payments",
    icon: CreditCard,
  },
  {
    title: "Trợ giúp",
    icon: HelpCircle,
    roles: ["staff"],
    href: "/staff/help",
    description: "Hướng dẫn sử dụng hệ thống",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const filterMenuByRole = (items: MenuItem[]): MenuItem[] => {
    return items.filter((item) => {
      if (!item.roles || item.roles.includes(user?.role || "")) {
        if (item.children) {
          item.children = filterMenuByRole(item.children);
        }
        return true;
      }
      return false;
    });
  };

  const filteredMenu = filterMenuByRole(menuItems);

  const isActivePath = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  const hasActiveChild = (children?: MenuItem[]) => {
    return children?.some((child) => child.href && isActivePath(child.href));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0 animate-slide-in" : "-translate-x-full"
        )}
      >
        <ScrollArea className="h-full py-4">
          <nav className="space-y-2 px-3">
            {filteredMenu.map((item, index) => (
              <div key={index}>
                {item.href ? (
                  // Single menu item
                  <NavLink
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 px-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                ) : (
                  // Collapsible menu item
                  <Collapsible defaultOpen={hasActiveChild(item.children)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start space-x-3 font-medium text-sm h-10 px-3"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="flex-1 text-left">{item.title}</span>
                        <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="ml-8 mt-2 space-y-1">
                      {item.children?.map((child, childIndex) => (
                        <NavLink
                          key={childIndex}
                          to={child.href || "#"}
                          onClick={onClose}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )
                          }
                        >
                          <child.icon className="h-4 w-4" />
                          <span className="flex-1">{child.title}</span>
                          {child.badge && (
                            <Badge
                              variant="secondary"
                              className="h-5 px-2 text-xs"
                            >
                              {child.badge}
                            </Badge>
                          )}
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
