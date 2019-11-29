const buildQuery = ({ slot, contentId }) => `
  ${slot}: moduleById(id: "${contentId}")  {
    contentId
    name
    type
    set {
      key
      val
    }
    composites {
      mediaWrapper {
				url
        crop_d
        crop_t
        crop_m
        title
        alt
        position
        alt
      }
    }
  }
`;

export default {
  getQuery: data => {
    return buildQuery(data);
  },
};
