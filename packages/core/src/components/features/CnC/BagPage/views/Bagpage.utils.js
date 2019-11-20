import throttle from 'lodash/throttle';
import { getProductDetails } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import { isClient, scrollPage } from '../../../../../utils';

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

const formatBagProductsData = cartOrderItems => {
  const productsData = [];
  if (cartOrderItems) {
    cartOrderItems.map(tile => {
      const productDetail = getProductDetails(tile);
      const {
        itemInfo: { itemId, color, name, offerPrice, size, listPrice },
        productInfo: { skuId, upc, productPartNumber },
      } = productDetail;

      const prodData = {
        color,
        id: itemId,
        name,
        price: offerPrice,
        extPrice: offerPrice,
        sflExtPrice: offerPrice,
        listPrice,
        partNumber: productPartNumber,
        size,
        upc,
        sku: skuId.toString(),
      };
      productsData.push(prodData);
      return prodData;
    });
  }
  return productsData;
};

const setBagPageAnalyticsData = (setClickAnalyticsDataBag, cartOrderItems) => {
  const productsData = formatBagProductsData(cartOrderItems);
  setClickAnalyticsDataBag({
    customEvents: ['scView', 'scOpen', 'event80'],
    products: productsData,
  });
};

const getDefaultStateValues = () => {
  return {
    activeSection: null,
    showCondensedHeader: false,
    loadPaypalStickyHeader: false,
    showStickyHeaderMob: false,
    headerError: false,
  };
};

const onPageUnload = () => {
  scrollPage();
};

export default {
  getElementStickyPosition,
  bindScrollEvent,
  getPageLevelHeaderHeight,
  setBagPageAnalyticsData,
  formatBagProductsData,
  getDefaultStateValues,
  onPageUnload,
};
