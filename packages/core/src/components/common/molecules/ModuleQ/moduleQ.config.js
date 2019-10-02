import theme from '../../../../../styles/themes/TCP';

const { breakpoints } = theme;

export default {
  TOTAL_IMAGES: 7,
  CAROUSEL_OPTIONS: {
    autoplay: false,
    arrows: true,
    autoplaySpeed: 2000,
    centerMode: true,
    fade: false,
    speed: 1000,
    dots: true,
    swipe: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: {
          arrows: false,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: parseInt(breakpoints.large, 10) - 1,
        settings: {
          arrows: false,
          swipeToSlide: true,
        },
      },
    ],
  },
  IMG_DATA: {
    productImgConfig: ['t_mod_Q_product_m', 't_mod_Q_img_product_t', 't_mod_Q_img_product_d'],
    promoImgConfig: ['t_mod_Q_img_promo_m', 't_mod_Q_img_promo_t', 't_mod_Q_img_promo_d'],
  },
  PROMO_IMG_DATA: {
    imgConfig: [
      'c_fill,g_face:center,h_310,w_375',
      'c_fill,g_face:center,h_158,w_177',
      'c_fill,g_face:center,h_215,w_279',
    ],
  },
};
