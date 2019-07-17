const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type

    composites {
      headerText {
        textLines {
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

      promoBanner {
        link {
          url
          text
          title
          target
          external
        }
        image {
          url
          alt
          title
        }
      }

      masonryGrid {
        mediaList {
          url
          title
          alt
          crop_d
          crop_t
          crop_m
        }
        singleCTAButton {
          url
          text
          title
          target
          external
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
