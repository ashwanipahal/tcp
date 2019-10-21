import throttle from 'lodash/throttle';
import { isClient } from '../../../../../utils';

const getElementStickyPosition = elem => {
  return elem && elem.offsetTop;
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

const removeScrollListener = () => {
  const stickyPos = getElementStickyPosition(this.bagPageHeader);
  const checkoutCtaStickyPos = getElementStickyPosition(this.bagActionsContainer);
  window.removeEventListener('scroll', throttle(this.handleScroll.bind(this, stickyPos), 100));
  window.removeEventListener(
    'scroll',
    throttle(this.handleBagHeaderScroll.bind(this, checkoutCtaStickyPos), 100)
  );
};

export default {
  getElementStickyPosition,
  bindScrollEvent,
  getPageLevelHeaderHeight,
  removeScrollListener,
};
