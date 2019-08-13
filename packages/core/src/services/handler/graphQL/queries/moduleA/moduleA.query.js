const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
	contentId
	name
	type

	composites {
		largeCompImageCarousel {
			headerText {
          			textItems {
            				text
            				style
          			}
          			icon {
            				placement
            				icon
          			}
         			link {
           				url
            				title
            				target
            				external
				}
       			}

			promoBanner {
				link {
					url
					title
				}
				textItems {
					text
					style
				}
			}

			ribbonBanner {
				textItems {
					text
					style
				}
				link {
					url
				}
				ribbonPlacement
				ribbonClass
			}

			linkedImage {
				link {
					url
				}
				image {
					url
				}
			}
		}

		linkList {
			url
			text
		}

		CTAButtonCarousel {
			url
			text
		}

		stackedCTAButtons {
			url
			text
		}

		divImageCTACarousel {
			link {
				url
			}
			image {
				url
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
