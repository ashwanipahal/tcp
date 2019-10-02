const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type
  	set {
      key
      val
    }
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
            text
          }
          textItems {
            text
            style
          }
        }
        linkedImage {
          link {
            url
            text
            title
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
      }
      ctaItems {
        button {
          url
          text
          title
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
