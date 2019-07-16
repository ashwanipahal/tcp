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
