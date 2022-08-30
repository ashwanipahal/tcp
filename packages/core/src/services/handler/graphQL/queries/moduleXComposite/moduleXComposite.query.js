let compositeQuery = '';
const buildQuery = ({ cids, lang }) => {
  cids.map(item => {
    compositeQuery += `${item.name}: moduleById(id: "${item.contentId}" ${
      lang ? `, lang: ${lang}` : ``
    }) {
    contentId
    name
    type
    errorMessage
    composites {
      richTextList {
        text
      }
    }
  }
    `;
    return compositeQuery;
  });
  return compositeQuery;
};

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
