const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type
    composites {
      largeCompImage {
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
            external
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
          link {
            url
          }
          image {
            url
          }
        }
      }
      ctaItems {
        button {
          url
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
