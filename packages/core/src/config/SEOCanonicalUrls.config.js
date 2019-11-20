export const BRAND_CONFIG = {
  TCP: 'childrensplace.com',
  GYM: 'gymboree.com',
};

const canonicalUrlsConfig = context => {
  const { brand, path, withCountry } = context;

  return [
    {
      id: 'en-us',
      canonicalUrl: `https://www.${BRAND_CONFIG[brand]}${!withCountry ? '/us/' : ''}${path}`,
    },
    {
      id: 'es-us',
      canonicalUrl: `https://es.${BRAND_CONFIG[brand]}${!withCountry ? '/us/' : ''}${path}`,
    },
    {
      id: 'en-ca',
      canonicalUrl: `https://www.${BRAND_CONFIG[brand]}${!withCountry ? '/ca/' : ''}${path}`,
    },
    {
      id: 'fr-ca',
      canonicalUrl: `https://fr.${BRAND_CONFIG[brand]}${!withCountry ? '/ca/' : ''}${path}`,
    },
  ];
};

export default canonicalUrlsConfig;
