/**
 * @description - Global config values
 */

import theme from '@tcp/core/styles/themes/TCP';

const { breakpoints } = theme;
const config = {
  CAROUSEL_DEFAULTS: {
    accessibility: true,
    autoplaySpeed: 3000, // TODO: Has to come from CMS Config
    arrows: false,
    dots: false,
    slidesToShow: 1,
    speed: 300, // TODO: Has to come from CMS Config
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: parseInt(breakpoints.large, 10) - 1,
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: parseInt(breakpoints.large, 10),
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
  PROMO_AREA_DEFAULTS: {
    accessibility: true,
    autoplaySpeed: 3000, // TODO: Has to come from CMS Config
    mobileFirst: true,
    slidesToShow: 1,
    speed: 300, // TODO: Has to come from CMS Config
    responsive: [
      {
        breakpoint: parseInt(breakpoints.large, 10) - 1,
        settings: 'unslick',
      },
    ],
  },
};

export default config;
