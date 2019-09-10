import { breakpoints } from '../../../../../styles/themes/TCP/mediaQuery';

export default {
  CAROUSEL_OPTIONS: {
    autoplay: true,
    arrows: true,
    autoplaySpeed: 4000,
    fade: false,
    speed: 1000,
    dots: false,
    dotsClass: 'slick-dots',
    swipe: true,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: breakpoints.values.lg,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoints: breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  },
};
