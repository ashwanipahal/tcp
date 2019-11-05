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
    headLine {
      text
      style
    }
    imageTileWrapper {
      imageStyled {
        image {
          url
          alt
          title
          crop_d
          crop_t
          crop_m
        }
        styled {
          text
        }
      }
      headLine {
        text
        style
      }
      subHeadLine {
        text
        style
      }
      textList {
        text
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
