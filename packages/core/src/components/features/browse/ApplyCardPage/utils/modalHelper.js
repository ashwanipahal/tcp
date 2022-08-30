const getModalHeight = (bagItems, isCheckoutFlow) => {
  let modalHeight;
  if (isCheckoutFlow) {
    modalHeight = bagItems ? '560px' : '500px';
  } else {
    modalHeight = bagItems ? '512px' : '458px';
  }
  return modalHeight;
};

export default getModalHeight;
