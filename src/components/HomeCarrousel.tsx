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
  const w = useLarguraAtual() - 20;

  if (larguraContainer <= 500)
    return (
      <div
        style={{
          height: 182,
          width: larguraContainer,
          marginTop: 10,
          paddingLeft: 10,
        }}
      >
        <Slider arrows={false} {...settings}>
          <div>
            <img
              src="banner0.png"
              style={{
                height: 150,
                width: w,
                objectFit: "fill",
                borderRadius: 12,
              }}
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
  return (
    <div style={{ height: 222, marginTop: 10 }}>
      <div style={{ display: "flex", columnGap: 14 }}>
        <img
          src="banner0.png"
          style={{ height: 170, objectFit: "fill", borderRadius: 12 }}
        />
        <img
          src="banner2.png"
          style={{ height: 170, width: 674, objectFit: "fill" }}
        />
        <img
          src="banner3.png"
          style={{ height: 170, width: 674, objectFit: "fill" }}
        />
      </div>
    </div>
  );
}
