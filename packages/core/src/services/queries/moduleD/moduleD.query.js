const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type

    composites {
      headerText {
        textLines {
          text
          color
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
        items {
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
      }

      smallCompImage {
        items {
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
