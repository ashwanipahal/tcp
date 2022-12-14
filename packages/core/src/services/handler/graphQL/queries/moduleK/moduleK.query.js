const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
    contentId
    name
    type
    errorMessage
    set {
      key
      val
    }
    composites {
      masonryGrid {
        promoBanner {
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
        mediaLinkedList {
          image {
            url
            title
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
          link {
            url
            text
            title
            target
          }
        }
        singleCTAButton {
          url
          text
          title
          target
        }
      }

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
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
