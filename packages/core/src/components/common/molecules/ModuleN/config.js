export const config = {
  ctaTypes: {
    stackedCTAButtons: 'stackedCTAList',
    linkList: 'linkCTAList',
    CTAButtonCarousel: 'scrollCTAList',
    divImageCTACarousel: 'imageCTAList',
    stackedCTAButtonsExpandable: 'dropdownButtonCTA',
    CTAButtonCarouselExpandable: 'scrollCTAList',
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

export const ctaTypeProps = {
  stackedCTAButtonsExpandable: {
    dualVariation: {
      name: 'dropdownButtonCTA',
      displayProps: {
        small: false,
        medium: true,
        large: true,
      },
    },
  },
  CTAButtonCarouselExpandable: {
    dualVariation: {
      name: 'dropdownButtonCTA',
      displayProps: {
        small: false,
        medium: true,
        large: true,
      },
    },
  },
};
