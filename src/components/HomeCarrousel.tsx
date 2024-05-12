import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export function HomeCarrousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const w = 377;

  return (
    <div style={{ height: 182, width: 380, marginTop: 10 }}>
      <Slider arrows={false} {...settings}>
        <div>
          <img
            src="banner1.png"
            style={{ height: 150, width: w, objectFit: "fill" }}
          />
        </div>
        <div>
          <img
            src="banner2.png"
            style={{ height: 150, width: w, objectFit: "fill" }}
          />
        </div>
        <div>
          <img
            src="banner3.png"
            style={{ height: 150, width: w, objectFit: "fill" }}
          />
        </div>
      </Slider>
    </div>
  );
}
