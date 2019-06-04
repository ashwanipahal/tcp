/**
 * @description - Global config values
 */

const config = {
  CAROUSEL_DEFAULTS: {
    accessibility: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: false,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        arrows: false,
        autoplay: false,
        settings: 'unslick',
      },
    ],
  },
};

export default config;
