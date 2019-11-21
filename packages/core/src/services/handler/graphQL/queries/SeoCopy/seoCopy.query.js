const buildQuery = ({ page, brand, country, channel, lang }) => `
  seoCopy(${
    page ? `page: "${page}",` : ``
  } brand: "${brand}", country: "${country}", channel: "${channel}" ${
  lang ? `lang: ${lang}` : ``
}) {
    errorMessage
    copyTitle
    copyBody
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
