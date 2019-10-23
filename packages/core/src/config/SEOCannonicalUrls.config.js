export const BRAND_CONFIG = {
  TCP: 'childrensplace.com',
  GYM: 'gymboree.com',
};

const cannonicalUrlsConfig = context => {
  const { brand, path } = context;

  return [
    {
      id: 'en-us',
      canonicalUrl: `https://www.${BRAND_CONFIG[brand]}/us/${path}`,
    },
    {
      id: 'es-us',
      canonicalUrl: `https://es.${BRAND_CONFIG[brand]}/us/${path}`,
    },
    {
      id: 'en-ca',
      canonicalUrl: `https://www.${BRAND_CONFIG[brand]}/ca/${path}`,
    },
    {
      id: 'fr-ca',
      canonicalUrl: `https://fr.${BRAND_CONFIG[brand]}/ca/${path}`,
    },
  ];
};

export default cannonicalUrlsConfig;
