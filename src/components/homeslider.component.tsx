import Img, { FixedObject, FluidObject } from "gatsby-image";
import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const HomeSlider = ({
  images,
}: {
  images: Array<FixedObject | FluidObject>,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
  } as Settings;
  return (
    <Slider {...settings}>
      {images.map((image) =>
        "aspectRatio" in image ? <Img fluid={image} /> : <Img fixed={image} />,
      )}
    </Slider>
  );
};

export default HomeSlider;
