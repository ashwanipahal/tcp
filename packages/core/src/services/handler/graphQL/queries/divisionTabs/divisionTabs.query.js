const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
		contentId
		name
		type
		set {
			val
			key
		}
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
