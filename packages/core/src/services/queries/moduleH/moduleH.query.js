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
      }

      divCTALinks {
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
          styled {
            text
            color
            style
          }
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
