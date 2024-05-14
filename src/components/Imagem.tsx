interface ImagemProps {
  imagePath?: string;
  height?: number;
  width?: number;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onClick?: () => void;
}

export function Imagem({
  imagePath = "public/foodfacillogo_splash.png",
  height = 200,
  width = 200,
  objectFit = "contain",
  onClick = () => {},
}: ImagemProps) {
  return (
    <img
      src={imagePath}
      style={{ height: height, width: width, objectFit: objectFit }}
      onClick={onClick}
    />
  );
}
