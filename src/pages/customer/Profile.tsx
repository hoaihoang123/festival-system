import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Camera,
  Save,
  Edit,
  Gift,
} from "lucide-react";
import { ProfileSkeleton } from "@/components/ui/loading-skeleton";
import { useToast } from "@/hooks/use-toast";
import LoyaltyPointCard from "@/components/customer/LoyaltyPoint/LoyaltyPointCard";
import { loyaltyPointService } from "@/services/loyaltyPoint";
import { LoyaltyPoint } from "@/types/loyaltyPoint";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [loyaltyPoints, setLoyaltyPoints] = useState<{
    totalPoints: number;
    history: LoyaltyPoint[];
  }>({ totalPoints: 0, history: [] });

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchLoyaltyPoints = async () => {
      try {
        // Giả lập userId = 1 cho demo
        const points = await loyaltyPointService.getLoyaltyPoints("1");
        setLoyaltyPoints(points);
      } catch (error) {
        console.error("Error fetching loyalty points:", error);
      }
    };

    fetchLoyaltyPoints();
  }, []);

  // Mock user data
  const [userData, setUserData] = useState({
    fullName: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    phone: "0901234567",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    dateOfBirth: "1990-01-15",
    gender: "Nam",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin cá nhân đã được cập nhật",
      });
    }, 500);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới phải có ít nhất 6 ký tự",
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast({
        title: "Đổi mật khẩu thành công",
        description: "Mật khẩu của bạn đã được thay đổi",
      });
    }, 500);
  };

  const handleUploadAvatar = () => {
    // Simulate file upload
    toast({
      title: "Tải ảnh thành công",
      description: "Ảnh đại diện đã được cập nhật",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Thông Tin <span className="text-gradient">Cá Nhân</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quản lý thông tin tài khoản và cài đặt bảo mật
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="security">Bảo mật</TabsTrigger>
              <TabsTrigger value="loyalty-points">Điểm thưởng</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Thông tin cá nhân
                    </CardTitle>
                    <Button
                      variant={isEditing ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="focus-visible:ring-black/50 focus-visible:border-black/10"
                    >
                      <Edit className="h-4 w-4 mr-2 " />
                      {isEditing ? "Hủy" : "Chỉnh sửa"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage
                          src={userData.avatar}
                          alt={userData.fullName}
                        />
                        <AvatarFallback>
                          {userData.fullName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-[hsl(var(--hero-btn))]"
                          onClick={handleUploadAvatar}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {userData.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Khách hàng thân thiết
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên *</Label>
                      <Input
                        id="fullName"
                        value={userData.fullName}
                        onChange={(e) =>
                          setUserData({ ...userData, fullName: e.target.value })
                        }
                        disabled={!isEditing}
                        className={
                          !isEditing
                            ? "bg-gray-50 "
                            : "focus-visible:ring-black/50 focus-visible:border-black/10"
                        }
                        aria-required="true"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                          disabled={!isEditing}
                          className={`pl-10 ${
                            !isEditing
                              ? "bg-gray-50"
                              : "focus-visible:ring-black/50 focus-visible:border-black/10"
                          }`}
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                          }
                          disabled={!isEditing}
                          className={`pl-10 ${
                            !isEditing
                              ? "bg-gray-50"
                              : "focus-visible:ring-black/50 focus-visible:border-black/10"
                          }`}
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={userData.dateOfBirth}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            dateOfBirth: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className={
                          !isEditing
                            ? "bg-gray-50"
                            : "focus-visible:ring-black/50 focus-visible:border-black/10"
                        }
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          value={userData.address}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              address: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          className={`pl-10 ${
                            !isEditing
                              ? "bg-gray-50"
                              : "focus-visible:ring-black/50 focus-visible:border-black/10 "
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-primary hover:opacity-90 focus:ring-2 focus:ring-offset-2"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Lưu thay đổi
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="focus:ring-2 focus:ring-offset-2"
                      >
                        Hủy
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Đổi mật khẩu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại *</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Nhập mật khẩu hiện tại"
                      aria-required="true"
                      className="focus-visible:ring-black/50 focus-visible:border-black/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Mật khẩu mới *</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                      aria-required="true"
                      className="focus-visible:ring-black/50 focus-visible:border-black/10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Xác nhận mật khẩu mới *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Nhập lại mật khẩu mới"
                      aria-required="true"
                      className="focus-visible:ring-black/50 focus-visible:border-black/10"
                    />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">
                      Lưu ý bảo mật:
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Mật khẩu phải có ít nhất 6 ký tự</li>
                      <li>• Nên sử dụng kết hợp chữ hoa, chữ thường và số</li>
                      <li>• Không chia sẻ mật khẩu với người khác</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleChangePassword}
                    className="bg-gradient-primary hover:opacity-90 focus:ring-2 focus:ring-offset-2"
                    disabled={
                      !passwordData.currentPassword ||
                      !passwordData.newPassword ||
                      !passwordData.confirmPassword
                    }
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Đổi mật khẩu
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="loyalty-points">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Điểm thưởng của bạn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LoyaltyPointCard
                    totalPoints={loyaltyPoints.totalPoints}
                    history={loyaltyPoints.history}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Profile;
