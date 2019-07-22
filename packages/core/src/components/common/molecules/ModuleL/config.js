import theme from '@tcp/core/styles/themes/TCP';

const { breakpoints } = theme;

export default {
  CAROUSEL_OPTIONS: {
    autoplay: false,
    arrows: true,
    lazyLoad: false,
    infinite: true,
    speed: 1000,
    dots: true,
    rows: 1,
    slidesPerRow: 1,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: 'unslick',
      },
      {
        breakpoint: parseInt(breakpoints.large, 10) - 1,
        settings: {
          arrows: false,
        },
      },
    ],
  },
  COL_SIZE: {
    small: 6,
    medium: 8,
    large: 5,
  },
};
