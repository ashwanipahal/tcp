import { breakpoints } from '../../../../../../../styles/themes/TCP/mediaQuery';

const CAROUSEL_OPTIONS = {
  autoplay: false,
  arrows: true,
  autoplaySpeed: 4000,
  fade: false,
  speed: 1000,
  dots: true,
  dotsClass: 'slick-dots',
  focusOnSelect: true,
  swipe: true,
  responsive: [
    {
      breakpoint: breakpoints.values.lg,
      settings: {
        arrows: true,
      },
    },
  ],
};
export default CAROUSEL_OPTIONS;
