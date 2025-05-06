export const getRatingColor = (rating: number) => {
  if (rating <= 1) return "#f16565";
  if (rating <= 2) return "#fcb301";
  if (rating <= 3) return "#72bfbc";
  if (rating <= 5) return "#14958f";
  return "#14958f"; // fallback
};
