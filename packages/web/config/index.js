export default {
  CAROUSEL_OPTIONS: {
    autoplaySpeed: 3000,
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
        breakpoint: 1023, // TODO: Breakpoint has to come from config
        settings: {
          arrows: false,
        },
      },
    ],
  },
};
