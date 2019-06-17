/**
 * @description - Global config values
 */

import theme from '@tcp/core/styles/themes/TCP';
import utilMethods from '@tcp/core/src/utils/utilMethods';

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
        breakpoint: utilMethods.stripPx(breakpoints.medium) - 1,
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: utilMethods.stripPx(breakpoints.large) - 1,
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: utilMethods.stripPx(breakpoints.large),
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
};

export default config;
