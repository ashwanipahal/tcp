export const getLabel = state => {
  const { global: { modules } = {} } = state.Labels;
  let content;
  if (modules) {
    content = modules.lbl_moduleG_add_to_bag || '';
  }
  return content;
};

export default {
  getLabel,
};
