import React from "react";
import { useNavigate } from "react-router-dom";
import { mainCarouselData } from "./MainCaroselData";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const MainCrosel = () => {
  const navigate = useNavigate();

  const items = mainCarouselData.map((item, index) => (
    <img
      key={index}
      className="cursor-pointer w-full"
      role="presentation"
      src={item.image}
      alt=""
      onClick={() => navigate("/products/women_saree")}
    />
  ));

  return (
    <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={2000}
      infinite
    />
  );
};

export default MainCrosel;