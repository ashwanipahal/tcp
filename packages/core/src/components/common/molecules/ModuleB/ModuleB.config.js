export const ctaTypes = {
  divImageCTACarousel: 'imageCTAList',
  stackedCTAButtonsExpandable: 'stackedCTAList',
  CTAButtonCarouselExpandable: 'scrollCTAList',
  stackedCTAButtons: 'stackedCTAList',
  CTAButtonCarousel: 'scrollCTAList',
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

export default {
  ctaIdentifiers: {
    STACK_CTA: 'stackedCTAButtons',
    SCROLL_CTA: 'CTAButtonCarouselExpandable',
    IMAGE_CTA: 'divImageCTACarousel',
  },
};
