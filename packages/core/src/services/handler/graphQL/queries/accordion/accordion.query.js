const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
    contentId
    name
    type
    composites {
      accordionWrapper {
        styled {
          text
          style
        }
        richText {
          text
        }
      }
    }
}
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
