import { HOME_PAGE } from '../constants/pages.constants';
import { getAPIConfig } from '../utils';

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
    getAdditionalMetaTags(SEO_CONFIG.viewport.property, SEO_CONFIG.viewport.content),
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

const getHomeSEOTags = () => {
  return {
    ...getDefaultSEOTags(), // call getMetaSEOTags() with values
  };
};

export const deriveSEOTags = pageId => {
  // Please Note: Convert into switch case if you are adding more cases in this method.
  if (pageId === HOME_PAGE) {
    return getHomeSEOTags(); // Just a sample - any store specific data should be set in this
  }
  return getDefaultSEOTags();
};

export default {
  deriveSEOTags,
};
