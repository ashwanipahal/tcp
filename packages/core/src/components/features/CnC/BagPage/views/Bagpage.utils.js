import throttle from 'lodash/throttle';
import { isClient } from '../../../../../utils';

const getOffset = elem => {
  let x = 0;
  let y = 0;
  let el = elem;
  while (el && !Number.isNaN(el.offsetLeft) && !Number.isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: y, left: x };
};

const getElementStickyPosition = elem => {
  return elem && getOffset(elem).top;
};

const bindScrollEvent = callBack => {
  if (isClient()) {
    window.addEventListener('scroll', throttle(callBack, 100));
  }
};

const getPageLevelHeaderHeight = () => {
  return document.getElementsByClassName('condensed-header')[0]
    ? document.getElementsByClassName('condensed-header')[0].offsetHeight
    : 0;
};

export default {
  getElementStickyPosition,
  bindScrollEvent,
  getPageLevelHeaderHeight,
};
