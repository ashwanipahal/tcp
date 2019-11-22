const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type
    set {
      key
      val
    }
    composites {
      headLine {
          text
          style
      }
      subHeadLine {
          text
          style
      }
      ctaItems {
        button {
          url
          text
          title
        }
      }
      mediaWrapper {
        image{
          url
         	alt
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
