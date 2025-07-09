import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Star, MapPin, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  features: string[];
  location?: string;
  capacity?: string;
  duration?: string;
}

interface ServiceCardProps {
  service: Service;
  viewType: "grid" | "list";
  animationDelay?: number;
}

const ServiceCard = ({
  service,
  viewType,
  animationDelay = 0,
}: ServiceCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      wedding: "Tiệc cưới",
      birthday: "Sinh nhật",
      corporate: "Doanh nghiệp",
      anniversary: "Kỷ niệm",
      conference: "Hội nghị",
    };
    return categories[category as keyof typeof categories] || category;
  };

  if (viewType === "list") {
    return (
      <Card
        className="group hover:shadow-xl transition-all duration-300 animate-fade-in"
        style={{ animationDelay: `${animationDelay}s` }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center text-sm font-semibold text-gray-800">
              <Star className="h-3 w-3 text-yellow-400 mr-1" />
              {service.rating}
            </div>
            <Badge className="absolute top-4 left-4 bg-gradient-primary">
              {getCategoryLabel(service.category)}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[hsl(var(--hero-btn))] transition-colors mb-2">
                  {service.title}
                </CardTitle>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Service Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 text-sm text-gray-500">
                  {service.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {service.location}
                    </div>
                  )}
                  {service.capacity && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {service.capacity}
                    </div>
                  )}
                  {service.duration && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {service.duration}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{service.features.length - 3} khác
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gradient">
                    {formatPrice(service.price)}
                  </span>
                  <div className="text-sm text-gray-500">
                    ({service.reviews} đánh giá)
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/services/${service.id}`}>Chi tiết</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Link to="/booking">Đặt ngay</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (default)
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center text-sm font-semibold text-gray-800">
          <Star className="h-3 w-3 text-yellow-400 mr-1" />
          {service.rating}
        </div>
        <Badge className="absolute top-4 left-4 bg-gradient-primary">
          {getCategoryLabel(service.category)}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-[hsl(var(--hero-btn))] transition-colors">
          {service.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

        {/* Service Info */}
        <div className="grid grid-cols-1 gap-1 mb-4 text-sm text-gray-500">
          {service.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {service.location}
            </div>
          )}
          {service.capacity && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {service.capacity}
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {service.features.slice(0, 2).map((feature, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {service.features.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{service.features.length - 2} khác
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gradient">
            {formatPrice(service.price)}
          </span>
          <span className="text-sm text-gray-500">
            ({service.reviews} đánh giá)
          </span>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
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
  );
};

export default ServiceCard;
