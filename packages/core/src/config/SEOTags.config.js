import PAGES from '../constants/pages.constants';
import { getAPIConfig } from '../utils';
import { findCategoryIdandName } from '../components/features/browse/ProductListing/container/ProductListing.util';

const TCP_BASE_URL = 'www.thechildrensplace.com';
const TCP_TWITTER_SITE_TAG = '@childrensplace';
const TCP_TWITTER_SITE_CARD_TYPE = 'summary';

const GYM_BASE_URL = 'www.thecGymboree.com';
const GYM_TWITTER_SITE_TAG = '@Gymboree';
const GYM_TWITTER_SITE_CARD_TYPE = 'summary';

const SEO_CONFIG = {
  canonical: 'www.thechildrensplace.com',
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
      url: 'www.Thechildrensplace.com',
      title: 'Open Graph Title',
      description: 'Open Graph Description',
    },
    hrefLangs: [
      {
        id: 'us-en',
        canonicalUrl: 'www.Thechildrensplace.com',
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
      url: 'www.thecGymboree.com',
      title: 'Open Graph Title',
      description: 'Open Graph Description',
    },
    hrefLangs: [
      {
        id: 'us-en',
        canonicalUrl: 'www.Thecgymboree.com',
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
  const { brandId } = getAPIConfig();
  const brand = brandId.toUpperCase();

  let BRAND_BASE_URL;
  let BRAND_TWITTER_SITE_TAG;
  let BRAND_TWITTER_SITE_CARD_TYPE;
  if (brand === 'TCP') {
    BRAND_BASE_URL = TCP_BASE_URL;
    BRAND_TWITTER_SITE_TAG = TCP_TWITTER_SITE_TAG;
    BRAND_TWITTER_SITE_CARD_TYPE = TCP_TWITTER_SITE_CARD_TYPE;
  } else {
    BRAND_BASE_URL = GYM_BASE_URL;
    BRAND_TWITTER_SITE_TAG = GYM_TWITTER_SITE_TAG;
    BRAND_TWITTER_SITE_CARD_TYPE = GYM_TWITTER_SITE_CARD_TYPE;
  }

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
    url: `${BRAND_BASE_URL}${categoryKey}`,
    title,
    description,
  };
  const hrefLangs = [
    {
      id: 'us-en',
      canonicalUrl: `${BRAND_BASE_URL}m${categoryKey}`,
    },
  ];

  const twitter = {
    cardType: `${BRAND_TWITTER_SITE_CARD_TYPE}`,
    site: `${BRAND_TWITTER_SITE_TAG}`,
  };

  const canonical = `${BRAND_BASE_URL}${categoryKey}`;
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

const getHomeSEOTags = () => {
  return {
    ...getDefaultSEOTags(), // call getMetaSEOTags() with values
  };
};

function getPlpSEOTags(store, router, categoryKey) {
  const navigationTree = store.getState().Navigation.navigationData;
  return findCategoryIdandName(navigationTree, categoryKey);
}

export const deriveSEOTags = (pageId, store, router) => {
  // Please Note: Convert into switch case if you are adding more cases in this method.
  if (pageId === PAGES.HOME_PAGE) {
    return getHomeSEOTags(); // Just a sample - any store specific data should be set in this
  }
  if (pageId === PAGES.PRODUCT_LISTING_PAGE) {
    const categoryKey = router.asPath;
    const getSeoMap = getPlpSEOTags(store, router, categoryKey);
    return getSeoConfig(getSeoMap, categoryKey);
  }
  return getDefaultSEOTags();
};

export default {
  deriveSEOTags,
};
