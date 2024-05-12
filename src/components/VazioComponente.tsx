interface VazioComponenteProps {
  titulo: string;
}

export function VazioComponente({ titulo }: VazioComponenteProps) {
  return <p style={{ fontSize: 16 }}>Não há nenhum {titulo} no momento!</p>;
}
