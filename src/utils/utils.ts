export const formatPrice = (price: number) => {
  const formattedNum =
    Math.abs(price) >= 1000
      ? Math.sign(price) * Number((Math.abs(price) / 1000).toFixed(0))
      : Math.sign(price) * Math.abs(price);

  const addComma = formattedNum
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return addComma + (formattedNum >= 1000 ? 'K' : 'K');
};

export const getTotalPrice = (price: number) => {
  const insuranceFee = price * 0.123;
  const serviceFee = price * 0.123;
  const totalPrice = price + insuranceFee + serviceFee;
  return totalPrice;
};

export const calculateDiscount = (originalPrice: number, price: number) => {
  const discount = originalPrice - price;
  const discountPercent = (discount / originalPrice) * 100;
  return discountPercent.toFixed(0);
};

export const convertTotalNumber = (num: number) => {
  // Round down to the nearest hundred
  const rounded = Math.floor(num / 100) * 100;

  // Convert to string and add '+'
  const result = rounded.toLocaleString() + '+';

  return result;
};
