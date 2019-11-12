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
  IMG_DATA: {
    eyeBrowImgConfig: ['t_mod_E_eyebrow_img_m', 't_mod_E_eyebrow_img_t', 't_mod_E_eyebrow_img_d'],
    carouselImgConfig: [
      't_mod_E_carousel_img_m',
      't_mod_E_carousel_img_t',
      't_mod_E_carousel_img_d',
    ],
    smallImgConfig: ['t_mod_E_small_img_m', 't_mod_E_small_img_t', 't_mod_E_small_img_d'],
    promoAreaImgConfig: [
      't_mod_E_promo_area_img_m',
      't_mod_E_promo_area_img_t',
      't_mod_E_promo_area_img_d',
    ],
  },
};
