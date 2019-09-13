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
    imgConfig: ['t_mod_J_img_m', 't_mod_J_img_t', 't_mod_J_img_d'],
    largeImgConfig: ['t_mod_J_img_large_m', 't_mod_J_img_large_t', 't_mod_J_img_large_d'],
  },
};
