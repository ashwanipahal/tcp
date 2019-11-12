const buildQuery = ({ page, brand, country, channel, lang }) => `
  seoData(${
    page ? `page: "${page}",` : ``
  } brand: "${brand}", country: "${country}", channel: "${channel}" ${
  lang ? `lang: ${lang}` : ``
}) {
    errorMessage
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
