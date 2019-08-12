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
          text
          title
          target
        }
      }
      promoBanner {
        link {
          url
          text
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

      imageGrid {
        class {
          class
        }
        image {
          url
          alt
          crop_d
          crop_t
          crop_m
        }
        styled {
          text
        }
        link {
          url
          text
          title
          target
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
