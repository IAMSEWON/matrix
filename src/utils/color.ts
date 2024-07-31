export const getContrastYIQ = (hexcolor?: string) => {
  if (!hexcolor) {
    return 'black';
  }
  // HEX 값을 RGB로 변환
  const r = parseInt(hexcolor.substring(1, 2), 16);
  const g = parseInt(hexcolor.substring(3, 2), 16);
  const b = parseInt(hexcolor.substring(5, 2), 16);

  // 명도 계산
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // 명도에 따라 텍스트 색상 선택
  return yiq >= 128 ? 'black' : 'white';
};
