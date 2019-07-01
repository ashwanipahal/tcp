import theme from '@tcp/core/styles/themes/TCP';

const { breakpoints } = theme;
export default {
  CAROUSEL_OPTIONS: {
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    fade: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.smallMax, 10),
        settings: {
          arrows: false,
        },
      },
    ],
  },
  MODULE_H_CTALINKS: {
    minLimit: 4,
    maxLimit: 6,
  },
  FULL_BLEED: {
    small: true,
    medium: false,
    large: false,
  },
  COL_SIZE: {
    small: 6,
    medium: 8,
    large: 12,
  },
  OFFSET_LEFT: {
    small: 0,
    medium: 1,
    large: 1,
  },
  MODULE_STYLE: {
    height: 425,
  },
};
