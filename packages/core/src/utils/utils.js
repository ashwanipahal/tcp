import icons from '../config/icons';
import locators from '../config/locators';
import { API_CONFIG, awsAppSync, googleAppConfig } from '../services/config';
import { getStoreRef, resetStoreRef } from './store.utils';
import { APICONFIG_REDUCER_KEY } from '../constants/reducer.constants';

// setting the apiConfig subtree of whole state in variable; Do we really need it ?
let apiConfig = null;

/**
 * This function returns the path of icons in static/images folder
 * @param {*} icon | String - Identifier for icons in assets
 */
export const getIconPath = icon => {
  return icons[icon];
};

/**
 * This function returns the path of icons in static/images folder
 * @param {*} icon | String - Identifier for icons in assets
 */
export const getLocator = locator => {
  return locators[locator];
};

export const isMobileApp = () => {
  return typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
};

export function isClient() {
  return typeof window !== 'undefined' && !isMobileApp();
}

export const isServer = () => {
  return typeof window === 'undefined' && !isMobileApp();
};

const getAPIInfoFromEnv = (apiSiteInfo, processEnv) => {
  const apiEndpoint = processEnv.RWD_WEB_API_DOMAIN || ''; // TO ensure relative URLs for MS APIs
  return {
    traceIdCount: 0,
    langId: processEnv.RWD_WEB_LANGID || apiSiteInfo.langId,
    MELISSA_KEY: processEnv.RWD_WEB_MELISSA_KEY || apiSiteInfo.MELISSA_KEY,
    BV_API_KEY: processEnv.RWD_WEB_BV_API_KEY || apiSiteInfo.BV_API_KEY,
    assetHost: processEnv.RWD_WEB_ASSETHOST || apiSiteInfo.assetHost,
    domain: `${apiEndpoint}/${processEnv.RWD_WEB_API_IDENTIFIER}/`,
    unbxd: processEnv.RWD_WEB_UNBXD_DOMAIN || apiSiteInfo.unbxd,
    CANDID_API_KEY: process.env.RWD_WEB_CANDID_API_KEY,
    CANDID_API_URL: process.env.RWD_WEB_CANDID_URL,
    googleApiKey: process.env.RWD_WEB_GOOGLE_MAPS_API_KEY,
    ACQUISITION_ID: process.env.RWD_WEB_ACQUISITION_ID,
  };
};

const getGraphQLApiFromEnv = (apiSiteInfo, processEnv, relHostname) => {
  const graphQlEndpoint = processEnv.RWD_WEB_GRAPHQL_API_ENDPOINT || relHostname;
  return {
    graphql_reqion: processEnv.RWD_WEB_GRAPHQL_API_REGION,
    graphql_endpoint_url: `${graphQlEndpoint}/${processEnv.RWD_WEB_GRAPHQL_API_IDENTIFIER}`,
    graphql_auth_type: processEnv.RWD_WEB_GRAPHQL_API_AUTH_TYPE,
    graphql_api_key: processEnv.RWD_WEB_GRAPHQL_API_KEY || '',
  };
};

export const createAPIConfig = resLocals => {
  // TODO - Get data from env config - Brand, MellisaKey, BritverifyId, AcquisitionId, Domains, Asset Host, Unbxd Domain;
  // TODO - use isMobile and cookie as well..

  const { siteId, brandId, hostname } = resLocals;
  const isCASite = siteId === API_CONFIG.siteIds.ca;
  const isGYMSite = brandId === API_CONFIG.brandIds.gym;
  const countryConfig = isCASite ? API_CONFIG.CA_CONFIG_OPTIONS : API_CONFIG.US_CONFIG_OPTIONS;
  const brandConfig = isGYMSite ? API_CONFIG.GYM_CONFIG_OPTIONS : API_CONFIG.TCP_CONFIG_OPTIONS;
  const apiSiteInfo = API_CONFIG.sitesInfo;
  const processEnv = process.env;
  const relHostname = apiSiteInfo.proto + apiSiteInfo.protoSeparator + hostname;
  const basicConfig = getAPIInfoFromEnv(apiSiteInfo, processEnv);
  const graphQLConfig = getGraphQLApiFromEnv(apiSiteInfo, processEnv, relHostname);
  return {
    ...basicConfig,
    ...graphQLConfig,
    ...countryConfig,
    ...brandConfig,
    isMobile: false,
    cookie: null,
  };
};

/**
 * @summary Get the api config if already created or else creates one.
 * @returns {Object} apiConfig - Api config to be utilized for brand/channel/locale config
 */
export const getAPIConfig = () => {
  // When apiConfig is null (the very first time) or is an empty object, derive value from store..
  const validApiConfigObj = !apiConfig || (apiConfig && !Object.keys(apiConfig).length);
  // This check is to make sure that same instance of apiConfig for different country/brand ssr requests
  const deriveApiConfigObj = validApiConfigObj || isServer();
  if (isMobileApp()) {
    // TODO - need to configure it for mobile app in similar way of Web - Overriding it for now
    apiConfig = {
      brandId: 'tcp',
      brandIdCMS: 'TCP',
      traceIdCount: 0,
      proto: 'https',
      MELISSA_KEY: '63987687',
      BV_API_KEY: 'e50ab0a9-ac0b-436b-9932-2a74b9486436',
      storeId: '10151',
      catalogId: '10551',
      isUSStore: true,
      langId: '-1',
      siteId: 'us',
      countryKey: '_US',
      assetHost: 'https://test4.childrensplace.com',
      domain: 'https://test4.childrensplace.com/api/',
      unbxd: '://search.unbxd.io',
      cookie: null,
      isMobile: false,
      map_api_key: googleAppConfig.google_map_api_key,
      graphql_reqion: awsAppSync.aws_appsync_region,
      graphql_endpoint_url: awsAppSync.aws_appsync_graphqlEndpoint,
      graphql_auth_type: awsAppSync.aws_appsync_authenticationType,
      graphql_api_key: awsAppSync.aws_appsync_apiKey,
    };
  } else if (deriveApiConfigObj) {
    apiConfig = (getStoreRef() && getStoreRef().getState()[APICONFIG_REDUCER_KEY]) || {};
    if (!isServer()) {
      resetStoreRef(); // This is to make module variable reduxStore as null
    }
  }
  return apiConfig;
};

export const getBrand = () => {
  return getAPIConfig().brandId;
};

export const isTCP = () => {
  const { brandId } = getAPIConfig();
  return brandId === API_CONFIG.brandIds.tcp;
};

export const isCanada = () => {
  const { siteId } = getAPIConfig();
  return siteId === API_CONFIG.siteIds.ca;
};

export const isGymboree = () => {
  const { brandId } = getAPIConfig();
  return brandId === API_CONFIG.brandIds.gym;
};

export default {
  getIconPath,
  getLocator,
  getBrand,
  isClient,
  isMobileApp,
  isServer,
  getAPIConfig,
  isGymboree,
  isTCP,
  isCanada,
};
