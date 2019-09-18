const getLabels = state => {
  return state.Labels.Browse && state.Labels.Browse.Sort;
};

export default getLabels;
