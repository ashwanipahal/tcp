export const getPageName = state => {
  const { pageData = {} } = state;
  return pageData.pageName || '';
};

export default {
  getPageName,
};
