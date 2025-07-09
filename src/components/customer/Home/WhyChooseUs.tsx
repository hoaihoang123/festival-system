import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Award, Users, Clock, Heart, Star, Shield } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Chuyên Nghiệp",
      description:
        "Đội ngũ có kinh nghiệm hơn 10 năm trong ngành tổ chức sự kiện",
    },
    {
      icon: Users,
      title: "Đội Ngũ Tận Tâm",
      description:
        "Nhân viên được đào tạo bài bản, phục vụ chu đáo từng chi tiết",
    },
    {
      icon: Clock,
      title: "Đúng Giờ",
      description:
        "Cam kết thực hiện đúng tiến độ, không để khách hàng phải chờ đợi",
    },
    {
      icon: Heart,
      title: "Tận Tình",
      description: "Luôn lắng nghe và thấu hiểu nhu cầu của từng khách hàng",
    },
    {
      icon: Star,
      title: "Chất Lượng Cao",
      description: "Sử dụng thiết bị hiện đại, nguyên liệu tươi ngon nhất",
    },
    {
      icon: Shield,
      title: "Uy Tín",
      description: "Được hàng nghìn khách hàng tin tưởng và giới thiệu",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn <span className="text-gradient">PartyPro</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi mang đến trải nghiệm tổ chức tiệc hoàn hảo với những giá
            trị cốt lõi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gray-50 hover:bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-primary rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div
              className="animate-bounce-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Tiệc đã tổ chức</div>
            </div>
            <div
              className="animate-bounce-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-white/80">Khách hàng hài lòng</div>
            </div>
            <div
              className="animate-bounce-in"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-white/80">Năm kinh nghiệm</div>
            </div>
            <div
              className="animate-bounce-in"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Hỗ trợ khách hàng</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
