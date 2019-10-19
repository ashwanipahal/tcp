const buildQuery = ({ page, brand, country, channel }) => `
  seoData(${
    page ? `page: "${page}",` : ``
  } brand: "${brand}", country: "${country}", channel: "${channel}") {
    path
    pageTitle
    keywords
    description
    robotsInfo
    canonicalUrl
    hrefLang
    thumbnailUrl
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
