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
      ctaItems {
        button {
          url
          text
          target
          title
          external
        }
        image {
          url
          title
          alt
          crop_d
          crop_t
          crop_m
          position
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
