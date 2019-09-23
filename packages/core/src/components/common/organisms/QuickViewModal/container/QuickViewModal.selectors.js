export const getProductInfo = state => {
  return state.QuickView.get('quickViewProduct');
};

export const getModalState = state => {
  return state.QuickView.get('isModalOpen');
};
