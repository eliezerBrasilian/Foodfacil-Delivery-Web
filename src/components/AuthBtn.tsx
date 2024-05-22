interface AuthBtnProps {
  onClick: () => void;
  text: string;
}

export function AuthBtn({ onClick, text }: AuthBtnProps) {
  return (
    <div
      style={{
        backgroundColor: "#000000",
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
      <p style={{ color: "#fff" }}>{text}</p>
    </div>
  );
}
