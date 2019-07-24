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
        icon {
          placement
          icon
        }
        link {
          url
          text
          title
          target
          external
        }
      }

      promoTextBanner {
        linkClass {
          url
          text
          title
          target
          external
        }
        textItems {
          text
          style
        }
      }

      imageGrid {
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
          external
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
