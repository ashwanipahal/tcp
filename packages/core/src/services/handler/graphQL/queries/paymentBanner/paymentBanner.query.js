const buildQuery = ({ cid }) => `
moduleById(${cid ? `cid: "${cid}",` : ``}) {
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
