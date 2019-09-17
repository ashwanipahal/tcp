export default {
  stackedCTAList: {
    compClassName: 'stacked-cta-wrapper',
    ctaInfo: {
      className: 'stacked-button',
      ctaVariation: 'fixed-width',
    },
    MAX_NUM_OF_BUTTONS_IN_A_ROW: 5,
    noCurveMobile: true,
  },
  scrollCTAList: {
    compClassName: 'scroll-cta-wrapper',
    ctaInfo: {
      className: 'scroll-button',
      ctaVariation: 'variable-width',
    },
    MAX_NUM_OF_BUTTONS_IN_A_ROW: 5,
    MIN_NO_OF_BUTTONS_TO_SCROLL: 3,
  },
  imageCTAList: {
    compClassName: 'scroll-cta-wrapper',
    ctaInfo: {
      className: 'image-cta',
    },
    MAX_NUM_OF_BUTTONS_IN_A_ROW: 5,
    MIN_NO_OF_BUTTONS_TO_SCROLL: 4,
  },
  linkCTAList: {
    compClassName: 'link-button-wrapper',
    ctaInfo: {
      className: 'link-button',
      ctaVariation: 'category-links-dark',
    },
    compWrapper: 'link-button-list-wrapper',
  },
  buttonListVariations: {
    STACKED_CTA: 'stackedCTAList',
    LINK_CTA: 'linkCTAList',
    SCROLL_CTA: 'scrollCTAList',
    IMAGE_CTA: 'imageCTAList',
    DROPDOWN_CTA: 'dropdownButtonCTA',
  },
};
