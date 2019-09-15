import { breakpoints } from '../../../../../styles/themes/TCP/mediaQuery';

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
    slideToScroll: 1,
    responsive: [
      {
        breakpoint: breakpoints.values.lg - 1,
        settings: {
          slidesToShow: 3.25,
          autoplay: false,
          infinite: false,
        },
      },
      {
        breakpoint: breakpoints.values.sm - 1,
        settings: {
          arrows: false,
          autoplay: false,
          slidesToShow: 2.3,
          infinite: false,
        },
      },
    ],
  },
};
