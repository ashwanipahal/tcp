const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
		contentId
		name
		type
		errorMessage
		composites {
			promoWrapper {
				url
				text
				title
				target
				external
				action
			}
			subHeadLine {
				text
				style
			}
			mediaWrapper {
				url
				alt
				title
			}
			textItems {
				text
				style
			}
		}
}
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
