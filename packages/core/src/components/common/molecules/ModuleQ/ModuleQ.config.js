import theme from '../../../../../styles/themes/TCP';

const { breakpoints } = theme;

export default {
  TOTAL_IMAGES: 7,
  CAROUSEL_OPTIONS: {
    autoplay: false,
    arrows: true,
    centerMode: true,
    centerPadding: '0px',
    fade: false,
    speed: 500,
    dots: true,
    swipe: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: parseInt(breakpoints.medium, 10) - 1,
        settings: {
          slidesToShow: 1,
          centerPadding: '75px',
          arrows: false,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: parseInt(breakpoints.large, 10) - 1,
        settings: {
          slidesToShow: 1,
          centerPadding: '197px',
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
  viaModule: 'Recommendation',
};
