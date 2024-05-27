export function getRandomIndices(
  arraySize: number,
  numberOfIndices: number
): number[] {
  const indices = Array.from({ length: arraySize }, (_, i) => i);

  // Embaralhar o array de índices usando Fisher-Yates (Knuth) Shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Retornar os primeiros 'numberOfIndices' elementos
  return indices.slice(0, numberOfIndices);
}
