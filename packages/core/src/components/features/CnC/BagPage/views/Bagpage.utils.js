import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import { breakpoints } from '@tcp/core/styles/themes/TCP/mediaQuery';
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

const handleChangeActiveSection = (sectionName, scope) => {
  scope.setState({
    activeSection: sectionName,
  });
};

const BagPagePropTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  orderItemsCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  showAddTobag: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isGuest: PropTypes.bool.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  sflItems: PropTypes.shape([]).isRequired,
  setVenmoPaymentInProgress: PropTypes.func.isRequired,
  isShowSaveForLaterSwitch: PropTypes.bool.isRequired,
  orderBalanceTotal: PropTypes.number.isRequired,
  bagStickyHeaderInterval: PropTypes.number.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  isSflItemRemoved: PropTypes.bool.isRequired,
  isBagPage: PropTypes.bool.isRequired,
};

const CarouselOptions = {
  CAROUSEL_OPTIONS: {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: breakpoints.values.lg - 1,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: breakpoints.values.sm - 1,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  },
};

export default {
  getElementStickyPosition,
  bindScrollEvent,
  getPageLevelHeaderHeight,
  setBagPageAnalyticsData,
  formatBagProductsData,
  getDefaultStateValues,
  onPageUnload,
  BagPagePropTypes,
  CarouselOptions,
  handleChangeActiveSection,
};
