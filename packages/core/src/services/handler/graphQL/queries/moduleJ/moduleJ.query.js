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
      mediaLinkedList {
        image {
          url
          title
          alt
          crop_d
          crop_t
          crop_m
        }
        link {
         url
         text
         target
         title
        }
      }
      divTabs {
        text {
          text
        }
        category {
          cat_id
        }
        singleCTAButton {
          url
          text
          target
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
