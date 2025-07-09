import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

const FeaturedServices = () => {
  const services = [
    {
      id: 1,
      title: "Tiệc Cưới Trọn Gói",
      description:
        "Dịch vụ tổ chức tiệc cưới hoàn hảo với đầy đủ trang trí, âm thanh ánh sáng",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "15,000,000",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Tiệc Sinh Nhật VIP",
      description:
        "Tổ chức sinh nhật đẳng cấp với theme độc đáo và menu đa dạng",
      image:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "5,000,000",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Sự Kiện Công Ty",
      description:
        "Tổ chức hội nghị, gala dinner và các sự kiện doanh nghiệp chuyên nghiệp",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "20,000,000",
      rating: 4.9,
    },
    {
      id: 4,
      title: "Tiệc Cocktail",
      description:
        "Không gian tiệc cocktail sang trọng với bartender chuyên nghiệp",
      image:
        "https://images.unsplash.com/photo-1558618047-b2194d4c7add?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "8,000,000",
      rating: 4.7,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {" "}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dịch Vụ <span className="text-gradient">Nổi Bật</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các gói dịch vụ tổ chức tiệc được yêu thích nhất tại
            PartyPro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-semibold text-gray-800">
                  {"\u2b50"} {service.rating}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[hsl(var(--hero-btn))] transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gradient">
                    {service.price}₫
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Link to={`/services/${service.id}`}>Chi tiết</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                  >
                    <Link to="/booking">Đặt ngay</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[hsl(var(--hero-btn))] text-[hsl(var(--hero-btn))] hover:bg-[hsl(var(--hero-btn))] hover:text-white px-8"
          >
            <Link to="/services">Xem tất cả dịch vụ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
