import React, { useState, useEffect } from "react";
import { MapPin, Phone, User, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Address } from "@/types/address";

interface AddressFormProps {
  initialData?: Address | null;
  onSubmit: (address: Address | Omit<Address, "id">) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    city: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Cities and districts data
  const cities = [
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Cần Thơ",
    "Hải Phòng",
    "Nha Trang",
    "Huế",
    "Vũng Tàu",
  ];

  const districts: Record<string, string[]> = {
    "TP. Hồ Chí Minh": [
      "Quận 1",
      "Quận 2",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 9",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Quận Bình Thạnh",
      "Quận Gò Vấp",
      "Quận Phú Nhuận",
      "Quận Tân Bình",
      "Quận Tân Phú",
      "Quận Thủ Đức",
      "Huyện Bình Chánh",
      "Huyện Cần Giờ",
      "Huyện Củ Chi",
      "Huyện Hóc Môn",
      "Huyện Nhà Bè",
    ],
    "Hà Nội": [
      "Quận Ba Đình",
      "Quận Hoàn Kiếm",
      "Quận Tây Hồ",
      "Quận Long Biên",
      "Quận Cầu Giấy",
      "Quận Đống Đa",
      "Quận Hai Bà Trưng",
      "Quận Hoàng Mai",
      "Quận Thanh Xuân",
      "Quận Bắc Từ Liêm",
      "Quận Nam Từ Liêm",
      "Quận Hà Đông",
    ],
    "Đà Nẵng": [
      "Quận Hải Châu",
      "Quận Thanh Khê",
      "Quận Sơn Trà",
      "Quận Ngũ Hành Sơn",
      "Quận Liên Chiểu",
      "Quận Cẩm Lệ",
    ],
    "Cần Thơ": [
      "Quận Ninh Kiều",
      "Quận Bình Thủy",
      "Quận Cái Răng",
      "Quận Ô Môn",
      "Quận Thốt Nốt",
    ],
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        phone: initialData.phone,
        address: initialData.address,
        district: initialData.district,
        city: initialData.city,
        isDefault: initialData.isDefault,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập tên người nhận";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ chi tiết";
    }

    if (!formData.district) {
      newErrors.district = "Vui lòng chọn quận/huyện";
    }

    if (!formData.city) {
      newErrors.city = "Vui lòng chọn thành phố";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock geocoding - in real app, use Google Maps Geocoding API
      const mockCoordinates = {
        lat: 10.7769 + (Math.random() - 0.5) * 0.1,
        lng: 106.7009 + (Math.random() - 0.5) * 0.1,
      };

      const addressData = {
        ...formData,
        coordinates: mockCoordinates,
      };

      if (initialData) {
        onSubmit({ ...addressData, id: initialData.id });
      } else {
        onSubmit(addressData);
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra, vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCityChange = (city: string) => {
    setFormData((prev) => ({
      ...prev,
      city,
      district: "", // Reset district when city changes
    }));
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Lỗi",
        description: "Trình duyệt không hỗ trợ định vị",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In real app, use reverse geocoding to get address
        toast({
          title: "Thành công",
          description: "Đã lấy vị trí hiện tại",
        });
      },
      (error) => {
        toast({
          title: "Lỗi",
          description: "Không thể lấy vị trí hiện tại",
          variant: "destructive",
        });
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Tên người nhận *</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nhập tên người nhận"
              className={`pl-10 focus-visible:ring-black/50 focus-visible:border-black/10 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Nhập số điện thoại"
              className={`pl-10 focus-visible:ring-black/50 focus-visible:border-black/10 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Địa chỉ chi tiết *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="Số nhà, tên đường, phường/xã"
            className={`pl-10 focus-visible:ring-black/50 focus-visible:border-black/10 ${
              errors.address ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address}</p>
        )}
      </div>

      {/* City and District */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 ">
          <Label>Thành phố *</Label>
          <Select value={formData.city} onValueChange={handleCityChange}>
            <SelectTrigger
              className={`focus:ring-black/50 focus:border-black/10 ${
                errors.city ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Chọn thành phố" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label>Quận/Huyện *</Label>
          <Select
            value={formData.district}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, district: value }))
            }
            disabled={!formData.city}
          >
            <SelectTrigger
              className={`focus:ring-black/50 focus:border-black/10 ${
                errors.district ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Chọn quận/huyện" />
            </SelectTrigger>
            <SelectContent>
              {formData.city &&
                districts[formData.city]?.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.district && (
            <p className="text-sm text-red-500">{errors.district}</p>
          )}
        </div>
      </div>

      {/* Current Location Button */}
      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={handleGetCurrentLocation}
          className="w-full sm:w-auto"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Sử dụng vị trí hiện tại
        </Button>
      </div>

      {/* Default Address Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          className="border-[hsl(var(--hero-btn))] data-[state=checked]:bg-[hsl(var(--hero-btn))] data-[state=checked]:border-[hsl(var(--hero-btn))] focus-visible:ring-[hsl(var(--hero-btn))]"
          id="isDefault"
          checked={formData.isDefault}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, isDefault: checked as boolean }))
          }
        />
        <Label htmlFor="isDefault">Đặt làm địa chỉ mặc định</Label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/85"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2  border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : null}
          {initialData ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
