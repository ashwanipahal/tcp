import SITEMAP_CONSTANTS from './SiteMap.constants';

const initialState = {
  siteMapData: {},
};

const SiteMapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SITEMAP_CONSTANTS.SET_SITEMAP_DATA:
      return {
        ...state,
        siteMapData: { ...action.payload },
      };
    default:
      return state;
  }
};

export default SiteMapReducer;
