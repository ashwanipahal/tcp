export const getStyliticsProductTabListSelector = state => state.StyliticsProductTabList;

export const getLabel = state => {
  const { global: { modules } = {} } = state.Labels;
  let content;
  if (modules) {
    content = modules.lbl_moduleQ_shop_this_look || '';
  }
  return content;
};

export default {
  getStyliticsProductTabListSelector,
  getLabel,
};
