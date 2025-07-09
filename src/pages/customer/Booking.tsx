import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Edit2,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";

interface Address {
  id: number;
  name: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  isDefault: boolean;
}

interface Service {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface BookingData {
  selectedServices: { serviceId: number; quantity: number }[];
  eventDate: Date | undefined;
  guestCount: number;
  specialNotes: string;
  menuRequirements: string;
  paymentMethod: string;
  selectedAddress: Address | null;
  isEditing: boolean;
}

const mockServices: Service[] = [
  {
    id: 1,
    name: "Tiệc cưới cổ điển",
    price: 15000000,
    image: "/placeholder.svg",
    description: "Trang trí cưới sang trọng với hoa tươi và ánh nến",
  },
  {
    id: 2,
    name: "Tiệc sinh nhật trẻ em",
    price: 5000000,
    image: "/placeholder.svg",
    description: "Tiệc sinh nhật vui nhộn với chủ đề hoạt hình",
  },
  {
    id: 3,
    name: "Sự kiện doanh nghiệp",
    price: 20000000,
    image: "/placeholder.svg",
    description: "Tổ chức sự kiện chuyên nghiệp cho doanh nghiệp",
  },
];

const mockAddresses: Address[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0123456789",
    address: "123 Đường ABC",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    phone: "0987654321",
    address: "456 Đường XYZ",
    district: "Quận 2",
    city: "TP. Hồ Chí Minh",
    isDefault: false,
  },
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedServices: [],
    eventDate: undefined,
    guestCount: 0,
    specialNotes: "",
    menuRequirements: "",
    paymentMethod: "",
    selectedAddress: null,
    isEditing: false,
  });
  const { toast } = useToast();

  // Set default address on component mount
  useEffect(() => {
    const defaultAddress = mockAddresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      setBookingData((prev) => ({ ...prev, selectedAddress: defaultAddress }));
    }
  }, []);

  const handleAddressChange = (addressId: number) => {
    const selectedAddress = mockAddresses.find((addr) => addr.id === addressId);
    if (selectedAddress) {
      setBookingData((prev) => ({ ...prev, selectedAddress }));
    }
  };

  const handleEditBooking = () => {
    setBookingData((prev) => ({ ...prev, isEditing: true }));
    setCurrentStep(1);
  };

  const handlePreviewEmail = () => {
    // Mock email preview
    const emailContent = `
      Kính gửi ${bookingData.selectedAddress?.name},

      Cảm ơn bạn đã đặt tiệc tại PartyPro. Dưới đây là thông tin đặt tiệc của bạn:

      Mã đặt tiệc: BK${Date.now()}
      Ngày tổ chức: ${
        bookingData.eventDate
          ? format(bookingData.eventDate, "dd/MM/yyyy")
          : "Chưa chọn"
      }
      Số lượng khách: ${bookingData.guestCount} người
      Địa chỉ: ${bookingData.selectedAddress?.address}, ${
      bookingData.selectedAddress?.district
    }, ${bookingData.selectedAddress?.city}

      Dịch vụ đã chọn:
      ${bookingData.selectedServices
        .map((item) => {
          const service = mockServices.find((s) => s.id === item.serviceId);
          return service
            ? `- ${service.name} x ${item.quantity}: ${(
                service.price * item.quantity
              ).toLocaleString("vi-VN")} VNĐ`
            : "";
        })
        .join("\n")}

      Tổng cộng: ${calculateTotal().toLocaleString("vi-VN")} VNĐ

      Ghi chú đặc biệt: ${bookingData.specialNotes || "Không có"}
      Yêu cầu về menu: ${bookingData.menuRequirements || "Không có"}

      Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận đơn đặt tiệc.

      Trân trọng,
      PartyPro Team
    `;

    toast({
      title: "Xem trước email xác nhận",
      description: "Email xác nhận đã được tạo",
    });

    // In thực tế, bạn có thể hiển thị email trong một modal
    console.log(emailContent);
  };

  const handleServiceQuantityChange = (serviceId: number, quantity: number) => {
    setBookingData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices
        .map((item) =>
          item.serviceId === serviceId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
        .concat(
          quantity > 0 &&
            !prev.selectedServices.find((item) => item.serviceId === serviceId)
            ? [{ serviceId, quantity }]
            : []
        ),
    }));
  };

  const calculateTotal = () => {
    return bookingData.selectedServices.reduce((total, item) => {
      const service = mockServices.find((s) => s.id === item.serviceId);
      return total + (service ? service.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = () => {
    console.log("Booking submitted:", bookingData);
    // Handle booking submission
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chọn dịch vụ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockServices.map((service) => {
          const selectedItem = bookingData.selectedServices.find(
            (item) => item.serviceId === service.id
          );
          const quantity = selectedItem?.quantity || 0;

          return (
            <Card
              key={service.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
                <p className="text-xl font-bold text-[hsl(var(--hero-btn))]">
                  {service.price.toLocaleString("vi-VN")} VNĐ
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`quantity-${service.id}`}>Số lượng:</Label>
                  <Input
                    id={`quantity-${service.id}`}
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) =>
                      handleServiceQuantityChange(
                        service.id,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="focus-visible:ring-black/50 focus-visible:border-black/10 w-20"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {bookingData.selectedServices.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Tổng kết đơn hàng</h3>
            <div className="space-y-2">
              {bookingData.selectedServices.map((item) => {
                const service = mockServices.find(
                  (s) => s.id === item.serviceId
                );
                return service ? (
                  <div key={item.serviceId} className="flex justify-between">
                    <span>
                      {service.name} x {item.quantity}
                    </span>
                    <span>
                      {(service.price * item.quantity).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </span>
                  </div>
                ) : null;
              })}
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng:</span>
                  <span className="text-[hsl(var(--hero-btn))]">
                    {calculateTotal().toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Thông tin tiệc</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Ngày tổ chức tiệc</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !bookingData.eventDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bookingData.eventDate
                  ? format(bookingData.eventDate, "dd/MM/yyyy")
                  : "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={bookingData.eventDate}
                onSelect={(date) =>
                  setBookingData((prev) => ({ ...prev, eventDate: date }))
                }
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
                classNames={{
                  day_selected:
                    "bg-[hsl(var(--hero-btn))] text-white hover:bg-[hsl(var(--hero-btn))]/90 focus:bg-[hsl(var(--hero-btn))] focus:text-white",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="guestCount">Số lượng khách</Label>
          <Input
            id="guestCount"
            type="number"
            min="1"
            value={bookingData.guestCount || ""}
            onChange={(e) =>
              setBookingData((prev) => ({
                ...prev,
                guestCount: parseInt(e.target.value) || 0,
              }))
            }
            placeholder="Nhập số lượng khách"
            className="focus-visible:ring-black/50 focus-visible:border-black/10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Địa chỉ tổ chức</Label>
        <Select
          value={bookingData.selectedAddress?.id.toString()}
          onValueChange={(value) => handleAddressChange(parseInt(value))}
        >
          <SelectTrigger className="flex items-center gap-2 min-h-[48px] focus:ring-black/50 focus:border-black/10">
            <MapPin className="mr-2 h-5 w-5 text-muted-foreground flex items-center gap-2 min-h-[48px] focus:ring-black/50 focus:border-black/10" />
            <div className="flex flex-col text-left w-full">
              {bookingData.selectedAddress ? (
                <>
                  <span className="font-bold text-base leading-tight">
                    {bookingData.selectedAddress.name} -{" "}
                    {bookingData.selectedAddress.phone}
                  </span>
                  <span className="text-sm text-muted-foreground leading-tight">
                    {bookingData.selectedAddress.address},{" "}
                    {bookingData.selectedAddress.district},{" "}
                    {bookingData.selectedAddress.city}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">Chọn địa chỉ</span>
              )}
            </div>
          </SelectTrigger>
          <SelectContent>
            {mockAddresses.map((address) => (
              <SelectItem key={address.id} value={address.id.toString()}>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <div>
                    <div className="font-medium">
                      {address.name} - {address.phone}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {address.address}, {address.district}, {address.city}
                    </div>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="link"
          className="p-0 h-auto text-[hsl(var(--hero-btn))]"
          asChild
        >
          <Link to="/addresses">+ Thêm địa chỉ mới</Link>
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialNotes">Ghi chú đặc biệt</Label>
        <Textarea
          id="specialNotes"
          value={bookingData.specialNotes}
          onChange={(e) =>
            setBookingData((prev) => ({
              ...prev,
              specialNotes: e.target.value,
            }))
          }
          placeholder="Nhập các yêu cầu đặc biệt..."
          rows={4}
          className="focus-visible:ring-black/50 focus-visible:border-black/10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="menuRequirements">Yêu cầu về menu</Label>
        <Textarea
          id="menuRequirements"
          value={bookingData.menuRequirements}
          onChange={(e) =>
            setBookingData((prev) => ({
              ...prev,
              menuRequirements: e.target.value,
            }))
          }
          placeholder="Nhập yêu cầu về menu, dị ứng thực phẩm..."
          rows={3}
          className="focus-visible:ring-black/50 focus-visible:border-black/10"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Xác nhận đặt tiệc</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEditBooking}>
            <Edit2 className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Xem email xác nhận
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl ">
              <DialogHeader>
                <DialogTitle>Email xác nhận đặt tiệc</DialogTitle>
              </DialogHeader>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap font-mono text-sm">
                {`Kính gửi ${bookingData.selectedAddress?.name},

                    Cảm ơn bạn đã đặt tiệc tại PartyPro. Dưới đây là thông tin đặt tiệc của bạn:

                    Mã đặt tiệc: BK${Date.now()}
                    Ngày tổ chức: ${
                      bookingData.eventDate
                        ? format(bookingData.eventDate, "dd/MM/yyyy")
                        : "Chưa chọn"
                    }
                    Số lượng khách: ${bookingData.guestCount} người
                    Địa chỉ: ${bookingData.selectedAddress?.address}, ${
                  bookingData.selectedAddress?.district
                }, ${bookingData.selectedAddress?.city}

                    Dịch vụ đã chọn:
                    ${bookingData.selectedServices
                      .map((item) => {
                        const service = mockServices.find(
                          (s) => s.id === item.serviceId
                        );
                        return service
                          ? `- ${service.name} x ${item.quantity}: ${(
                              service.price * item.quantity
                            ).toLocaleString("vi-VN")} VNĐ`
                          : "";
                      })
                      .join("\n")}

                    Tổng cộng: ${calculateTotal().toLocaleString("vi-VN")} VNĐ

                    Ghi chú đặc biệt: ${bookingData.specialNotes || "Không có"}
                    Yêu cầu về menu: ${
                      bookingData.menuRequirements || "Không có"
                    }

                    Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận đơn đặt tiệc.

                    Trân trọng,
                    PartyPro Team`}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tổng kết đơn hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Dịch vụ đã chọn:</h4>
            {bookingData.selectedServices.map((item) => {
              const service = mockServices.find((s) => s.id === item.serviceId);
              return service ? (
                <div key={item.serviceId} className="flex justify-between py-1">
                  <span>
                    {service.name} x {item.quantity}
                  </span>
                  <span>
                    {(service.price * item.quantity).toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </span>
                </div>
              ) : null;
            })}
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Ngày tổ chức:</strong>{" "}
                  {bookingData.eventDate
                    ? format(bookingData.eventDate, "dd/MM/yyyy")
                    : "Chưa chọn"}
                </p>
                <p>
                  <strong>Số lượng khách:</strong> {bookingData.guestCount}{" "}
                  người
                </p>
                <p>
                  <strong>Địa chỉ:</strong>{" "}
                  {bookingData.selectedAddress
                    ? `${bookingData.selectedAddress.address}, ${bookingData.selectedAddress.district}, ${bookingData.selectedAddress.city}`
                    : "Chưa chọn"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Ghi chú:</strong>{" "}
                  {bookingData.specialNotes || "Không có"}
                </p>
                <p>
                  <strong>Yêu cầu menu:</strong>{" "}
                  {bookingData.menuRequirements || "Không có"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Tổng cộng:</span>
              <span className="text-[hsl(var(--hero-btn))]">
                {calculateTotal().toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 ">
            {[
              "Thanh toán khi nhận hàng",
              "Chuyển khoản ngân hàng",
              "Ví điện tử MoMo",
              "Thẻ tín dụng",
            ].map((method) => (
              <div key={method} className="flex items-center space-x-2">
                <Checkbox
                  id={method}
                  checked={bookingData.paymentMethod === method}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setBookingData((prev) => ({
                        ...prev,
                        paymentMethod: method,
                      }));
                    }
                  }}
                  className="border-[hsl(var(--hero-btn))] data-[state=checked]:bg-[hsl(var(--hero-btn))] data-[state=checked]:border-[hsl(var(--hero-btn))] focus-visible:ring-[hsl(var(--hero-btn))]"
                />
                <Label htmlFor={method}>{method}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between w-full max-w-md mx-auto">
              {[1, 2, 3].map((step, idx) => (
                <React.Fragment key={step}>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0",
                      currentStep >= step
                        ? "bg-[hsl(var(--hero-btn))] text-white"
                        : "bg-gray-200 text-gray-600"
                    )}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={cn(
                        "flex-1 h-1 mx-2",
                        currentStep > step
                          ? "bg-[hsl(var(--hero-btn))]"
                          : "bg-gray-200"
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <p className="text-sm text-gray-600">
                Bước {currentStep}/3:{" "}
                {currentStep === 1
                  ? "Chọn dịch vụ"
                  : currentStep === 2
                  ? "Thông tin tiệc"
                  : "Xác nhận đặt tiệc"}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>

            {currentStep < 3 ? (
              <Button
                className="bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/90"
                onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
                disabled={
                  (currentStep === 1 &&
                    bookingData.selectedServices.length === 0) ||
                  (currentStep === 2 &&
                    (!bookingData.eventDate || bookingData.guestCount === 0))
                }
              >
                Tiếp tục
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!bookingData.paymentMethod}
                className="bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/90"
              >
                Xác nhận đặt tiệc
              </Button>
            )}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Booking;
