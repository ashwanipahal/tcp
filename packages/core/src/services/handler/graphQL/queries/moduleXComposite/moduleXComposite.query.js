let compositeQuery = '';
const buildQuery = ({ cids }) => {
  cids.map(item => {
    compositeQuery += `${item.name}: moduleById(id: "${item.contentId}") {
    contentId
    name
    type
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
