export const formatNumberToShorterNotation = (num: number) => {
  if (num >= 1_000_000_000) {
    return `${Math.floor(num / 1_000_000_000)}B`;
  } else if (num >= 1_000_000) {
    return `${Math.floor(num / 1_000_000)}M`;
  } else if (num >= 1_000) {
    return `${Math.floor(num / 1_000)}K`;
  } else {
    return num.toString();
  }
};
