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

export const bannerPositionTypes = {
  top: 'top',
  topAlt: 'topAlt',
  bottom: 'bottom',
  overlay: 'overlay',
};

export const MODULE_WIDTH_HALF = 'half';

export default {
  ctaIdentifiers: {
    STACK_CTA: 'stackedCTAButtons',
    SCROLL_CTA: 'CTAButtonCarouselExpandable',
    IMAGE_CTA: 'divImageCTACarousel',
  },
};

export const IMG_DATA = {
  imgOverlayConfig: ['t_mod_B_img_overlay_m', 't_mod_B_img_overlay_t', 't_mod_B_img_overlay_d'],
  imgDefaultConfig: ['t_mod_B_img_default_m', 't_mod_B_img_default_t', 't_mod_B_img_default_d'],
};
