interface ObservacaoTextInputProps {
  onChangeText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ObservacaoTextInput({
  onChangeText,
}: ObservacaoTextInputProps) {
  return (
    <div style={{ width: "100%", padding: 15, marginBottom: 20 }}>
      <textarea
        onChange={onChangeText}
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          height: "140px",
          padding: "8px",
          resize: "none", // Impede o redimensionamento do textarea pelo usuário
          width: "100%", // Ocupa toda a largura disponível,
        }}
        placeholder="Digite sua observação..."
        maxLength={141}
      />
    </div>
  );
}
