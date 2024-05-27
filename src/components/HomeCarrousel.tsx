import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useLarguraAtual } from "../customHooks/useLarguraAtual";

export function HomeCarrousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const larguraContainer = useLarguraAtual();
  const w = useLarguraAtual() - 10;

  return (
    <div style={{ height: 182, width: larguraContainer, marginTop: 10 }}>
      <Slider arrows={false} {...settings}>
        <div>
          <img
            src="banner0.png"
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
