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
