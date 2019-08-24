const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type
    composites {
      headerText {
        textItems {
          text
          style
        }
        link {
          url
          title
          text
          target
        }
      }

      promoBanner {
          link {
            url
            title
            target
          }
          image {
            url
            alt
            title
          }
          textItems {
            text
            style
          }
      }

      smallCompImage {
          link {
            url
            title
            text
            target
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
        text
        title
      }
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
