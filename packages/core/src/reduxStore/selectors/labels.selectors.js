export const getPlpTilesLabels = state => {
  let labels = {};
  if (state.Labels && state.Labels.PLP && state.Labels.PLP.plpTiles) {
    labels = state.Labels.PLP.plpTiles;
  }
  return labels;
};

export const getSLPLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.SLP;
};
