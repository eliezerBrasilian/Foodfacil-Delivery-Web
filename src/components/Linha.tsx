interface LinhaProps {
  borderBottomWidth?: number;
  borderBottomColor?: string;
}
function Linha({
  borderBottomWidth = 2,
  borderBottomColor = "#ff0080",
}: LinhaProps) {
  return (
    <div
      style={{
        borderBottomWidth: borderBottomWidth,
        borderBottomColor: borderBottomColor,
        borderBottomStyle: "solid",
        marginTop: 4,
      }}
    />
  );
}
export { Linha };
