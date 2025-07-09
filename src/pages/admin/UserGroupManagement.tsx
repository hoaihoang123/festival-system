import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Users, Edit, Trash2, UserPlus, UserMinus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data cho nhóm người dùng
const mockGroups = [
  {
    id: "1",
    name: "Quản lý Hà Nội",
    description: "Nhóm quản lý chi nhánh Hà Nội",
    memberCount: 5,
    permissions: ["view_reports", "manage_bookings", "manage_staff"],
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Nhân viên Hà Nội",
    description: "Nhóm nhân viên chi nhánh Hà Nội",
    memberCount: 15,
    permissions: ["view_bookings", "create_bookings"],
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    name: "Quản lý Hồ Chí Minh",
    description: "Nhóm quản lý chi nhánh Hồ Chí Minh",
    memberCount: 4,
    permissions: ["view_reports", "manage_bookings", "manage_staff"],
    createdAt: "2024-01-02",
  },
];

// Mock data cho danh sách người dùng
const mockUsers = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    role: "manager",
  },
  { id: "2", name: "Trần Thị B", email: "tranthib@example.com", role: "staff" },
  { id: "3", name: "Lê Văn C", email: "levanc@example.com", role: "staff" },
];

export default function UserGroupManagement() {
  const [groups, setGroups] = useState(mockGroups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isAddGroupDialogOpen, setIsAddGroupDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "", description: "" });
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleAddGroup = () => {
    const newGroupData = {
      id: Date.now().toString(),
      name: newGroup.name,
      description: newGroup.description,
      memberCount: 0,
      permissions: [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setGroups((prev) => [...prev, newGroupData]);
    setNewGroup({ name: "", description: "" });
    setIsAddGroupDialogOpen(false);
  };

  const handleAddMembers = () => {
    // TODO: Implement add members functionality
    setIsAddMemberDialogOpen(false);
    setSelectedUsers([]);
  };

  const handleRemoveMember = (userId) => {
    // TODO: Implement remove member functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Quản lý nhóm người dùng</h1>
          <p className="text-muted-foreground">
            Tạo và quản lý các nhóm người dùng trong hệ thống
          </p>
        </div>
        <Dialog
          open={isAddGroupDialogOpen}
          onOpenChange={setIsAddGroupDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm nhóm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm nhóm mới</DialogTitle>
              <DialogDescription>
                Tạo nhóm người dùng mới và cấu hình quyền truy cập
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupName">Tên nhóm</Label>
                <Input
                  id="groupName"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="groupDescription">Mô tả</Label>
                <Input
                  id="groupDescription"
                  value={newGroup.description}
                  onChange={(e) =>
                    setNewGroup((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <Button onClick={handleAddGroup}>Thêm nhóm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{group.memberCount} thành viên</span>
                  </div>
                  <Dialog
                    open={isAddMemberDialogOpen}
                    onOpenChange={setIsAddMemberDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Thêm thành viên
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Thêm thành viên vào nhóm</DialogTitle>
                        <DialogDescription>
                          Chọn người dùng để thêm vào nhóm {group.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {mockUsers.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={`user-${user.id}`}
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedUsers((prev) => [
                                      ...prev,
                                      user.id,
                                    ]);
                                  } else {
                                    setSelectedUsers((prev) =>
                                      prev.filter((id) => id !== user.id)
                                    );
                                  }
                                }}
                              />
                              <Label htmlFor={`user-${user.id}`}>
                                {user.name} ({user.email})
                              </Label>
                            </div>
                          ))}
                        </div>
                        <Button onClick={handleAddMembers}>
                          Thêm thành viên
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Quyền truy cập:</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Ngày tạo: {group.createdAt}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
