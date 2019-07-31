const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type

    composites {

      masonryGrid {
        mediaList {
          url
          title
          alt
          crop_d
          crop_t
          crop_m
        }
        promoBanner {
          textItems {
            text
          }
          linkClass {
            class
          }
        }
        promoTextBanner {
          textItems {
            text
            style
          }
          linkClass {
            class
          }
        }
        mediaLinkedList {
          image {
            alt
          }
          link {
            target
          }
        }
        singleCTAButton {
          url
          text
          title
          target
          external
        }
      }

      headerText {
        textItems {
          text
          style
        }
        link {
          url
          text
          title
          external
          target
        }
      }

      promoTextBanner {
        textItems {
          text
        }
        linkClass {
          class
        }
      }

      smallCompImage {
        link {
          url
          title
          target
          external
        }
        image {
          url
          title
          alt
        }
      }

      singleCTAButton {
        url
        target
        title
        external
      }
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
