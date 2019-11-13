const buildQuery = ({ slot, contentId, lang }) => `
 ${slot}: moduleById(id: "${contentId}", lang: "${lang}") {
   contentId
   name
   type
   set {
     val
     key
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

    linkedImage {
      link {
        url
        text
        title
        target
      }
      image {
        url
        alt
        crop_d
        crop_t
        crop_m
      }
    }

    ribbonBanner {
      textItems {
        text
        style
      }
      link {
        url
        text
        title
        target
      }
      ribbonPlacement
      ribbonClass
    }

    singleCTAButton {
      url
      text
      target
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
