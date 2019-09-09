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
    crops: [
      'c_fill,g_face:center,q_auto:best,h_622,w_750',
      'c_fill,g_face:center,q_auto:best,h_406,w_768',
      'c_fill,g_face:center,q_auto:best,h_474,w_1410',
    ],
  },
};
