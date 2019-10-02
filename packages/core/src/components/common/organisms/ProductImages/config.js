import { breakpoints } from '../../../../../styles/themes/TCP/mediaQuery';

export default {
  CAROUSEL_OPTIONS: {
    autoplay: false,
    arrows: true,
    fade: false,
    speed: 0,
    dots: false,
    dotsClass: 'slick-dots',
    swipe: true,
    slidesToShow: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: breakpoints.values.lg - 1,
        settings: {
          dots: true,
          arrows: false,
        },
      },
    ],
  },
};
