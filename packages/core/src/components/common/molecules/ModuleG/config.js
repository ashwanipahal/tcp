import theme from '../../../../../styles/themes/TCP';

const { breakpoints } = theme;

export default {
  TOTAL_IMAGES: 15,
  CAROUSEL_OPTIONS: {
    autoplay: false,
    arrows: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '20px',
    fade: false,
    speed: 1000,
    dots: false,
    swipe: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: -1,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: {
          slidesToShow: 3,
          // centerPadding: '50px',
          arrows: false,
          swipeToSlide: true,
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
