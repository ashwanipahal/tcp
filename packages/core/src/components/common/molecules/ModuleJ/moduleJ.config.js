import theme from '../../../../../styles/themes/TCP';

const { breakpoints } = theme;

export default {
  TOTAL_IMAGES: 15,
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
    productImgConfig: ['t_mod_J_img_product_m', 't_mod_J_img_product_t', 't_mod_J_img_product_d'],
    promoImgConfig: ['t_mod_J_img_promo_m', 't_mod_J_img_promo_t', 't_mod_J_img_promo_d'],
  },
};
