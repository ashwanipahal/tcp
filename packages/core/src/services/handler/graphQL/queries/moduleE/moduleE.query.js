const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {

    contentId
		name
		type
		set {
			val
			key
		}
		composites {
			eyebrow {
				mediaLinkedList {
					image {
						url
						alt
						title
						crop_d
						crop_t
						crop_m
					}
					link {
						url
						text
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
			}
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
			linkedImage {
				image {
					url
					alt
					title
					crop_d
					crop_t
					crop_m
				}
				link {
					url
					text
					title
					target
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

			largeCompImageSimpleCarousel {
				image {
					url
					alt
					title
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

				singleCTAButton {
					url
					text
					title
					target
				}
			}

			divCTALinks {
				image {
					url
					alt
					title
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
				styled {
					text
					style
				}
				link {
					url
					text
					title
					target
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
