const buildQuery = ({ slot, contentId, cid }) => `
${slot || `promoList`}: moduleById(id: "${contentId || cid}") {
    contentId
    name
    type
    composites {
      promoListWrapper {
        class {
          class
        }
        headLine {
          text
          style
        }
        subHeadLine {
          text
          style
        }
        buttonList {
          url
          text
          external
          title
          action
          target
        }
        image {
          url
          alt
          title
          crop_d
          crop_t
          crop_m
        }
      }
    }
    set {
      key
      val
    }
}
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
