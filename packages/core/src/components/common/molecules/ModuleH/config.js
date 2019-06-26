import theme from '@tcp/core/styles/themes/TCP';

const { breakpoints } = theme;
export default {
  CAROUSEL_OPTIONS: {
    autoplay: true,
    arrows: false,
    autoplaySpeed: 4000,
    fade: true,
    infinite: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: {
          arrows: false,
        },
      },
    ],
  },
  MODULE_H_CTALINKS: {
    maxLimit: 6,
  },
};
