import { breakpoints } from '../../../../../styles/themes/TCP/mediaQuery';

export default {
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
    imgConfig: [`t_mod_K_img_m`, `t_mod_K_img_t`, `t_mod_K_img_d`],
  },
};
