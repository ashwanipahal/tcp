const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}") {
    contentId
    name
    type
    composites {
      headLine {
        text
        style
      }
      subHeadLine {
        text
        style
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
    }
}
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
