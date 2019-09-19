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
          alt
          crop_d
          crop_t
          crop_m
				}
				image {
					url
				}
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
