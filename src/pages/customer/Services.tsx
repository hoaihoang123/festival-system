import React, { useState, useEffect, useMemo } from "react";
import SearchFilters, {
  FilterState,
} from "../../components/Services/SearchFilters";
import ServiceCard, { Service } from "../../components/Services/ServiceCard";
// import ServiceListSkeleton nếu có
import { Filter } from "lucide-react";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    category: "all",
    priceRange: [0, 50000000],
    location: "",
    dateRange: undefined,
    guestCount: "all",
    sortBy: "name",
    viewType: "grid",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mock services data
  const services: Service[] = [
    {
      id: 1,
      title: "Tiệc Cưới Cổ Điển",
      description:
        "Tổ chức tiệc cưới theo phong cách cổ điển với không gian trang nhã",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 15000000,
      category: "wedding",
      rating: 4.9,
      reviews: 45,
      features: [
        "Trang trí hoa tươi",
        "Âm thanh ánh sáng",
        "MC chuyên nghiệp",
        "Photo & Video",
      ],
      location: "Hà Nội",
      capacity: "100-200 khách",
      duration: "6-8 giờ",
    },
    {
      id: 2,
      title: "Tiệc Cưới Hiện Đại",
      description:
        "Phong cách hiện đại với công nghệ LED và hiệu ứng ánh sáng đẳng cấp",
      image:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 25000000,
      category: "wedding",
      rating: 4.8,
      reviews: 32,
      features: [
        "LED Wall",
        "Hiệu ứng ánh sáng",
        "DJ chuyên nghiệp",
        "Drone quay phim",
      ],
      location: "TP. Hồ Chí Minh",
      capacity: "150-300 khách",
      duration: "8-10 giờ",
    },
    {
      id: 3,
      title: "Sinh Nhật Trẻ Em",
      description:
        "Tiệc sinh nhật vui nhộn dành cho các bé với nhiều trò chơi hấp dẫn",
      image:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 3000000,
      category: "birthday",
      rating: 4.7,
      reviews: 68,
      features: ["Khu vui chơi", "Mascot", "Quà tặng", "Bánh sinh nhật"],
      location: "Đà Nẵng",
      capacity: "20-50 khách",
      duration: "3-4 giờ",
    },
    {
      id: 4,
      title: "Sinh Nhật Người Lớn",
      description:
        "Tổ chức sinh nhật thanh lịch cho người lớn với không gian ấm cúng",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 5000000,
      category: "birthday",
      rating: 4.6,
      reviews: 29,
      features: ["Trang trí chủ đề", "Menu cao cấp", "Cocktail", "Live music"],
      location: "Hà Nội",
      capacity: "30-80 khách",
      duration: "4-6 giờ",
    },
    {
      id: 5,
      title: "Hội Nghị Doanh Nghiệp",
      description: "Tổ chức hội nghị chuyên nghiệp với đầy đủ thiết bị hỗ trợ",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 12000000,
      category: "corporate",
      rating: 4.9,
      reviews: 21,
      features: [
        "Máy chiếu 4K",
        "Hệ thống âm thanh",
        "Wifi tốc độ cao",
        "Coffee break",
      ],
      location: "TP. Hồ Chí Minh",
      capacity: "50-200 khách",
      duration: "Cả ngày",
    },
    {
      id: 6,
      title: "Gala Dinner",
      description: "Tổ chức gala dinner sang trọng cho các sự kiện quan trọng",
      image:
        "https://images.unsplash.com/photo-1558618047-b2194d4c7add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 30000000,
      category: "corporate",
      rating: 5.0,
      reviews: 15,
      features: [
        "Menu 7 món",
        "Rượu vang cao cấp",
        "Band nhạc",
        "Trang trí xa hoa",
      ],
      location: "Hà Nội",
      capacity: "100-500 khách",
      duration: "5-7 giờ",
    },
    {
      id: 7,
      title: "Tiệc Kỷ Niệm Ngành",
      description: "Tổ chức tiệc kỷ niệm cho các doanh nghiệp và tổ chức",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 18000000,
      category: "anniversary",
      rating: 4.7,
      reviews: 24,
      features: [
        "Chương trình biểu diễn",
        "Quà lưu niệm",
        "Buffet cao cấp",
        "Photo booth",
      ],
      location: "Cần Thơ",
      capacity: "80-150 khách",
      duration: "4-6 giờ",
    },
    {
      id: 8,
      title: "Hội Nghị Quốc Tế",
      description: "Tổ chức hội nghị quốc tế với dịch thuật đồng thời",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 45000000,
      category: "conference",
      rating: 4.9,
      reviews: 12,
      features: [
        "Dịch thuật đồng thời",
        "Hệ thống conference",
        "Live streaming",
        "Recording",
      ],
      location: "TP. Hồ Chí Minh",
      capacity: "200-1000 khách",
      duration: "1-3 ngày",
    },
  ];

  const filteredAndSortedServices = useMemo(() => {
    const filtered = services.filter((service) => {
      // Search term filter
      const matchesSearch =
        !filters.searchTerm ||
        service.title
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        service.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        service.features.some((feature) =>
          feature.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      // Category filter
      const matchesCategory =
        filters.category === "all" || service.category === filters.category;
      // Price range filter
      const matchesPrice =
        service.price >= filters.priceRange[0] &&
        service.price <= filters.priceRange[1];
      // Location filter
      const matchesLocation =
        !filters.location || service.location === filters.location;
      // Guest count filter (mock logic)
      const matchesGuest = true;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesLocation &&
        matchesGuest
      );
    });
    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return b.reviews - a.reviews;
        case "newest":
          return b.id - a.id;
        default:
          return a.title.localeCompare(b.title);
      }
    });
    return filtered;
  }, [services, filters]);

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dịch Vụ <span className="text-gradient">Tổ Chức Tiệc</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá đa dạng các gói dịch vụ tổ chức tiệc chuyên nghiệp
            </p>
          </div>
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            isLoading={isLoading}
            resultCount={filteredAndSortedServices.length}
          />
          {/* Loading State */}
          {isLoading ? (
            <div className="py-12 text-center text-gray-400">Đang tải...</div>
          ) : (
            <>
              {/* Services Grid/List */}
              <div
                className={
                  filters.viewType === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredAndSortedServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    viewType={filters.viewType}
                    animationDelay={index * 0.1}
                  />
                ))}
              </div>
              {/* No results */}
              {filteredAndSortedServices.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Không tìm thấy dịch vụ nào
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Services;
