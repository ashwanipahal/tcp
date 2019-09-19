const getModalHeight = (bagItems, isCheckoutFlow) => {
  /* eslint-disable-next-line no-nested-ternary */
  return isCheckoutFlow ? (bagItems ? '560px' : '500px') : bagItems ? '512px' : '458px';
};

export default getModalHeight;
