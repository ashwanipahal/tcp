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
    lazyLoad: true,
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
  CAROUSEL_MOBILE_DEFAULTS: {
    autoplay: true,
    loop: true,
    vertical: true,
    autoplayDelay: 1000,
    autoplayInterval: 3000,
  },
  CAROUSEL_MOBILE_CONFIG: {
    playIconHeight: 30,
    playIconWidth: 30,
  },
};

export default config;
