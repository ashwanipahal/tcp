const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type
    set {
      key
      val
    }
    composites {
      masonryGrid {
        promoBanner {
          textItems {
            text
            style
          }
          link {
            url
            title
            target
            external
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
          link {
            url
            text
            title
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
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
