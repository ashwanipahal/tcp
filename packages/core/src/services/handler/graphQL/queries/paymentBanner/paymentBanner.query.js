const buildQuery = ({ cid }) => `
moduleX: moduleById(id: "${cid}") {
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

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
