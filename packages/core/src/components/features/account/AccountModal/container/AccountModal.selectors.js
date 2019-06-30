export const getModalComponent = state => {
  return state.AccountModalReducer.modalType;
};

export const getOpenState = state => {
  return state.AccountModalReducer.openState;
};

export const getMessage = state => {
  return state.AccountModalReducer.message;
};
