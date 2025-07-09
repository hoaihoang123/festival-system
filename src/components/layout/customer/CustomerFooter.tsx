import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export const CustomerFooter: React.FC = () => (
  <footer className="bg-[#181C2A] text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4 pr-20">
          <h3 className="text-2xl font-bold" style={{ color: "#FF5630" }}>
            PartyPro
          </h3>
          <p className="text-gray-300 max-w-xxs">
            Dịch vụ tổ chức tiệc chuyên nghiệp, tạo nên những khoảnh khắc đáng
            nhớ cho mọi sự kiện của bạn.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-[#FF5630] transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#FF5630] transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#FF5630] transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Liên kết nhanh</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-[#FF5630] transition-colors"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-gray-300 hover:text-[#FF5630] transition-colors"
              >
                Dịch vụ tiệc
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                className="text-gray-300 hover:text-[#FF5630] transition-colors"
              >
                Đặt tiệc
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="text-gray-300 hover:text-[#FF5630] transition-colors"
              >
                Lịch sử
              </Link>
            </li>
          </ul>
        </div>
        {/* Services */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Dịch vụ</h4>
          <ul className="space-y-2">
            <li className="text-gray-300">Tiệc cưới</li>
            <li className="text-gray-300">Tiệc sinh nhật</li>
            <li className="text-gray-300">Sự kiện doanh nghiệp</li>
            <li className="text-gray-300">Tiệc thôi nôi</li>
            <li className="text-gray-300">Lễ kỷ niệm</li>
          </ul>
        </div>
        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Liên hệ</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" style={{ color: "#FF5630" }} />
              <span className="text-gray-300">0123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" style={{ color: "#FF5630" }} />
              <span className="text-gray-300">info@partypro.vn</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" style={{ color: "#FF5630" }} />
              <span className="text-gray-300">
                123 Đường ABC, Quận 1, TP.HCM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
