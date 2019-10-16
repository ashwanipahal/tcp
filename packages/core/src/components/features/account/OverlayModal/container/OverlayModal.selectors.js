export const getComponent = state => {
  return state.OverlayModalReducer.get('component');
};

export const getVariation = state => {
  return state.OverlayModalReducer.get('variation');
};

export const getOpenState = state => {
  return state.OverlayModalReducer.get('openOverlay');
};

export const getColor = state => {
  return state.OverlayModalReducer.get('color');
};

export const getProps = state => {
  return state.OverlayModalReducer.get('componentProps') || {};
};
