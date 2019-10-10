const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type
    set {
      val
      key
    }
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
        }
      }

      divCTALinks {
          link {
            url
            title
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
