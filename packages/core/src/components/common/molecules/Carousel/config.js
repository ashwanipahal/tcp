/**
 * @description - Global config values
 */

const config = {
  CAROUSEL_DEFAULTS: {
    accessibility: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: false,
    slidesToShow: 3,
    speed: 300,
    responsive: [
      {
        breakpoint: 767, // TODO: Breakpoint has to come from config
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023, // TODO: Breakpoint has to come from config
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // TODO: Breakpoint has to come from config
        arrows: false,
        autoplay: false,
        settings: 'unslick',
      },
    ],
  },
};

export default config;
