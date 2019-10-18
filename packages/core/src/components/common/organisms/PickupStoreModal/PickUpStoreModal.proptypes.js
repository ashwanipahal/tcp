import PropTypes from 'prop-types';

export const REGULAR_HOURS_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    dayName: PropTypes.string.isRequired,
    openIntervals: PropTypes.arrayOf(
      PropTypes.shape({
        fromHour: PropTypes.string.isRequired,
        toHour: PropTypes.string.isRequired,
      })
    ).isRequired,
    isClosed: PropTypes.bool.isRequired,
  })
);

// TODO - This duplicates lots of proptypes defined in features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes      s s
// Both should be kept in common place to be used by other pods as well..

/** describes a color or a pattern of a product/SKU */
export const COLOR_PROP_TYPE = PropTypes.shape({
  /** the id as well as the display name of the color */
  name: PropTypes.string.isRequired,
  /** the url of an image of this color/pattern */
  imagePath: PropTypes.string.isRequired,
});

/** describes pricing information for a product/SKU */
export const PRICING_PROP_TYPES = {
  /** price before any discounts */
  listPrice: PropTypes.number.isRequired,
  /** price after discount */
  offerPrice: PropTypes.number.isRequired,
};

/** describes pricing information for a product/SKU */
export const OPTIONAL_PRICING_PROP_TYPES = {
  /** price before any discounts */
  listPrice: PropTypes.number,
  /** price after discount */
  offerPrice: PropTypes.number,
};

/** availability and pickup information for a product/SKU */
export const MISC_INFO_PROP_TYPES = {
  /** Flags if this SKU/product is eligible for bopis - there are cases where item is NOT eligible but selected as bopis,
  so we need to show an error message */
  isBopisEligible: PropTypes.bool,

  /** Flags if this SKU/product is a clearance item (used e.g., in wishlist sorting) */
  clearanceItem: PropTypes.bool,

  /** Flags if this SKU/product is a new arrival (used e.g., in wishlist sorting) */
  newArrivalItem: PropTypes.bool,

  /** optional badges (such as "Online Only") to show */
  badge1: PropTypes.objectOf(
    PropTypes.shape({
      matchBadge: PropTypes.string,
      defaultBadge: PropTypes.string,
    })
  ),
  badge2: PropTypes.string,
  badge3: PropTypes.string,

  isInDefaultWishlist: PropTypes.bool,

  ...OPTIONAL_PRICING_PROP_TYPES,
};

export const MISC_INFO_PROP_TYPES_SHAPE = PropTypes.shape(MISC_INFO_PROP_TYPES);

export const COLOR_FITS_SIZES_MAP_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    color: COLOR_PROP_TYPE.isRequired,
    colorProductId: PropTypes.string.isRequired, // the id of this product in this color
    colorDisplayId: PropTypes.string, // the id of this product in this color to display and send to recommendations API
    miscInfo: MISC_INFO_PROP_TYPES_SHAPE,
    favoritedCount: PropTypes.number, // the number of times other users put an item with this colorProductId in thier wishlists
    maxAvailable: PropTypes.number.isRequired, // the maximum value of any nested maxAvailable value
    hasFits: PropTypes.bool.isRequired, // indicates if this product has fits associated with it (if false, the fits array should have a single element)
    fits: PropTypes.arrayOf(
      PropTypes.shape({
        fitName: PropTypes.string, // ignored if the hasFits flag is false
        isDefault: PropTypes.bool, // indicates that this fit is the default fit for this color
        maxAvailable: PropTypes.number.isRequired, // the maximum value of any nested maxAvailable value
        sizes: PropTypes.arrayOf(
          PropTypes.shape({
            sizeName: PropTypes.string.isRequired,
            skuId: PropTypes.string.isRequired, // the id of the SKU for the product in this color, fit and size
            maxAvailable: PropTypes.number.isRequired, // the maximum number of available items for sale of this SKU
            ...OPTIONAL_PRICING_PROP_TYPES, // the pricing info associated with this sku (optionlaly overriding the pricing at higher levels)
          })
        ).isRequired,
      })
    ).isRequired,
  })
);

export const BOPIS_PRODUCT_INFO_PROP_TYPES = {
  /** The name of the item (e.g. 'Boys Five-Pocket Skinny Corduroy Pants') */
  name: PropTypes.string.isRequired,
  /** Standard pricing attr */
  ...PRICING_PROP_TYPES,
  /** the url of the image of the product */
  imagePath: PropTypes.string.isRequired,
  /**
   * The available color fit and size options for this product
   * Organized in a three level nesting (similar to a site navigation) with L1 being the color,
   * L2 being the fit, and L3 being the size
   */
  colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE,
};

export const CART_BOPIS_STORE_LIST = {
  cartBopisStoresList: PropTypes.arrayOf(
    PropTypes.shape({
      basicInfo: PropTypes.shape({
        storeName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
};

export const COLOR_FIT_SIZE_DISPLAY_NAME = {
  colorFitSizeDisplayNames: PropTypes.shape({
    /** label for color selection field */
    color: PropTypes.string,
    /** label for fit selection field */
    fit: PropTypes.string,
    /** label for size selection field */
    size: PropTypes.string,
  }),
};

export const STORE_SUMMARY_PROP_TYPES = {
  basicInfo: PropTypes.shape({
    /** store id identifier */
    id: PropTypes.string.isRequired,
    /** store Name */
    storeName: PropTypes.string.isRequired,
    /** Store Address contains whole info */
    address: PropTypes.shape({
      addressLine1: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
    }).isRequired,
    /** Phone of the store */
    phone: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
    }),
  }).isRequired,

  hours: PropTypes.shape({
    /**
     * Array of opening and closing hours in which the store is open on convined (both regular and holidays)
     * days.
     */
    regularHours: REGULAR_HOURS_PROP_TYPE,
  }),
  /** The distance of the store from the user, based off their browser geolocation
   * will be -1 if no distance can be found, or string if found '3.2 mi.' */
  distance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default {
  STORE_SUMMARY_PROP_TYPES,
  REGULAR_HOURS_PROP_TYPE,
};
