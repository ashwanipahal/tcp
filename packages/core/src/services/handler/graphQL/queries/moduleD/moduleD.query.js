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
          title
          text
          target
          external
        }
      }

      promoBanner {
          link {
            url
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

      smallCompImage {
          link {
            url
            title
            text
            target
            external
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
