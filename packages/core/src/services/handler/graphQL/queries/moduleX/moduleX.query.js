const buildQuery = ({ slot, contentId, cid }) => `
${slot || `moduleX`}: moduleById(id: "${contentId || cid}") {
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
