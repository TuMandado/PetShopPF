import React from "react";
import Announcement from "../../components/announcement/Announcement";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Slider from "../../components/slider/Slider";
import Categories from "../../components/Categories/Categories";
import SectionToPets from "../../components/sectionToPets/SectionToPets";

const home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <SectionToPets />
      <Footer />
    </div>
  );
};

export default home;
