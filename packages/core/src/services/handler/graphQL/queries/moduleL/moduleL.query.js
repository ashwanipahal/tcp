const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
    contentId
    name
    type
    set {
      key
      val
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
        color {
          color
        }
        image {
          url
          alt
          crop_d
          crop_t
          crop_m
        }
        video{
          url
          title
          autoplay
          controls
          loop
          muted
          inline
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
