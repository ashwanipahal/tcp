const buildQuery = ({ slot, contentId, lang }) => `
  ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
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

      divTabs {
        text {
          text
        }
        smallCompImage {
          link {
            url
          }
          image {
            url
          }
        }
        linkClass {
          class
          url
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
