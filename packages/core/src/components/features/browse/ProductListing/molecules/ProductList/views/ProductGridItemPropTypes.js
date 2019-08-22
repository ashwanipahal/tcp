import PropTypes from 'prop-types';
import {
  MISC_INFO_PROP_TYPES_SHAPE,
  PRODUCT_INFO_PROP_TYPE_SHAPE,
  COLOR_PROP_TYPE,
  PRODUCT_INFO_PROP_TYPES,
} from '../propTypes/productsAndItemsPropTypes';

export default {
  currencyExchange: PropTypes.shape({
    exchangevalue: PropTypes.number,
  }),
  /** */
  isMobile: PropTypes.bool.isRequired,

  item: PropTypes.shape({
    productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
    miscInfo: MISC_INFO_PROP_TYPES_SHAPE.isRequired,

    colorsMap: PropTypes.arrayOf(
      PropTypes.shape({
        color: COLOR_PROP_TYPE.isRequired,
        colorProductId: PropTypes.string.isRequired,
        miscInfo: MISC_INFO_PROP_TYPES_SHAPE.isRequired,
      })
    ).isRequired,

    imagesByColor: PRODUCT_INFO_PROP_TYPES.imagesByColor.isRequired,
    sqnNmbr: PropTypes.number.isRequired,

    /* TODO: Per Ben's request, commenting availability until Product defines what to do with badges */
    // eslint-disable-next-line extra-rules/no-commented-out-code
    // availability: ITEM_INFO_PROP_TYPES.availability.isRequired
  }).isRequired,
  sqnNmbr: PropTypes.number.isRequired,
  /** When flase, flags that BOPIS is globaly disabled */
  //  isBopisEnabled: PropTypes.bool,
  isPLPredesign: PropTypes.bool,
  siblingProperties: PropTypes.bool,
  loadedProductCount: PropTypes.number,
  /** flags whether to show the quickview card */
  // isShowQuickView: PropTypes.bool.isRequired,
  /** callback for clicks on quickView CTAs. Accepts: generalProductId, colorProductId */
  onQuickViewOpenClick: PropTypes.func.isRequired,

  /** callback for clicks on BOPIS CTAs. Accepts: generalProductId, initialValues, colorProductId. Required if isBopisEnabled prop is true. */
  onPickUpOpenClick: PropTypes.func,
  onQuickBopisOpenClick: PropTypes.func,
  /** callback for clicks on wishlist CTAs. Accepts: colorProductId. */
  onAddItemToFavorites: PropTypes.func,

  /** indicates monies symbol to represent the product's currency */
  currencySymbol: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,

  /**
   *  Callback to trigger when the user chooses to display a different color.
   *  Accepts colorProductId.
   *  Returns a promise that resolves to an object with the structure MISC_INFO_PROP_TYPES_SHAPE.
   */
  // onColorChange: PropTypes.func.isRequired,

  /** Mobile Two column mobile AB Test */
  // isGridView: PropTypes.bool.isRequired,
  isShowVideoOnPlp: PropTypes.bool,
  isMatchingFamily: PropTypes.bool,
  isKeepAliveKillSwitch: PropTypes.bool,

  /** This unbxd request ID will be passed to UNXD product click anlytics as request ID */
  unbxdId: PropTypes.string.isRequired,

  isCanada: PropTypes.bool.isRequired,
  isPlcc: PropTypes.bool.isRequired,

  /* This is the flag that will tell the component if it should render the onModel images and not the regular ones */
  isOnModelImgDisplay: PropTypes.bool.isRequired,
  /* We are available to know if is an international shipping */
  isInternationalShipping: PropTypes.bool,

  /* This is AB test for Pickup CTA */
  // isPLPShowPickupCTA: PropTypes.bool,
};
