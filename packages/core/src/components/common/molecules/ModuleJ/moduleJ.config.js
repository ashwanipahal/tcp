import theme from '../../../../../styles/themes/TCP';

const { breakpoints } = theme;

export default {
  CAROUSEL_OPTIONS: {
    autoplay: false,
    arrows: true,
    autoplaySpeed: 2000,
    centerMode: false,
    fade: false,
    speed: 1000,
    dots: false,
    swipe: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          arrows: false,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: parseInt(breakpoints.large, 10) - 1,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          arrows: false,
          swipeToSlide: true,
        },
      },
    ],
  },
  IMG_DATA: {
    imgConfig: [
      'c_fill,g_face,q_80,h_110,w_89',
      'c_fill,g_face,q_80,h_180,w_146',
      'c_fill,g_face,q_80,h_217,w_175',
    ],
  },
  PROMO_IMG_DATA: {
    imgConfig: [
      'c_fill,g_face:center,h_310,w_375',
      'c_fill,g_face:center,h_158,w_177',
      'c_fill,g_face:center,h_215,w_279',
    ],
  },
};
