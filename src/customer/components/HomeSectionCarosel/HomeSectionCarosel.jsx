import React, { useRef, useState, useEffect } from "react";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const HomeSectionCarosel = ({
  data,
  sectionName,
  category,
}) => {

  const sliderRef = useRef(null);

  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);


  // PRODUCTS
  const items = data.slice(0, 10).map((item, index) => (

    <div
      key={index}
      className="flex-shrink-0"
    >

      <HomeSectionCard
        product={item}
        category={category}
      />

    </div>

  ));


  // =========================
  // CHECK BUTTONS
  // =========================

  const checkButtons = () => {

    const slider = sliderRef.current;

    if (!slider) return;

    setIsFirst(
      slider.scrollLeft <= 0
    );

    setIsLast(
      slider.scrollLeft + slider.clientWidth >=
      slider.scrollWidth - 5
    );
  };


  useEffect(() => {

    checkButtons();

  }, [data]);


  // =========================
  // NEXT
  // =========================

  const slideNext = () => {

    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });

    setTimeout(
      checkButtons,
      350
    );
  };


  // =========================
  // PREVIOUS
  // =========================

  const slidePrev = () => {

    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });

    setTimeout(
      checkButtons,
      350
    );
  };


  // =========================
  // RETURN
  // =========================

  return (

    <div className="relative px-5 py-5">

      {/* Heading */}

      <h2 className="text-2xl font-extrabold text-gray-800 py-5">
        {sectionName}
      </h2>


      {/* LEFT BUTTON */}

      {!isFirst && (

        <Button
          variant="contained"
          onClick={slidePrev}
          sx={{
            position: "absolute",
            left: "0",
            top: "55%",
            transform: "translateY(-50%)",
            bgcolor: "white",
            color: "black",
            minWidth: "45px",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            zIndex: 10,
            boxShadow: 3,

            "&:hover": {
              bgcolor: "white",
            },
          }}
        >

          <KeyboardArrowLeftIcon />

        </Button>

      )}


      {/* PRODUCTS */}

      <div
        ref={sliderRef}
        onScroll={checkButtons}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      >

        {items}

      </div>


      {/* RIGHT BUTTON */}

      {!isLast && (

        <Button
          variant="contained"
          onClick={slideNext}
          sx={{
            position: "absolute",
            right: "0",
            top: "55%",
            transform: "translateY(-50%)",
            bgcolor: "white",
            color: "black",
            minWidth: "45px",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            zIndex: 10,
            boxShadow: 3,

            "&:hover": {
              bgcolor: "white",
            },
          }}
        >

          <KeyboardArrowLeftIcon
            sx={{
              transform: "rotate(180deg)",
            }}
          />

        </Button>

      )}

    </div>
  );
};

export default HomeSectionCarosel;