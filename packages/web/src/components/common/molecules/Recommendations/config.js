import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';

export default {
  CAROUSEL_OPTIONS: {
    infinite: true,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 4000,
    fade: false,
    speed: 1000,
    dots: false,
    dotsClass: 'slick-dots',
    swipe: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: breakpoints.values.lg - 1,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: breakpoints.values.sm - 1,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  },
  params: {
    moduleO: {
      dataLocator: 'moduleO_header_text',
      dataLocatorCTA: 'moduleO_cta_btn',
    },
    moduleP: {
      dataLocator: 'moduleP_header_text',
      dataLocatorCTA: 'moduleP_cta_btn',
    },
  },
  variations: {
    moduleO: 'moduleO',
    moduleP: 'moduleP',
  },
  viaModule: 'Recommendation',
};
