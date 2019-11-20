const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
		contentId
    name
    composites {
      longDescription
      labels
      className
    }
}
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
