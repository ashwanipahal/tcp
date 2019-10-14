import theme from '../../../../../styles/themes/TCP';

const { breakpoints } = theme;

export default {
  TOTAL_IMAGES: 15,
  CAROUSEL_OPTIONS: {
    autoplay: false,
    arrows: true,
    centerMode: true,
    centerPadding: '0px',
    fade: false,
    speed: 1000,
    lazyLoad: false,
    dots: false,
    swipe: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: {
          slidesToShow: 1,
          arrows: false,
          swipeToSlide: true,
          centerPadding: '18%',
        },
      },
      {
        breakpoint: parseInt(breakpoints.large, 10) - 1,
        settings: {
          slidesToShow: 3,
          arrows: false,
          swipeToSlide: true,
          centerPadding: '13%',
        },
      },
    ],
  },
  IMG_DATA: {
    productImgConfig: ['t_mod_J_product_m', 't_mod_J_img_product_t', 't_mod_J_img_product_d'],
    promoImgConfig: ['t_mod_J_img_promo_m', 't_mod_J_img_promo_t', 't_mod_J_img_promo_d'],
  },
  PROMO_IMG_DATA: {
    imgConfig: [
      'c_fill,g_face:center,h_310,w_375',
      'c_fill,g_face:center,h_158,w_177',
      'c_fill,g_face:center,h_219,w_279',
    ],
  },
};
