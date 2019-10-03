import theme from '../../../../../styles/themes/TCP';

const { breakpoints } = theme;

export default {
  TOTAL_IMAGES: 7,
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
    APP: {
      PRODUCT_IMAGE_WIDTH: 193,
      PRODUCT_IMAGE_HEIGHT: 237,
      MODULE_HEIGHT: 400,
      OUTFIT_ITEM_IMAGE_HEIGHT: 78,
      OUTFIT_ITEM_IMAGE_WIDTH: 63,
      LOOP_CLONES_PER_SIDE: 2,
      INACTIVE_SLIDE_SCALE: 0.75,
      INACTIVE_SLIDE_OPACITY: 0.6,
      ITEM_WIDTH: 230,
    },
  },
  IMG_DATA: {
    productImgConfig: ['t_mod_J_product_m', 't_mod_J_img_product_t', 't_mod_J_img_product_d'],
    promoImgConfig: ['t_mod_J_img_promo_m', 't_mod_J_img_promo_t', 't_mod_J_img_promo_d'],
  },
  PROMO_IMG_DATA: {
    imgConfig: [
      'c_fill,g_face:center,h_310,w_375',
      'c_fill,g_face:center,h_158,w_177',
      'c_fill,g_face:center,h_215,w_279',
    ],
  },
};
