const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type
    set {
      key
      val
    }
    errorMessage
    composites {
      imageGrid {
        image {
          url
          alt
          title
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
          external
          action
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
