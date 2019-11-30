import { SITEMAP_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';

const getSiteMapData = state => {
  return state[SITEMAP_REDUCER_KEY].siteMapData;
};

export default getSiteMapData;
