import React, { useState, useEffect } from "react";
import { Plus, MapPin, Trash2, Edit2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AddressForm from "@/components/customer/Address/AddressForm";
import AddressCard from "@/components/customer/Address/AddressCard";
import { Address } from "@/types/address";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";

const AddressManagement = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - In real app, this would be from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setAddresses([
        {
          id: "1",
          name: "Nguyễn Văn A",
          phone: "0901234567",
          address: "123 Nguyễn Huệ, Phường Bến Nghé",
          district: "Quận 1",
          city: "TP. Hồ Chí Minh",
          isDefault: true,
          coordinates: { lat: 10.7769, lng: 106.7009 },
        },
        {
          id: "2",
          name: "Trần Thị B",
          phone: "0987654321",
          address: "456 Trần Hưng Đạo, Phường Cầu Kho",
          district: "Quận 1",
          city: "TP. Hồ Chí Minh",
          isDefault: false,
          coordinates: { lat: 10.7558, lng: 106.689 },
        },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddAddress = (newAddress: Omit<Address, "id">) => {
    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
    };

    // If this is the first address or marked as default, make it default
    if (addresses.length === 0 || address.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    setAddresses((prev) => [...prev, address]);
    setShowForm(false);
    toast({
      title: "Thành công",
      description: "Địa chỉ đã được thêm thành công",
    });
  };

  const handleEditAddress = (updatedAddress: Address) => {
    if (updatedAddress.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === updatedAddress.id
            ? updatedAddress
            : { ...addr, isDefault: false }
        )
      );
    } else {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === updatedAddress.id ? updatedAddress : addr
        )
      );
    }

    setEditingAddress(null);
    toast({
      title: "Thành công",
      description: "Địa chỉ đã được cập nhật",
    });
  };

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id);
    const remainingAddresses = addresses.filter((addr) => addr.id !== id);

    // If deleting default address and there are other addresses, make the first one default
    if (addressToDelete?.isDefault && remainingAddresses.length > 0) {
      remainingAddresses[0].isDefault = true;
    }

    setAddresses(remainingAddresses);
    toast({
      title: "Thành công",
      description: "Địa chỉ đã được xóa",
    });
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    toast({
      title: "Thành công",
      description: "Đã đặt làm địa chỉ mặc định",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quản lý địa chỉ
            </h1>
            <p className="text-gray-600">
              Quản lý các địa chỉ giao hàng của bạn
            </p>
          </div>

          {/* Add Address Button */}
          <div className="mb-6">
            <Button
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/80"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm địa chỉ mới
            </Button>
          </div>

          {/* Address Form */}
          {(showForm || editingAddress) && (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressForm
                    initialData={editingAddress}
                    onSubmit={
                      editingAddress ? handleEditAddress : handleAddAddress
                    }
                    onCancel={() => {
                      setShowForm(false);
                      setEditingAddress(null);
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Address List */}
          <div className="space-y-4">
            {addresses.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chưa có địa chỉ nào
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thêm địa chỉ để sử dụng khi đặt dịch vụ
                  </p>
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm địa chỉ đầu tiên
                  </Button>
                </CardContent>
              </Card>
            ) : (
              addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={() => setEditingAddress(address)}
                  onDelete={() => handleDeleteAddress(address.id)}
                  onSetDefault={() => handleSetDefault(address.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default AddressManagement;
