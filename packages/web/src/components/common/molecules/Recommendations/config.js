import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';

export default {
  CAROUSEL_OPTIONS: {
    autoplay: false,
    infinite: true,
    arrows: true,
    fade: false,
    speed: 200,
    swipeToSlide: true,
    dots: false,
    dotsClass: 'slick-dots',
    swipe: true,
    slide: true,
    touchMove: true,
    touchThreshold: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: breakpoints.values.lg - 1,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: breakpoints.values.sm - 1,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 1,
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
};
