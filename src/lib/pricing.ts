const USD_TO_INR_DISPLAY_RATE = 50;

export function normalizeMenuPrice(price: string): string {
  const trimmedPrice = price.trim();

  if (trimmedPrice.startsWith("₹")) {
    return trimmedPrice;
  }

  const usdMatch = trimmedPrice.match(/^\$(\d+(?:\.\d{1,2})?)$/);
  if (!usdMatch) {
    return trimmedPrice;
  }

  const usdAmount = Number(usdMatch[1]);
  const inrAmount = Math.round((usdAmount * USD_TO_INR_DISPLAY_RATE) / 10) * 10;

  return `₹${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(inrAmount)}`;
}
