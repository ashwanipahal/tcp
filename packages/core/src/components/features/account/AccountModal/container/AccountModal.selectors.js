export const getModalComponent = state => {
  return state.AccountModalReducer.modalToOpen;
};

export const getOpenState = state => {
  return state.AccountModalReducer.openState;
};

export const getMessage = state => {
  return state.AccountModalReducer.message;
};
