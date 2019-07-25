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
          target
          external
        }
      }

      divCTALinks {
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
          styled {
            text
            style
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
