export const getModalComponent = state => {
  return state.AccountModalReducer.get('modalType');
};

export const getOpenState = state => {
  return state.AccountModalReducer.get('openState');
};

export const getMessage = state => {
  return state.AccountModalReducer.get('message');
};
