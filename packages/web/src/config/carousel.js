import mediaQuery from '@tcp/core/styles/themes/TCP';

export default {
  CAROUSEL_OPTIONS: {
    autoplaySpeed: 6000,
    speed: 500,
  },
  CAROUSEL_FADE_OPTIONS: {
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: mediaQuery.large - 1,
        settings: {
          arrows: false,
        },
      },
    ],
  },
};
