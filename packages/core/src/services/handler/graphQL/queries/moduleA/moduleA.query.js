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
				}
				image {
          url
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
