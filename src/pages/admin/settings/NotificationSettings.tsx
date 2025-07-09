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

const notificationTypes = [
  {
    id: "booking",
    name: "Đơn hàng",
    description: "Thông báo về trạng thái đơn hàng",
  },
  {
    id: "payment",
    name: "Thanh toán",
    description: "Thông báo về trạng thái thanh toán",
  },
  {
    id: "system",
    name: "Hệ thống",
    description: "Thông báo từ hệ thống",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Thông báo về chương trình khuyến mãi",
  },
];

export default function NotificationSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      smtpServer: "smtp.gmail.com",
      smtpPort: "587",
      username: "notifications@festive.com",
      password: "********",
      fromName: "Festive Booking System",
    },
    sms: {
      enabled: false,
      provider: "twilio",
      apiKey: "********",
      fromNumber: "+84123456789",
    },
    notifications: {
      booking: {
        email: true,
        sms: false,
        inApp: true,
      },
      payment: {
        email: true,
        sms: true,
        inApp: true,
      },
      system: {
        email: true,
        sms: false,
        inApp: true,
      },
      marketing: {
        email: true,
        sms: false,
        inApp: false,
      },
    },
  });

  const handleSave = () => {
    // TODO: Implement save settings
    toast({
      title: "Đã lưu cài đặt",
      description: "Các cài đặt thông báo đã được cập nhật thành công",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cài đặt thông báo</h1>
        <p className="text-muted-foreground">
          Cấu hình các thiết lập thông báo và kênh gửi thông báo
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Cấu hình thông tin gửi thông báo qua email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bật thông báo qua email</Label>
                <p className="text-sm text-muted-foreground">
                  Cho phép gửi thông báo qua email
                </p>
              </div>
              <Switch
                checked={settings.email.enabled}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, enabled: checked },
                  })
                }
              />
            </div>
            {settings.email.enabled && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={settings.email.smtpServer}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: {
                          ...settings.email,
                          smtpServer: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={settings.email.smtpPort}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, smtpPort: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emailUsername">Email</Label>
                  <Input
                    id="emailUsername"
                    value={settings.email.username}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, username: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="emailPassword">Mật khẩu</Label>
                  <Input
                    id="emailPassword"
                    type="password"
                    value={settings.email.password}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, password: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fromName">Tên người gửi</Label>
                  <Input
                    id="fromName"
                    value={settings.email.fromName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        email: { ...settings.email, fromName: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SMS</CardTitle>
            <CardDescription>
              Cấu hình thông tin gửi thông báo qua SMS
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bật thông báo qua SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Cho phép gửi thông báo qua SMS
                </p>
              </div>
              <Switch
                checked={settings.sms.enabled}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    sms: { ...settings.sms, enabled: checked },
                  })
                }
              />
            </div>
            {settings.sms.enabled && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="smsProvider">Nhà cung cấp</Label>
                  <Select
                    value={settings.sms.provider}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        sms: { ...settings.sms, provider: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                      <SelectItem value="viettel">Viettel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="smsApiKey">API Key</Label>
                  <Input
                    id="smsApiKey"
                    type="password"
                    value={settings.sms.apiKey}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sms: { ...settings.sms, apiKey: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fromNumber">Số điện thoại gửi</Label>
                  <Input
                    id="fromNumber"
                    value={settings.sms.fromNumber}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        sms: { ...settings.sms, fromNumber: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loại thông báo</CardTitle>
            <CardDescription>
              Cấu hình kênh gửi cho từng loại thông báo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {notificationTypes.map((type) => (
              <div key={type.id} className="space-y-4">
                <div>
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label>Email</Label>
                    <Switch
                      checked={settings.notifications[type.id].email}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [type.id]: {
                              ...settings.notifications[type.id],
                              email: checked,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS</Label>
                    <Switch
                      checked={settings.notifications[type.id].sms}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [type.id]: {
                              ...settings.notifications[type.id],
                              sms: checked,
                            },
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Trong ứng dụng</Label>
                    <Switch
                      checked={settings.notifications[type.id].inApp}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [type.id]: {
                              ...settings.notifications[type.id],
                              inApp: checked,
                            },
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>Lưu thay đổi</Button>
        </div>
      </div>
    </div>
  );
}
