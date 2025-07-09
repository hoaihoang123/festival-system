import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Định nghĩa các module và quyền
const modules = [
  {
    id: "dashboard",
    name: "Dashboard",
    permissions: ["view", "export"],
  },
  {
    id: "users",
    name: "Quản lý người dùng",
    permissions: ["view", "create", "edit", "delete", "export"],
  },
  {
    id: "bookings",
    name: "Quản lý đơn hàng",
    permissions: ["view", "create", "edit", "delete", "approve", "export"],
  },
  {
    id: "services",
    name: "Quản lý dịch vụ",
    permissions: ["view", "create", "edit", "delete", "export"],
  },
  {
    id: "reports",
    name: "Báo cáo",
    permissions: ["view", "create", "export"],
  },
  {
    id: "settings",
    name: "Cài đặt hệ thống",
    permissions: ["view", "edit"],
  },
];

// Mock data cho các vai trò
const mockRoles = [
  {
    id: "admin",
    name: "Admin",
    description: "Quản trị viên hệ thống",
    permissions: {
      dashboard: ["view", "export"],
      users: ["view", "create", "edit", "delete", "export"],
      bookings: ["view", "create", "edit", "delete", "approve", "export"],
      services: ["view", "create", "edit", "delete", "export"],
      reports: ["view", "create", "export"],
      settings: ["view", "edit"],
    },
  },
  {
    id: "manager",
    name: "Manager",
    description: "Quản lý chi nhánh",
    permissions: {
      dashboard: ["view"],
      users: ["view"],
      bookings: ["view", "create", "edit", "approve"],
      services: ["view"],
      reports: ["view", "export"],
      settings: ["view"],
    },
  },
  {
    id: "staff",
    name: "Staff",
    description: "Nhân viên",
    permissions: {
      dashboard: ["view"],
      users: ["view"],
      bookings: ["view", "create"],
      services: ["view"],
      reports: ["view"],
      settings: ["view"],
    },
  },
];

export default function PermissionManagement() {
  const [roles, setRoles] = useState(mockRoles);
  const [selectedRole, setSelectedRole] = useState(mockRoles[0]);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", description: "" });

  const handlePermissionChange = (
    moduleId: string,
    permission: string,
    checked: boolean
  ) => {
    setSelectedRole((prev) => {
      const newPermissions = { ...prev.permissions };
      if (checked) {
        newPermissions[moduleId] = [
          ...(newPermissions[moduleId] || []),
          permission,
        ];
      } else {
        newPermissions[moduleId] = (newPermissions[moduleId] || []).filter(
          (p) => p !== permission
        );
      }
      return { ...prev, permissions: newPermissions };
    });
  };

  const handleSaveRole = () => {
    setRoles((prev) =>
      prev.map((role) => (role.id === selectedRole.id ? selectedRole : role))
    );
    // TODO: Call API to save role permissions
  };

  const handleAddRole = () => {
    const newRoleData = {
      id: newRole.name.toLowerCase().replace(/\s+/g, "-"),
      name: newRole.name,
      description: newRole.description,
      permissions: {
        dashboard: [],
        users: [],
        bookings: [],
        services: [],
        reports: [],
        settings: [],
      },
    };
    setRoles((prev) => [...prev, newRoleData]);
    setNewRole({ name: "", description: "" });
    setIsAddRoleDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý phân quyền</h1>
          <p className="text-muted-foreground">
            Cấu hình quyền truy cập cho các vai trò trong hệ thống
          </p>
        </div>
        <Dialog
          open={isAddRoleDialogOpen}
          onOpenChange={setIsAddRoleDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm vai trò
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm vai trò mới</DialogTitle>
              <DialogDescription>
                Tạo vai trò mới và cấu hình quyền truy cập
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roleName">Tên vai trò</Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="roleDescription">Mô tả</Label>
                <Input
                  id="roleDescription"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <Button onClick={handleAddRole}>Thêm vai trò</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Vai trò</CardTitle>
            <CardDescription>Chọn vai trò để cấu hình quyền</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roles.map((role) => (
                <Button
                  key={role.id}
                  variant={selectedRole.id === role.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedRole(role)}
                >
                  {role.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedRole.name}</CardTitle>
                <CardDescription>{selectedRole.description}</CardDescription>
              </div>
              <Button onClick={handleSaveRole}>
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="permissions">
              <TabsList>
                <TabsTrigger value="permissions">Phân quyền</TabsTrigger>
                <TabsTrigger value="users">Người dùng</TabsTrigger>
              </TabsList>
              <TabsContent value="permissions">
                <div className="space-y-6">
                  {modules.map((module) => (
                    <div key={module.id} className="space-y-2">
                      <h3 className="font-medium">{module.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {module.permissions.map((permission) => (
                          <div
                            key={permission}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${module.id}-${permission}`}
                              checked={selectedRole.permissions[
                                module.id
                              ]?.includes(permission)}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(
                                  module.id,
                                  permission,
                                  checked as boolean
                                )
                              }
                            />
                            <Label htmlFor={`${module.id}-${permission}`}>
                              {permission === "view" && "Xem"}
                              {permission === "create" && "Tạo mới"}
                              {permission === "edit" && "Chỉnh sửa"}
                              {permission === "delete" && "Xóa"}
                              {permission === "approve" && "Phê duyệt"}
                              {permission === "export" && "Xuất báo cáo"}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="users">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* TODO: Add user list for this role */}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
