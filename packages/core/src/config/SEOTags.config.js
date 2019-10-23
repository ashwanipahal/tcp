import PAGES from '../constants/pages.constants';
import { getAPIConfig } from '../utils';
import { findCategoryIdandName } from '../components/features/browse/ProductListing/container/ProductListing.util';
import urlConfig from './SEOCannonicalUrls.config';

const TCP_BASE_URL = 'https://www.childrensplace.com';
const TCP_TWITTER_SITE_TAG = '@childrensplace';
const TCP_TWITTER_SITE_CARD_TYPE = 'summary';

const GYM_BASE_URL = 'https://www.gymboree.com';
const GYM_TWITTER_SITE_TAG = '@Gymboree';
const GYM_TWITTER_SITE_CARD_TYPE = 'summary';
const TCP_LABEL = "The Children's Place";
const GYM_LABEL = 'Gymboree';

const SEO_CONFIG = {
  canonical: TCP_BASE_URL,
  robots: {
    property: 'robots',
    content: 'index',
  },
  viewport: {
    property: 'viewport',
    content: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1',
  },
  keywords: {
    property: 'keywords',
    content: 'childrensplace',
  },
  TCP: {
    twitter: {
      cardType: 'summary',
      site: '@childrensplace',
    },
    openGraph: {
      url: TCP_BASE_URL,
      title: 'Open Graph Title',
      description: 'Open Graph Description',
    },
    hrefLangs: [
      {
        id: 'us-en',
        canonicalUrl: TCP_BASE_URL,
      },
    ],
    US: {
      title: "Kids Clothes & Baby Clothes | The Children's Place | Free Shipping*",
      description:
        "Check out The Children's Place for a great selection of kids clothes, baby clothes & more. Shop at the PLACE where big fashion meets little prices!",
    },
    CA: {
      title: "Kids Clothes & Baby Clothes | The Children's Place CA | Free Shipping*",
      description:
        "Check out The Children's Place CA for a great selection of kids clothes, baby clothes & more. Shop at the PLACE where big fashion meets little prices",
    },
  },
  GYM: {
    twitter: {
      cardType: 'summary',
      site: '@Gymboree',
    },
    openGraph: {
      url: GYM_BASE_URL,
      title: 'Open Graph Title',
      description: 'Open Graph Description',
    },
    hrefLangs: [
      {
        id: 'us-en',
        canonicalUrl: GYM_BASE_URL,
      },
    ],
    US: {
      title: "Kids Clothes & Baby Clothes | The Gymboree's Place | Free Shipping*",
      description:
        "Check out The gymboree's Place for a great selection of kids clothes, baby clothes & more. Shop at the PLACE where big fashion meets little prices!",
    },
    CA: {
      title: "Kids Clothes & Baby Clothes | The Gymboree's Place CA | Free Shipping*",
      description:
        "Check out The gymboree's Place CA for a great selection of kids clothes, baby clothes & more. Shop at the PLACE where big fashion meets little prices",
    },
  },
};

function getBrandDetails() {
  const { brandId } = getAPIConfig();
  const brand = brandId.toUpperCase();

  let BRAND_BASE_URL;
  let BRAND_TWITTER_SITE_TAG;
  let BRAND_TWITTER_SITE_CARD_TYPE;
  let BRAND_NAME;
  if (brand === 'TCP') {
    BRAND_NAME = brand;
    BRAND_BASE_URL = TCP_BASE_URL;
    BRAND_TWITTER_SITE_TAG = TCP_TWITTER_SITE_TAG;
    BRAND_TWITTER_SITE_CARD_TYPE = TCP_TWITTER_SITE_CARD_TYPE;
  } else {
    BRAND_NAME = brand;
    BRAND_BASE_URL = GYM_BASE_URL;
    BRAND_TWITTER_SITE_TAG = GYM_TWITTER_SITE_TAG;
    BRAND_TWITTER_SITE_CARD_TYPE = GYM_TWITTER_SITE_CARD_TYPE;
  }

  return {
    BRAND_NAME,
    BRAND_BASE_URL,
    BRAND_TWITTER_SITE_TAG,
    BRAND_TWITTER_SITE_CARD_TYPE,
  };
}

const getAdditionalMetaTags = (property, content) => ({
  property,
  content,
});

const getMetaSEOTags = ({
  title,
  description,
  canonical,
  twitter,
  openGraph,
  hrefLangs,
  keywords,
  robots,
}) => ({
  title,
  description,
  canonical,
  twitter,
  openGraph,
  hrefLangs,
  additionalMetaTags: [
    getAdditionalMetaTags(SEO_CONFIG.robots.property, robots),
    getAdditionalMetaTags(SEO_CONFIG.keywords.property, keywords),
    // Viewport has been coded in _document file, as it was not being applied for mobile
    // getAdditionalMetaTags(SEO_CONFIG.viewport.property, SEO_CONFIG.viewport.content),
  ],
});

const getDefaultSEOTags = () => {
  // After integration with CMS, this data should ideally be fetched and retrieved from Redux-State
  const { brandId, siteId } = getAPIConfig();
  const brand = brandId.toUpperCase();
  const site = siteId.toUpperCase();
  const { twitter, openGraph, hrefLangs } = SEO_CONFIG[brand];
  const { title, description, canonical } = SEO_CONFIG[brand][site];
  return getMetaSEOTags({
    title,
    description,
    canonical,
    twitter,
    openGraph,
    hrefLangs,
    keywords: SEO_CONFIG.keywords.content,
    robots: SEO_CONFIG.robots.content,
  });
};

export const getSeoConfig = (getSeoMap, categoryKey) => {
  const brandDetails = getBrandDetails();

  const seoTitlesMap = [];
  const seoDescMap = [];
  getSeoMap.forEach(item => {
    if (item.seoTitle) {
      seoTitlesMap.push(item.seoTitle);
    }
    if (item.seoMetaDesc) {
      seoDescMap.push(item.seoMetaDesc);
    }
  });

  const seoTitle = seoTitlesMap[0];
  const seoMetaDesc = seoDescMap[0];

  const title = seoTitle;
  const description = seoMetaDesc;
  const openGraph = {
    url: `${brandDetails.BRAND_BASE_URL}${categoryKey}`,
    title,
    description,
  };
  const hrefLangs = [
    {
      id: 'us-en',
      canonicalUrl: `${brandDetails.BRAND_BASE_URL}m${categoryKey}`,
    },
  ];

  const twitter = {
    cardType: `${brandDetails.BRAND_TWITTER_SITE_CARD_TYPE}`,
    site: `${brandDetails.BRAND_TWITTER_SITE_TAG}`,
  };

  const canonical = `${brandDetails.BRAND_BASE_URL}${categoryKey}`;
  return getMetaSEOTags({
    title,
    description,
    canonical,
    twitter,
    openGraph,
    hrefLangs,
    keywords: SEO_CONFIG.keywords.content,
    robots: SEO_CONFIG.robots.content,
  });
};

const getHomeSEOTags = (store, router, categoryKey) => {
  const brandDetails = getBrandDetails();
  const { brandId } = getAPIConfig();
  const brand = brandId.toUpperCase();
  const {
    SEOData: { home },
  } = store.getState();
  const { pageTitle = '', description = '', canonical = '', keywords } = home || {};

  const openGraph = {
    url: `${brandDetails.BRAND_BASE_URL}${categoryKey}`,
    title: pageTitle,
    description,
  };
  const cannonicalUrlConfig = {
    brand,
    path: 'home',
  };
  const hrefLangs = urlConfig(cannonicalUrlConfig);

  const twitter = {
    cardType: `${brandDetails.BRAND_TWITTER_SITE_CARD_TYPE}`,
    site: `${brandDetails.BRAND_TWITTER_SITE_TAG}`,
  };

  return getMetaSEOTags({
    title: pageTitle,
    description,
    canonical,
    twitter,
    openGraph,
    hrefLangs,
    keywords,
    robots: SEO_CONFIG.robots.content,
  });
};

function getPlpSEOTags(store, router, categoryKey) {
  const navigationTree = store.getState().Navigation.navigationData;
  return findCategoryIdandName(navigationTree, categoryKey);
}

export const getSearchSEOTags = (store, router, categoryKey) => {
  const { isUSStore } = getAPIConfig();

  const brandDetails = getBrandDetails();
  let brandLabel;
  if (brandDetails.BRAND_NAME === 'TCP') {
    brandLabel = TCP_LABEL;
  } else {
    brandLabel = GYM_LABEL;
  }

  const usTitle = `Kids Clothes & Baby Clothes | ${brandLabel} | Free Shipping*`;
  const caTitle = `Kids Clothes & Baby Clothes | ${brandLabel} CA | Free Shipping*`;

  const usDecs = `Check out ${brandLabel} for a great selection of kids clothes, baby clothes & more. Shop at the PLACE where big fashion meets little prices!`;
  const caDecs = `Check out ${brandLabel} CA for a great selection of kids clothes, baby clothes & more. Shop at the PLACE where big fashion meets little prices!`;

  const openGraph = {
    url: `${brandDetails.BRAND_BASE_URL}${categoryKey}`,
    title: isUSStore ? usTitle : caTitle,
    description: isUSStore ? usDecs : caDecs,
  };
  const hrefLangs = [
    {
      id: 'us-en',
      canonicalUrl: `${brandDetails.BRAND_BASE_URL}${categoryKey}`,
    },
  ];

  const twitter = {
    cardType: `${brandDetails.BRAND_TWITTER_SITE_CARD_TYPE}`,
    site: `${brandDetails.BRAND_TWITTER_SITE_TAG}`,
  };

  const canonical = `${brandDetails.BRAND_BASE_URL}${categoryKey}`;

  return getMetaSEOTags({
    title: isUSStore ? usTitle : caTitle,
    description: isUSStore ? usDecs : caDecs,
    canonical,
    twitter,
    openGraph,
    hrefLangs,
    keywords: SEO_CONFIG.keywords.content,
    robots: SEO_CONFIG.robots.content,
  });
};

const getProductName = store => {
  return (
    store.getState() &&
    store.getState().ProductDetail &&
    store.getState().ProductDetail.currentProduct &&
    store.getState().ProductDetail.currentProduct.name
  );
};

export const getPdpSEOTags = (store, router, categoryKey) => {
  const productName = getProductName(store);
  const longProductTitle =
    store.getState() &&
    store.getState().ProductDetail &&
    store.getState().ProductDetail.currentProduct &&
    store.getState().ProductDetail.currentProduct.long_product_title;
  const productLongDescription =
    store.getState() &&
    store.getState().ProductDetail &&
    store.getState().ProductDetail.currentProduct &&
    store.getState().ProductDetail.currentProduct.product_long_description;

  const brandDetails = getBrandDetails();

  let title;
  let description;

  if (longProductTitle) {
    title = longProductTitle;
  } else {
    title = productName;
  }

  if (productLongDescription) {
    description = productLongDescription;
  } else {
    description = productName;
  }

  const openGraph = {
    url: `${brandDetails.BRAND_BASE_URL}${categoryKey}`,
    title,
    description,
  };
  const hrefLangs = [
    {
      id: 'us-en',
      canonicalUrl: `${brandDetails.BRAND_BASE_URL}m${categoryKey}`,
    },
  ];

  const twitter = {
    cardType: `${brandDetails.BRAND_TWITTER_SITE_CARD_TYPE}`,
    site: `${brandDetails.BRAND_TWITTER_SITE_TAG}`,
  };

  const canonical = `${brandDetails.BRAND_BASE_URL}${categoryKey}`;
  return getMetaSEOTags({
    title,
    description,
    canonical,
    twitter,
    openGraph,
    hrefLangs,
    keywords: SEO_CONFIG.keywords.content,
    robots: SEO_CONFIG.robots.content,
  });
};

export const deriveSEOTags = (pageId, store, router) => {
  // Please Note: Convert into switch case if you are adding more cases in this method.
  if (pageId === PAGES.HOME_PAGE) {
    const categoryKey = router.asPath;
    return getHomeSEOTags(store, router, categoryKey);
  }
  if (pageId === PAGES.PRODUCT_LISTING_PAGE) {
    const categoryKey = router.asPath;
    const getSeoMap = getPlpSEOTags(store, router, categoryKey);
    return getSeoConfig(getSeoMap, categoryKey);
  }
  if (pageId === PAGES.SEARCH_PAGE || pageId === PAGES.OUTFIT) {
    const categoryKey = `/${pageId}`;
    return getSearchSEOTags(store, router, categoryKey);
  }
  if (pageId === PAGES.PRODUCT_DESCRIPTION_PAGE) {
    const categoryKey = router.asPath;
    return getSearchSEOTags(store, router, categoryKey);
  }

  return getDefaultSEOTags();
};

export default {
  deriveSEOTags,
};
