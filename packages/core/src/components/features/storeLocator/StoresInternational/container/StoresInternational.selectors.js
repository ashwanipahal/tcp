import { STORES_INTL_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

export const getContent = state => {
  return state[STORES_INTL_REDUCER_KEY].get('moduleXContent');
};

export const getModuleXContentId = state => {
  const { StoreLocator: { StoreList } = {} } = state.Labels;
  let content;
  if (StoreList) {
    const { referred = [] } = StoreList;
    content = referred.find(label => label.name === 'StoreInternationalHtml');
  }
  return content && content.contentId;
};
