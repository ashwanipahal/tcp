import SITEMAP_CONSTANTS from './SiteMap.constants';

export const fetchSiteMapData = payload => {
  return {
    payload,
    type: SITEMAP_CONSTANTS.FETCH_SITEMAP_DATA,
  };
};

export default {
  fetchSiteMapData,
};
