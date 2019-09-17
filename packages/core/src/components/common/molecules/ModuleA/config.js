import { breakpoints } from '../../../../../styles/themes/TCP/mediaQuery';

export default {
  ctaTypes: {
    stackedCTAButtons: 'stackedCTAList',
    linkList: 'linkCTAList',
    CTAButtonCarousel: 'scrollCTAList',
    divImageCTACarousel: 'imageCTAList',
  },
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
        breakpoint: breakpoints.values.lg,
        settings: {
          arrows: false,
        },
      },
    ],
  },
  IMG_DATA_TCP: {
    crops: ['t_mod_A_img_m', 't_mod_A_img_t', 't_mod_A_img_d'],
  },
  IMG_DATA_GYM: {
    crops: ['t_mod_A_GYM_img_m', 't_mod_A_GYM_img_t', 't_mod_A_GYM_img_d'],
  },
};
