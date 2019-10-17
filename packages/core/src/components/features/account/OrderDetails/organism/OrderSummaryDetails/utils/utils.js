/**
 * @function formatAmount
 * @param {object} value -  category amount of the order
 * @param {object} currencySymbol - currency of the order
 * @returns {string} total absolute value with +/- sign
 */
const formatAmount = (value, currencySymbol) => {
  const symbol = value < 0 ? '-' : '';
  return symbol + currencySymbol + Math.abs(value).toFixed(2);
};

export default formatAmount;
