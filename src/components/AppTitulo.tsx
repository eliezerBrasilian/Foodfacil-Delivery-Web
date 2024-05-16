interface AppTituloProps {
  text: string;
}

export function AppTitulo({ text }: AppTituloProps) {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 100,
      }}
    >
      <p style={{ color: "#FF0303" }}>{text}</p>
    </div>
  );
}
