export const formatPrice = (price: number) => {
  price = Math.round(price);
  const formattedNum =
    Math.abs(price) >= 1000
      ? Math.sign(price) * Number((Math.abs(price) / 1000).toFixed(0))
      : Math.sign(price) * Math.abs(price);

  const addComma = formattedNum
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return addComma + 'K';
};

export const formatPriceWithUnit = (price: number) => {
  price = Math.round(price);
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + 'đ';
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

const currentDay = new Date();
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const currentDayString = `${currentDay.getHours()}:00, ${currentDay.getDate()}/${
  currentDay.getMonth() + 1
}`;
const tomorrowString = `${tomorrow.getHours() + 1}:00, ${tomorrow.getDate()}/${
  tomorrow.getMonth() + 1
}`;

export const timeString = `${currentDayString} - ${tomorrowString}`;

const formatTime = (date: Date) => {
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${hours + 1}h00 ${dayOfWeek}, ${day}/${month}/${year}`;
};

export const currentDateString = formatTime(currentDay);
export const returnDateString = formatTime(tomorrow);

export const calculateAvgRating = (ratings: {rating: number}[]) => {
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return totalRatings / ratings.length;
};
