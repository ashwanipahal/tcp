const buildQuery = ({ slot, contentId, cid, lang }) => `
${slot || `moduleX`}: moduleById(id: "${contentId || cid}" ${lang ? `, lang: ${lang}` : ``}) {
  contentId
  name
  type
  errorMessage
  set {
    key
    val
  }
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
