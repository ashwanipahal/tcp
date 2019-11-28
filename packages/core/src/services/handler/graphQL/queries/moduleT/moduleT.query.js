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
			mediaLinkedList {
				image {
					url
					title
					alt
					crop_d
					crop_t
					crop_m
        }
        video{
          url
          title
          autoplay
          controls
          loop
          muted
          inline
        }
				link {
					url
					text
					target
					title
				}
			}
			ctaItems {
				button {
					url
					text
					target
					title
				}
				image {
					url
					title
					alt
					crop_d
					crop_t
					crop_m
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
