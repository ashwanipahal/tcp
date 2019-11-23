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
        medium: false,
        large: true,
      },
    },
  },
  CTAButtonCarouselExpandable: {
    dualVariation: {
      name: 'dropdownButtonCTA',
      displayProps: {
        small: false,
        medium: false,
        large: true,
      },
    },
  },
};

export default {
  crops: ['t_mod_img_txt_m', 't_mod_img_txt_t', 't_mod_img_txt_d'],
};
