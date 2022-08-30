import SITEMAP_CONSTANTS from './SiteMap.constants';

export const fetchSiteMapData = payload => {
  return {
    payload,
    type: SITEMAP_CONSTANTS.FETCH_SITEMAP_DATA,
  };
};

export const setSiteMapData = payload => {
  return {
    payload,
    type: SITEMAP_CONSTANTS.SET_SITEMAP_DATA,
  };
};

export default {
  fetchSiteMapData,
  setSiteMapData,
};
