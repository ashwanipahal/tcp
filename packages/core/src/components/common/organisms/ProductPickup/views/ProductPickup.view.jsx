/* eslint-disable max-lines */
/** @module ProductPickup
 * @summary Shows the BOPIS CTA in PDP
 *
 */

import React from 'react';
import { PropTypes } from 'prop-types';
import {
  COLOR_FITS_SIZES_MAP_PROP_TYPE,
  PRICING_PROP_TYPES,
} from '../../PickupStoreModal/PickUpStoreModal.proptypes';
import {
  validateSkuDetails,
  validateBossEligibility,
  validateBopisEligibility,
  isBOSSProductOOS,
  isProductOOS,
  numericStringToBool,
  handleGenericKeyDown,
} from '../util';

import {
  getVariantId,
  getMapSliceForSize,
} from '../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { Button } from '../../../atoms';

/** Dummy content slot component - TODO - Remove once it comes from CMS */
const ContentSlot = props => {
  const { contentSlotName } = props;
  return <div>{contentSlotName}</div>;
};

ContentSlot.propTypes = {
  contentSlotName: PropTypes.string,
};

ContentSlot.defaultProps = {
  contentSlotName: '',
};

const labels = {
  CHANGE_STORE: 'Change Store',
  PRODUCT_PICKUP: {
    TITLE_DEFAULT_NOSTORE: 'Pick up in Store',
    PRODUCT_BOPIS: 'Buy online - Pick up in store',
    BOPIS_AVAILABLE: 'Pick up TODAY!',
    BOPIS_ONLY_AVAILABLE: 'Item available for pickup TODAY',
    BOSS_AVAILABLE: 'Or choose NO RUSH Pickup ',
    BOSS_ONLY_AVAILABLE: 'Choose NO RUSH Pickup ',
    PICKUP_IN_STORE: 'PICK UP IN STORE',
  },
  SPACE_ONE: ' ',
  FREE_SHIPPING: 'FREE Shipping Every Day!',
  CHOOSE_STORE: 'CHOOSE STORE',
};

const KEY_CODES = {
  ENTER: 13,
};

/**
 *  Describes a general product, not yet specialized by chosing a color, size, etc.
 *  For example, a product shown in reccomendations, or PDP.
 */
export const PRODUCT_INFO_PROP_TYPES = {
  /* this identifies a product for Bazaarvoice (reviews and ratings component) */
  ratingsProductId: PropTypes.string,

  /** This identifies the product regardless of color/fit/size (i.e., changing size/fit/color does not change this value) */
  generalProductId: PropTypes.string.isRequired,
  /** The name of the product to be displayed to the user */
  name: PropTypes.string.isRequired,
  /** Images for this product in different colors.
   * This is an object of key-vale pairs. the key is the color name, and the value has thew shape described below.
   */
  imagesByColor: PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.shape({
        extraImages: PropTypes.arrayOf(
          PropTypes.shape({
            iconSizeImageUrl: PropTypes.string.isRequired,
            regularSizeImageUrl: PropTypes.string.isRequired,
            bigSizeImageUrl: PropTypes.string.isRequired,
            superSizeImageUrl: PropTypes.string.isRequired,
          })
        ),
      })
    ),
    PropTypes.objectOf(
      PropTypes.shape({
        basicImageUrl: PropTypes.string.isRequired,
      })
    ),
  ]),
  /** optional displayNames of the color fit and size (e.g., for gift cards it is {color: 'Design, size: 'Value']) */
  colorFitSizeDisplayNames: PropTypes.shape({
    color: PropTypes.string,
    fit: PropTypes.string,
    size: PropTypes.string,
  }),
  /**
   * The available color fit and size options for this product
   * Organized in a three level nesting (similar to a site navigation) with L1 being the color,
   * L2 being the fit, and L3 being the size
   */
  colorFitsSizesMap: COLOR_FITS_SIZES_MAP_PROP_TYPE,

  /** SEO Friendly URL required to have the image and title linkable */
  pdpUrl: PropTypes.string.isRequired,

  /* Short description of the product. */
  shortDescription: PropTypes.string,

  /* Long description of the product that may include HTML. */
  longDescription: PropTypes.string,

  /** Flags if this SKU/product is a Gift-Card */
  isGiftCard: PropTypes.bool,

  /** Product price, which may be overriden by sku-level price */
  ...PRICING_PROP_TYPES,
};

export const PRODUCT_INFO_PROP_TYPE_SHAPE = PropTypes.shape(PRODUCT_INFO_PROP_TYPES);

class ProductPickup extends React.Component {
  static propTypes = {
    miscInfo: PropTypes.shape({}),
    isBossEnabled: PropTypes.bool,
    isBopisClearanceProductEnabled: PropTypes.bool,
    isBossClearanceProductEnabled: PropTypes.bool,
    offerEspotAvailable: PropTypes.bool,
    /** When flase, flags that BOPIS is globaly disabled */
    isBopisEnabled: PropTypes.bool,

    /**
     * Information regarding the product at the swatch/color level.
     */
    productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
    /** User's preferred store information */
    userDefaultStore: PropTypes.shape({
      basicInfo: PropTypes.shape({
        /** store id identifier */
        id: PropTypes.string.isRequired,
        /** store Name */
        storeName: PropTypes.string.isRequired,
      }).isRequired,
    }),
    /**
     * User's latitude and longitude coordinates if access is allowed.
     */
    userGeoCoordinates: PropTypes.shape({
      lat: PropTypes.number,
      long: PropTypes.number,
    }),

    /**
     * Item values selected for the product, to use in the BOPIS modal if it
     * gets opened.
     */
    itemValues: PropTypes.shape({
      color: PropTypes.string.isRequired,
      fit: PropTypes.string,
      size: PropTypes.string,
      quantity: PropTypes.number,
    }),

    /**
     * method responsible for triggering the operator method for BopisQuickViewModal
     */
    onPickUpOpenClick: PropTypes.func,

    /**
     * method responsible for triggering the operator method to get User's default store with lat long
     */
    getGeoDefaultStore: PropTypes.func,

    /**
     * method fetches the inventory information of item in the default store or favorite
     * store
     */
    getBopisInventoryDetails: PropTypes.func,

    /**
     * carries the inventory information of the bopis item selected
     */
    bopisItemInventory: PropTypes.arrayOf(PropTypes.object),
    isRadialInventoryEnabled: PropTypes.number,
  };

  static defaultProps = {
    miscInfo: {},
    isBossEnabled: true,
    isBopisClearanceProductEnabled: true,
    isBossClearanceProductEnabled: false,
    isBopisEnabled: false,
    userDefaultStore: {
      basicInfo: {
        id: '',
        storeName: '',
      },
    },
    userGeoCoordinates: {
      lat: null,
      long: null,
    },
    itemValues: {
      color: '',
      fit: '',
      size: '',
      quantity: null,
    },
    onPickUpOpenClick: null,
    getGeoDefaultStore: null,
    getBopisInventoryDetails: null,
    bopisItemInventory: [],
    isRadialInventoryEnabled: null,
    offerEspotAvailable: false,
  };

  constructor(props, context) {
    super(props, context);
    const {
      miscInfo,
      isBossEnabled,
      isBopisEnabled,
      isBopisClearanceProductEnabled,
      isBossClearanceProductEnabled,
    } = props;
    const bossValidatingParams = {
      isBossClearanceProductEnabled,
      isBossEnabled,
    };
    const bopisValidatingParams = {
      isBopisClearanceProductEnabled,
      isBopisEnabled,
    };
    this.isSkuResolved = false;
    this.isBopisEligible = validateBopisEligibility({ ...bopisValidatingParams, miscInfo });
    this.isBossEligible = validateBossEligibility({ ...bossValidatingParams, miscInfo });
    this.isGeoStoreAPIRequested = false;
    this.state = {
      isSubmitting: false,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      userDefaultStore,
      productInfo,
      itemValues,
      getBopisInventoryDetails,
      userGeoCoordinates: { lat, long },
      getGeoDefaultStore,
    } = this.props;
    if (this.shouldGetInventoryDetails(userDefaultStore, itemValues, prevProps)) {
      // Added New check for userDefaultStore to fire getBopisInventoryDetails when user has already selected sku and allows location access later.
      const itemPartNumber = getVariantId(
        productInfo.colorFitsSizesMap,
        itemValues.color,
        itemValues.fit,
        itemValues.size
      );
      const currentSizeEntry = getMapSliceForSize(
        productInfo.colorFitsSizesMap,
        itemValues.color,
        itemValues.fit,
        itemValues.size
      );
      const variantNo =
        currentSizeEntry && currentSizeEntry.variantNo ? currentSizeEntry.variantNo : null;
      getBopisInventoryDetails(itemPartNumber, userDefaultStore.basicInfo.id, variantNo);
    } else if (!userDefaultStore && lat && long && !this.isGeoStoreAPIRequested) {
      /* Making this call only when preffered store doesn't exist in redux state and lat long are changed by user's access.
       * Added isGeoStoreAPIRequested to ensure that API for geo store is called only once
       * (It was being called multiple times when no store is returned in response)
       * isGeoStoreAPIRequested - was used instead of comparing previous Lat/Long of props to handle edge case when
       * guest user visits site for 2nd time (1st time allows access to geo loc).
       * as fav store api for guest login is not being consumed;
       * In this case, default store API was never being called as prev lat/long == new lat/long.
       */
      this.isGeoStoreAPIRequested = true;
      getGeoDefaultStore();
    }
  }

  /**
   * @method handlePickupModalClick -
   * method is responsible for invoking the method for open pickup modal
   */

  handlePickupModalClick = () => {
    const { onPickUpOpenClick, productInfo, itemValues } = this.props;

    return onPickUpOpenClick(
      productInfo.generalProductId,
      itemValues,
      productInfo.generalProductId,
      productInfo.generalProductId,
      this.isBopisEligible,
      this.isBossEligible
    );
  };

  /**
   * @method handleChangeStoreOnKeyPress
   * handles the change store modal when Enter key is pressed post tabbing on the link
   */
  handleChangeStoreOnKeyPress = event =>
    handleGenericKeyDown(event, KEY_CODES.ENTER, this.handlePickupModalClick);

  shouldGetInventoryDetails = (userDefaultStore, itemValues, prevProps) => {
    return (
      this.isSkuResolved &&
      userDefaultStore &&
      (itemValues.size !== prevProps.itemValues.size || this.compareDefaultStore(prevProps))
    );
  };

  getBossEligBossInvAvail = (isStoreBossEligible, isbossInventoryAvailable) => {
    return isStoreBossEligible && this.isBossEligible && isbossInventoryAvailable;
  };

  getIsStoreBopisEligible = bopisItemInventory => {
    return bopisItemInventory.length > 0 && bopisItemInventory[0].quantity > 0;
  };

  getIsStoreAndProductBossEligible = (isBOSSInventoryAvailable, isStoreAndProductBossEligible) => {
    return isBOSSInventoryAvailable && isStoreAndProductBossEligible;
  };

  getIsStoreAndProductBossEligible = isStoreBossEligible => {
    return isStoreBossEligible && this.isBossEligible;
  };

  pickupRenderCondition = isStoreAndProductBossEligible => {
    return this.isBopisEligible && isStoreAndProductBossEligible;
  };

  noBossBopisInfo = () => {
    return !this.isBopisEligible && !this.isBossEligible;
  };

  /**
   * @method compareDefaultStore
   * @description this method compares the value of userDefaultStore with the previous
   * and new value received.
   * @param {object} prevProps - the previous props receiving from the componentDidUpdate
   * @returns {true} If userDefaultStore exists and  prevProps.userDefaultStore
   * is null
   * @returns {true} If both prev and new userDefaultStore exists and the id of both stores
   * are different
   * @returns {false} if userDefaultStore doesn't exists
   *
   */
  compareDefaultStore(prevProps) {
    const { userDefaultStore } = this.props;
    if (userDefaultStore) {
      if (!prevProps.userDefaultStore) {
        return true;
      }
      if (
        prevProps.userDefaultStore &&
        userDefaultStore.basicInfo.id !== prevProps.userDefaultStore.basicInfo.id
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * @method renderPickupTitle
   * @param {object} miscInfo carries the information of the product with
   * respective color product
   * @param {object} userDefaultStore carries the information of the store user's
   * default store
   */
  renderPickupTitle() {
    const { userDefaultStore, productInfo, itemValues, isRadialInventoryEnabled } = this.props;

    let isStoreBossEligible = false;
    if (userDefaultStore) {
      isStoreBossEligible = numericStringToBool(userDefaultStore.storeBossInfo.isBossEligible);
    }

    let isbossInventoryAvailable;
    if (isRadialInventoryEnabled) {
      // kill switch RAD-171 RAD-74
      isbossInventoryAvailable = !isBOSSProductOOS(productInfo.colorFitsSizesMap, itemValues);
    } else {
      isbossInventoryAvailable = !isProductOOS(productInfo.colorFitsSizesMap, itemValues); // RAD-171 RAD-74 to behave like production in case kill switch is off.
    }
    const isBossEligBossInvAvail = this.getBossEligBossInvAvail(
      isStoreBossEligible,
      isbossInventoryAvailable
    );
    if (this.isSkuResolved) {
      if (userDefaultStore) {
        if (isBossEligBossInvAvail || this.isBopisEligible) {
          /**
           * if the sku is resolved and the user has added a store to the account
           * then it @returns - store name and the link to change the store
           * */
          return (
            <React.Fragment>
              <span className="store-name">{userDefaultStore.basicInfo.storeName}</span>
              <span
                className="change-store-link"
                role="link"
                tabIndex="0"
                onKeyDown={this.handleChangeStoreOnKeyPress}
                onClick={this.handlePickupModalClick}
              >
                {labels.CHANGE_STORE}
              </span>
            </React.Fragment>
          );
        }
        return labels.PRODUCT_PICKUP.TITLE_DEFAULT_NOSTORE;
      }
      if (this.isBopisEligible && !isBossEligBossInvAvail) {
        // bopis only
        /**
         * @returns if the product is only bopis eligible and the sku is resolved
         * then it @returns {labels.PRODUCT_BOPIS}
         */
        return labels.PRODUCT_PICKUP.PRODUCT_BOPIS;
      }
      /**
       * @returns if the product is only boss eligible and the sku is resolved
       * then it @returns {labels.TITLE_DEFAULT_NOSTORE}
       */
      return labels.PRODUCT_PICKUP.TITLE_DEFAULT_NOSTORE;
    }
    return labels.PRODUCT_PICKUP.TITLE_DEFAULT_NOSTORE;
  }

  /**
   * @member renderPickupInfo
   * @description this method returns the information of pickup on the
   * respective store based on different scenarios
   * @param {object} miscInfo carries the product information
   * with respective color id
   * @param {object} userDefaultStore carries the information of User's default store
   * @return if the sku is resolved and the product is available in store
   * or both BOSS and BOPIS
   * then is @returns - item availability information along with the
   * pickup today label and the BOSS dates information with the boss pickup
   * label
   * @return if the sku is resolved and the product is only available for BOPIS
   * then it @returns - item availability information with the BOPIS only pickup
   * label
   * @return if the sku is resolved and the product is avialable only for BOSS
   * then it @returns - the boss dates information along with the BOSS only
   * pickup labels
   */
  renderPickupInfo() {
    const {
      bopisItemInventory,
      userDefaultStore,
      offerEspotAvailable,
      productInfo,
      itemValues,
      isRadialInventoryEnabled,
    } = this.props;

    const isStoreBopisEligible = this.getIsStoreBopisEligible(bopisItemInventory);
    let isStoreBossEligible = false;
    if (userDefaultStore) {
      isStoreBossEligible = numericStringToBool(userDefaultStore.storeBossInfo.isBossEligible);
    }

    let isStoreAndProductBossEligible = this.getIsStoreAndProductBossEligible(isStoreBossEligible);
    // derive boss inventory from unbxd attribute v_qty_boss sepately RAD-74
    if (isRadialInventoryEnabled) {
      // kill switch RAD-171 RAD-74
      const isBOSSInventoryAvailable = !isBOSSProductOOS(productInfo.colorFitsSizesMap, itemValues);
      isStoreAndProductBossEligible = this.getIsStoreAndProductBossEligible(
        isBOSSInventoryAvailable,
        isStoreAndProductBossEligible
      );
    }

    if (this.pickupRenderCondition(isStoreAndProductBossEligible)) {
      return (
        <div className="pickup-info">
          {isStoreBopisEligible && (
            <p>
              <span className="availability">
                {`${bopisItemInventory[0].status}!`}
                {labels.SPACE_ONE}
              </span>
              {labels.PRODUCT_PICKUP.BOPIS_AVAILABLE}
            </p>
          )}
          <p className="pickup-boss-info">
            {isStoreBopisEligible
              ? labels.PRODUCT_PICKUP.BOSS_AVAILABLE
              : labels.PRODUCT_PICKUP.BOSS_ONLY_AVAILABLE}
            {labels.SPACE_ONE}
            {offerEspotAvailable && 'and'}
            {labels.SPACE_ONE}
          </p>
          <ContentSlot className="pickup-espot" contentSlotName="fav_store_pickup_content" />
        </div>
      );
    }
    if (this.isBopisEligible) {
      return (
        isStoreBopisEligible && (
          <p className="pickup-info">
            <span className="availability">
              {`${bopisItemInventory[0].status}!`}
              {labels.SPACE_ONE}
            </span>
            {labels.PRODUCT_PICKUP.BOPIS_ONLY_AVAILABLE}
          </p>
        )
      );
    }
    return (
      <div className="pickup-info">
        <p className="pickup-boss-info">
          {labels.PRODUCT_PICKUP.BOSS_ONLY_AVAILABLE}
          {labels.SPACE_ONE}
          {offerEspotAvailable && 'and'}
          {labels.SPACE_ONE}
        </p>
        <ContentSlot className="pickup-espot" contentSlotName="no_fav_pickup_content" />
      </div>
    );
  }

  render() {
    const { userDefaultStore, productInfo, itemValues, isRadialInventoryEnabled } = this.props;

    if (this.noBossBopisInfo()) {
      return null;
    }

    this.isSkuResolved = validateSkuDetails(productInfo, itemValues);
    const { isSubmitting } = this.state;

    // RAD-74 Replace Outbound1 Inventory check to Outbound2(Radial/Boss Inventory)
    let showPickupInfo;
    if (isRadialInventoryEnabled) {
      showPickupInfo =
        userDefaultStore &&
        this.isSkuResolved &&
        !isBOSSProductOOS(productInfo.colorFitsSizesMap, itemValues);
    } else {
      showPickupInfo =
        userDefaultStore &&
        this.isSkuResolved &&
        !isProductOOS(productInfo.colorFitsSizesMap, itemValues);
    }

    return (
      <React.Fragment>
        <div className="pickup-section-container">
          <div className="pickup-sub-container">
            <div className="pickup-header">
              <div className="title-pickup-section">
                <img
                  className="shipping-icon"
                  alt="shipping-icon"
                  src="/static/images/fast-shipping.svg"
                />
                {labels.FREE_SHIPPING}
              </div>
            </div>
            <div className="pickup-content">
              <div className="title-pickup-section">
                <img
                  className="pickup-icon"
                  alt="pickup-icon"
                  src="/static/images/marker-icon.svg"
                />
                {this.renderPickupTitle()}
              </div>
              {showPickupInfo && this.renderPickupInfo()}
              <Button
                className="button-find-in-store"
                buttonVariation="fixed-width"
                fill="BLACK"
                disabled={isSubmitting}
                onClick={this.handlePickupModalClick}
              >
                {showPickupInfo ? labels.PRODUCT_PICKUP.PICKUP_IN_STORE : labels.CHOOSE_STORE}
              </Button>
            </div>
          </div>
        </div>
        {this.isBopisEligible && (
          <ContentSlot contentSlotName="pdp_bopis_promo" className="product-details-bopis-promo" />
        )}
      </React.Fragment>
    );
  }
}

export default ProductPickup;
