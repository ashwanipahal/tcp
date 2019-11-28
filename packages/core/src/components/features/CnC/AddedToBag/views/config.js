import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';

export default {
  CAROUSEL_OPTIONS: {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: breakpoints.values.lg - 1,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
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
};
