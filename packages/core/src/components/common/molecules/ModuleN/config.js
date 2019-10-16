export default {
  ctaTypes: {
    stackedCTAButtons: 'stackedCTAList',
    linkList: 'linkCTAList',
    CTAButtonCarousel: 'scrollCTAList',
    divImageCTACarousel: 'imageCTAList',
  },
  getColSize: moduleWidth => {
    const colSize = {
      small: 6,
      medium: 8,
      large: 12,
    };
    if (moduleWidth.toLowerCase() === 'half') {
      colSize.large = 6;
    }
    return colSize;
  },
};
