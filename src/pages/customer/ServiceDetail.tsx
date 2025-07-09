import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Heart,
  Share2,
  MessageSquare,
  BarChart2,
  Upload,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";

interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  likes: number;
  replies?: {
    id: number;
    userName: string;
    comment: string;
    date: string;
  }[];
}

interface ComparisonService {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  features: string[];
  duration: string;
  capacity: string;
  location: string;
}

const ServiceDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showComparisonDialog, setShowComparisonDialog] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ComparisonService[]>(
    []
  );
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
    images: [] as string[],
  });

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      userId: 1,
      userName: "Nguyễn Văn A",
      userAvatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      comment:
        "Dịch vụ rất tuyệt vời! Nhân viên phục vụ chuyên nghiệp, không gian đẹp và ấm cúng. Chắc chắn sẽ quay lại.",
      date: "2024-03-15",
      likes: 12,
      images: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      replies: [
        {
          id: 1,
          userName: "PartyPro Support",
          comment: "Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!",
          date: "2024-03-15",
        },
      ],
    },
    {
      id: 2,
      userId: 2,
      userName: "Trần Thị B",
      userAvatar: "https://i.pravatar.cc/150?img=2",
      rating: 4,
      comment:
        "Dịch vụ tốt, giá cả hợp lý. Tuy nhiên cần cải thiện thêm về thời gian phục vụ.",
      date: "2024-03-10",
      likes: 8,
    },
  ];

  // Mock comparison services
  const comparisonServices: ComparisonService[] = [
    {
      id: 2,
      title: "Tiệc Cưới Hiện Đại",
      price: 25000000,
      rating: 4.8,
      reviews: 32,
      features: [
        "LED Wall",
        "Hiệu ứng ánh sáng",
        "DJ chuyên nghiệp",
        "Drone quay phim",
      ],
      duration: "8-10 giờ",
      capacity: "150-300 khách",
      location: "TP. Hồ Chí Minh",
    },
    {
      id: 3,
      title: "Tiệc Cưới Sang Trọng",
      price: 35000000,
      rating: 4.9,
      reviews: 28,
      features: [
        "Sảnh tiệc VIP",
        "Menu cao cấp",
        "Ban nhạc sống",
        "Quay phim chuyên nghiệp",
      ],
      duration: "10-12 giờ",
      capacity: "200-400 khách",
      location: "Hà Nội",
    },
  ];

  // Mock data - trong thực tế sẽ fetch từ API
  const service = {
    id: parseInt(id || "1"),
    title: "Tiệc Cưới Cổ Điển",
    description:
      "Tổ chức tiệc cưới theo phong cách cổ điển với không gian trang nhã, lãng mạn. Chúng tôi mang đến cho bạn một đám cưới trong mơ với dịch vụ hoàn hảo từ A đến Z.",
    longDescription:
      "Dịch vụ tiệc cưới cổ điển của chúng tôi được thiết kế dành riêng cho những cặp đôi yêu thích vẻ đẹp truyền thống và thanh lịch. Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi sẽ biến giấc mơ đám cưới của bạn thành hiện thực.",
    images: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    price: 15000000,
    category: "wedding",
    rating: 4.9,
    reviews: 45,
    duration: "8-10 giờ",
    capacity: "50-200 khách",
    location: "TP. Hồ Chí Minh",
    features: [
      "Trang trí hoa tươi cao cấp",
      "Hệ thống âm thanh ánh sáng chuyên nghiệp",
      "MC dẫn chương trình giàu kinh nghiệm",
      "Photo & Video wedding",
      "Menu buffet/set menu đa dạng",
      "Dịch vụ trang điểm cô dâu",
      "Xe hoa và trang trí xe",
      "Bánh cưới 3 tầng",
    ],
    includes: [
      "Trang trí sảnh tiệc theo chủ đề",
      "Bàn ghế cao cấp cho 200 khách",
      "Hệ thống âm thanh, micro không dây",
      "Đèn LED trang trí và spotlight",
      "MC chuyên nghiệp dẫn chương trình",
      "Photographer chụp ảnh sự kiện",
      "Menu buffet 8 món chính + tráng miệng",
      "Nước uống không giới hạn",
    ],
    policies: [
      "Đặt cọc 30% giá trị hợp đồng khi ký",
      "Thanh toán 70% còn lại trước ngày tổ chức 3 ngày",
      "Miễn phí thay đổi thông tin trong vòng 7 ngày",
      "Hoàn tiền 50% nếu hủy trước 15 ngày",
      "Không hoàn tiền nếu hủy trong vòng 7 ngày",
    ],
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const handleBookNow = () => {
    toast({
      title: "Chuyển hướng đặt tiệc",
      description: "Đang chuyển đến trang đặt tiệc...",
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Đã bỏ yêu thích" : "Đã thêm vào yêu thích",
      description: isLiked
        ? "Đã xóa khỏi danh sách yêu thích"
        : "Đã thêm vào danh sách yêu thích",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Đã sao chép link",
      description: "Link dịch vụ đã được sao chép vào clipboard",
    });
  };

  const handleReviewSubmit = () => {
    toast({
      title: "Đánh giá thành công",
      description: "Cảm ơn bạn đã chia sẻ trải nghiệm!",
    });
    setShowReviewDialog(false);
    setReviewForm({ rating: 5, comment: "", images: [] });
  };

  const handleAddToComparison = (service: ComparisonService) => {
    if (selectedServices.find((s) => s.id === service.id)) {
      setSelectedServices((prev) => prev.filter((s) => s.id !== service.id));
    } else {
      if (selectedServices.length < 3) {
        setSelectedServices((prev) => [...prev, service]);
      } else {
        toast({
          title: "Giới hạn so sánh",
          description: "Bạn chỉ có thể so sánh tối đa 3 dịch vụ cùng lúc",
          variant: "destructive",
        });
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setReviewForm((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5), // Giới hạn 5 ảnh
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setReviewForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/services" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Quay lại danh sách dịch vụ
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={service.images[selectedImage]}
                    alt={service.title}
                    className="w-full h-96 sm:h-[500px] object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant={isLiked ? "default" : "secondary"}
                      onClick={handleLike}
                      className={isLiked ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      <Heart
                        className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                      />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Dialog
                      open={showComparisonDialog}
                      onOpenChange={setShowComparisonDialog}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm" variant="secondary">
                          <BarChart2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>So sánh dịch vụ</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {comparisonServices.map((service) => (
                              <Button
                                key={service.id}
                                variant={
                                  selectedServices.find(
                                    (s) => s.id === service.id
                                  )
                                    ? "default"
                                    : "outline"
                                }
                                onClick={() => handleAddToComparison(service)}
                                className="whitespace-nowrap"
                              >
                                {service.title}
                              </Button>
                            ))}
                          </div>

                          {selectedServices.length > 0 && (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Tiêu chí</TableHead>
                                  {selectedServices.map((service) => (
                                    <TableHead key={service.id}>
                                      {service.title}
                                    </TableHead>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Giá</TableCell>
                                  {selectedServices.map((service) => (
                                    <TableCell key={service.id}>
                                      {formatPrice(service.price)}
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell>Đánh giá</TableCell>
                                  {selectedServices.map((service) => (
                                    <TableCell key={service.id}>
                                      <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="ml-1">
                                          {service.rating}
                                        </span>
                                        <span className="text-sm text-gray-500 ml-1">
                                          ({service.reviews})
                                        </span>
                                      </div>
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell>Thời gian</TableCell>
                                  {selectedServices.map((service) => (
                                    <TableCell key={service.id}>
                                      {service.duration}
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell>Sức chứa</TableCell>
                                  {selectedServices.map((service) => (
                                    <TableCell key={service.id}>
                                      {service.capacity}
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell>Địa điểm</TableCell>
                                  {selectedServices.map((service) => (
                                    <TableCell key={service.id}>
                                      {service.location}
                                    </TableCell>
                                  ))}
                                </TableRow>
                                <TableRow>
                                  <TableCell>Tính năng</TableCell>
                                  {selectedServices.map((service) => (
                                    <TableCell key={service.id}>
                                      <ul className="list-disc list-inside">
                                        {service.features.map(
                                          (feature, index) => (
                                            <li key={index} className="text-sm">
                                              {feature}
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableBody>
                            </Table>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Thumbnail images */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {service.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${service.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Details */}
              <div className="mt-8 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Mô tả chi tiết</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {service.longDescription}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tính năng nổi bật</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[hsl(var(--hero-btn))] rounded-full flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bao gồm trong gói</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.includes.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Điều khoản & Chính sách</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {service.policies.map((policy, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {policy}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews Section */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Đánh giá & Nhận xét</CardTitle>
                      <Dialog
                        open={showReviewDialog}
                        onOpenChange={setShowReviewDialog}
                      >
                        <DialogTrigger asChild>
                          <Button className="bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/60">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Viết đánh giá
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Viết đánh giá</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Đánh giá của bạn</Label>
                              <RadioGroup
                                value={reviewForm.rating.toString()}
                                onValueChange={(value) =>
                                  setReviewForm((prev) => ({
                                    ...prev,
                                    rating: parseInt(value),
                                  }))
                                }
                                className="flex gap-4"
                              >
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <div
                                    key={rating}
                                    className="flex items-center gap-1 mr-4"
                                  >
                                    <RadioGroupItem
                                      value={rating.toString()}
                                      id={`rating-${rating}`}
                                      className="border-[hsl(var(--hero-btn))] data-[state=checked]:text-[hsl(var(--hero-btn))] focus-visible:ring-[hsl(var(--hero-btn))] focus-visible:border-[hsl(var(--hero-btn))]"
                                    />
                                    <Label
                                      htmlFor={`rating-${rating}`}
                                      className="flex items-center cursor-pointer"
                                    >
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                      <span className="ml-1">{rating}</span>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="comment">Nhận xét của bạn</Label>
                              <Textarea
                                id="comment"
                                value={reviewForm.comment}
                                onChange={(e) =>
                                  setReviewForm((prev) => ({
                                    ...prev,
                                    comment: e.target.value,
                                  }))
                                }
                                placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                                rows={4}
                                className="focus-visible:ring-[hsl(var(--hero-btn))]/50 focus-visible:border-[hsl(var(--hero-btn))]/10"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Hình ảnh đính kèm (tối đa 5 ảnh)</Label>
                              <div className="grid grid-cols-5 gap-2 ">
                                {reviewForm.images.map((image, index) => (
                                  <div key={index} className="relative group ">
                                    <img
                                      src={image}
                                      alt={`Upload ${index + 1}`}
                                      className="w-full h-20 object-cover rounded-lg "
                                    />
                                    <button
                                      onClick={() => handleRemoveImage(index)}
                                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100  transition-opacity"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                                {reviewForm.images.length < 5 && (
                                  <label className="relative flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      multiple
                                      onChange={handleImageUpload}
                                      className="hidden"
                                    />
                                    <div className="flex flex-col items-center">
                                      <Upload className="h-6 w-6 text-gray-400" />
                                      <span className="text-sm text-gray-500 mt-1">
                                        Thêm ảnh
                                      </span>
                                    </div>
                                  </label>
                                )}
                              </div>
                            </div>
                            <Button
                              onClick={handleReviewSubmit}
                              className="w-full bg-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))]/80"
                            >
                              Gửi đánh giá
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="space-y-4">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.userAvatar} />
                              <AvatarFallback>
                                {review.userName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold">
                                    {review.userName}
                                  </h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${
                                            i < review.rating
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span>{formatDate(review.date)}</span>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Heart className="h-4 w-4 mr-2" />
                                  {review.likes}
                                </Button>
                              </div>
                              <p className="mt-2 text-gray-600">
                                {review.comment}
                              </p>
                              {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 mt-2">
                                  {review.images.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`Review ${review.id} image ${
                                        index + 1
                                      }`}
                                      className="w-20 h-20 rounded-lg object-cover"
                                    />
                                  ))}
                                </div>
                              )}
                              {review.replies && review.replies.length > 0 && (
                                <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-100">
                                  {review.replies.map((reply) => (
                                    <div key={reply.id} className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-semibold">
                                          {reply.userName}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                          {formatDate(reply.date)}
                                        </span>
                                      </div>
                                      <p className="text-gray-600">
                                        {reply.comment}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {service.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">
                              {service.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            ({service.reviews} đánh giá)
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {service.category === "wedding"
                            ? "Tiệc cưới"
                            : "Khác"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-gradient">
                      {formatPrice(service.price)}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Thời gian: {service.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>Sức chứa: {service.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>Khu vực: {service.location}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Button
                        asChild
                        className="w-full bg-gradient-primary hover:opacity-90"
                        size="lg"
                      >
                        <Link to="/booking">Đặt tiệc ngay</Link>
                      </Button>
                      <Button variant="outline" className="w-full" size="lg">
                        <Phone className="h-4 w-4 mr-2" />
                        Gọi tư vấn
                      </Button>
                      <Button variant="outline" className="w-full" size="lg">
                        <Mail className="h-4 w-4 mr-2" />
                        Nhắn tin
                      </Button>
                    </div>

                    <div className="bg-gradient-primary/10 p-3 rounded-lg">
                      <p className="text-sm text-center">
                        💡 <strong>Tip:</strong> Đặt sớm để được giảm giá đến
                        15%!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default ServiceDetail;
