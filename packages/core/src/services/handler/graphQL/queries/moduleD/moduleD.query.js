const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
    contentId
    name
    type
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
          text
          target
        }
      }

      promoBanner {
          link {
            url
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

      smallCompImage {
          link {
            url
            title
            text
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
          video{
            url
            title
            autoplay
            controls
            loop
            muted
            inline
          }
      }

      singleCTAButton {
        url
        target
        text
        title
      }
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
