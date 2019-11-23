const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
    contentId
    name
    type
    set {
      val
      key
    }
    errorMessage
    composites {
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
