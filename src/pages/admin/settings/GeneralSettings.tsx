import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function GeneralSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    companyName: "Festive Booking System",
    email: "contact@festive.com",
    phone: "0123456789",
    address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
    timezone: "Asia/Ho_Chi_Minh",
    language: "vi",
    maintenanceMode: false,
    enableNotifications: true,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
  });

  const handleSave = () => {
    // TODO: Implement save settings
    toast({
      title: "Đã lưu cài đặt",
      description: "Các cài đặt đã được cập nhật thành công",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cài đặt chung</h1>
        <p className="text-muted-foreground">
          Cấu hình các thiết lập chung của hệ thống
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin công ty</CardTitle>
            <CardDescription>
              Cấu hình thông tin cơ bản của công ty
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Tên công ty</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) =>
                    setSettings({ ...settings, companyName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email liên hệ</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cài đặt hệ thống</CardTitle>
            <CardDescription>Cấu hình các thiết lập hệ thống</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="timezone">Múi giờ</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) =>
                    setSettings({ ...settings, timezone: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn múi giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Ho_Chi_Minh">
                      (GMT+7) Việt Nam
                    </SelectItem>
                    <SelectItem value="Asia/Bangkok">
                      (GMT+7) Thái Lan
                    </SelectItem>
                    <SelectItem value="Asia/Singapore">
                      (GMT+8) Singapore
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) =>
                    setSettings({ ...settings, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn ngôn ngữ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông báo</CardTitle>
            <CardDescription>Cấu hình các thiết lập thông báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chế độ bảo trì</Label>
                  <p className="text-sm text-muted-foreground">
                    Tạm thời vô hiệu hóa hệ thống để bảo trì
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, maintenanceMode: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo hệ thống</Label>
                  <p className="text-sm text-muted-foreground">
                    Bật/tắt thông báo trong hệ thống
                  </p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo qua email</Label>
                  <p className="text-sm text-muted-foreground">
                    Gửi thông báo qua email
                  </p>
                </div>
                <Switch
                  checked={settings.enableEmailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      enableEmailNotifications: checked,
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo qua SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Gửi thông báo qua SMS
                  </p>
                </div>
                <Switch
                  checked={settings.enableSMSNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      enableSMSNotifications: checked,
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Lưu thay đổi</Button>
        </div>
      </div>
    </div>
  );
}
