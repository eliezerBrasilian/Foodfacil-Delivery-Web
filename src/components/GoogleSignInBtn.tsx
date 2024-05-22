import { Imagem } from "./Imagem";

interface GoogleSignInBtnProps {
  onClick: () => void;
  text: string;
}

export function GoogleSignInBtn({ onClick, text }: GoogleSignInBtnProps) {
  return (
    <div
      style={{
        borderColor: "red",
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#fff",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 7,
        width: "100%",
        height: 45,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          columnGap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Imagem imagePath="google_icon.png" width={20} height={20} />
        <p style={{ color: "#000" }}>{text}</p>
      </div>
    </div>
  );
}
