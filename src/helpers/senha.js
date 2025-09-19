export function apenasNumeros(s) {
  return /^\d+$/.test(s);
}

export function ehSequenciaComum(s) {
  const ruins = [
    "123456","234567","345678","456789",
    "987654","876543","765432","654321",
    "000000","111111"
  ];
  return ruins.some(seq => s.includes(seq));
}
