import React from "react";
import HeroSection from "../../components/customer/Home/HeroSection";
import FeaturedServices from "../../components/customer/Home/FeaturedServices";
import WhyChooseUs from "../../components/customer/Home/WhyChooseUs";
import { CustomerLayout } from "@/components/layout/customer/CustomerLayout";

const Home = () => {
  return (
    <CustomerLayout>
      <HeroSection />
      <FeaturedServices />
      <WhyChooseUs />
    </CustomerLayout>
  );
};

export default Home;
 