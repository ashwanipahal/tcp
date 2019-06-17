/**
 * @description - Global config values
 */

const config = {
  CAROUSEL_DEFAULTS: {
    accessibility: true,
    autoplaySpeed: 3000, // TODO: Has to come from CMS Config
    arrows: false,
    dots: false,
    slidesToShow: 1,
    speed: 300, // TODO: Has to come from CMS Config
    responsive: [
      {
        breakpoint: 767, // TODO: Breakpoint has to come from CMS config
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023, // TODO: Breakpoint has to come from CMS config
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // TODO: Breakpoint has to come from CMS config
        settings: {
          autoplay: true,
          arrows: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  },
};

export default config;
