export default {
  CAROUSEL_OPTIONS: {
    autoplay: true,
    arrows: true,
    autoplaySpeed: 4000,
    fade: false,
    speed: 1000,
    dots: true,
    dotsClass: 'slick-dots',
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  },
  IMG_DATA: {
    crops: [
      'c_fill,g_face:center,q_auto:best,h_311,w_767',
      'c_fill,g_face:center,q_auto:best,h_406,w_768',
      'c_fill,g_face:center,q_auto:best,h_474,w_1410',
    ],
  },
};
