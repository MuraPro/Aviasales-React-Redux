const formatPrice = (price) => {
  const priceStrReversed = price.toString().split('').reverse().join('');
  const result = [];

  for (let i = 0; i < priceStrReversed.length; i += 1) {
    if (i % 3 === 0) {
      result.push(' ');
      result.push(priceStrReversed[i]);
    } else {
      result.push(priceStrReversed[i]);
    }
  }

  return result.reverse().join('').trim();
};

export default formatPrice;
