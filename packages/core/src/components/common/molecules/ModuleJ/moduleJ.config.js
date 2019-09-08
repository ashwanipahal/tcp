import theme from '../../../../../styles/themes/TCP';

const { breakpoints } = theme;

export default {
  CAROUSEL_OPTIONS: {
    autoplay: true,
    arrows: true,
    autoplaySpeed: 2000,
    centerMode: false,
    fade: false,
    speed: 1000,
    dots: false,
    swipe: true,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: {
          slidesToShow: 4,
          arrows: false,
        },
      },
      {
        breakpoint: parseInt(breakpoints.large, 10) - 1,
        settings: {
          slidesToShow: 5,
          arrows: false,
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
};
