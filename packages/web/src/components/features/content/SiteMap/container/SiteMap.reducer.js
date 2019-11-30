import { DEFAULT_REDUCER_KEY, setCacheTTL } from '@tcp/core/src/utils/cache.util';
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
        [DEFAULT_REDUCER_KEY]: setCacheTTL(),
      };
    default:
      return state;
  }
};

export default SiteMapReducer;
