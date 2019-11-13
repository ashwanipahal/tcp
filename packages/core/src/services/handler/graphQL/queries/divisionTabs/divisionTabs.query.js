const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
		contentId
		name
		type
		set {
			val
			key
    }
    errorMessage
		composites {
			headLine {
				text
				style
			}
			buttonList {
				id: url
				label: text
				external
				title
				action
				target
			}
		}
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
