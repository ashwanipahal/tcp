import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import ProductPickup from '../views/ProductPickup.view';
import { getBopisInventoryDetailsActn } from './ProductPickup.actions';
import * as PickupSelectors from './ProductPickup.selectors';
import {
  validateSkuDetails,
  validateBossEligibility,
  validateBopisEligibility,
  isBOSSProductOOS,
  isProductOOS,
  numericStringToBool,
} from '../util';

import {
  getVariantId,
  getMapSliceForSize,
} from '../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';

import {
  COLOR_FITS_SIZES_MAP_PROP_TYPE,
  PRICING_PROP_TYPES,
} from '../../PickupStoreModal/PickUpStoreModal.proptypes';

const labels = {
  CHANGE_STORE: '(Change Store)',
  PRODUCT_PICKUP: {
    TITLE_DEFAULT_NOSTORE: 'Select Store',
    PRODUCT_BOPIS: 'Buy online - Pick up in store',
    BOPIS_AVAILABLE: 'Pick up TODAY!',
    BOPIS_ONLY_AVAILABLE: 'Item available for pickup TODAY',
    BOSS_AVAILABLE: 'Or choose NO RUSH Pickup ',
    BOSS_ONLY_AVAILABLE: 'Choose NO RUSH Pickup ',
    PICKUP_IN_STORE: 'PICK UP IN STORE',
  },
  SPACE_ONE: ' ',
  FREE_SHIPPING: 'FREE Shipping Every Day!',
  NO_MIN_PURCHASE: 'No Minimum Purchase Required.',
  FIND_STORE: 'FIND A STORE',
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

class ProductPickupContainer extends React.PureComponent {
  static propTypes = {
    miscInfo: PropTypes.shape({}),
    offerEspotAvailable: PropTypes.bool,
    className: PropTypes.string,

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
     * carries the inventory information of the bopis item selected
     */
    bopisItemInventory: PropTypes.arrayOf(PropTypes.object),
    isBopisEligible: PropTypes.bool,
    isBossEligible: PropTypes.bool,
    isSkuResolved: PropTypes.bool,
    showChangeStore: PropTypes.bool,
    pickupTitleText: PropTypes.string,
    isBossEligBossInvAvail: PropTypes.bool,
    isStoreBopisEligible: PropTypes.bool,
    showPickupDetails: PropTypes.bool,
    showPickupInfo: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    isBossEnabled: PropTypes.bool,
    isBopisEnabled: PropTypes.bool,
    isBopisClearanceProductEnabled: PropTypes.bool,
    isBossClearanceProductEnabled: PropTypes.bool,
    getBopisInventoryDetails: PropTypes.func.isRequired,
    getGeoDefaultStore: PropTypes.func,
    isRadialInventoryEnabled: PropTypes.bool,
  };

  static defaultProps = {
    miscInfo: {},
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
    bopisItemInventory: [],
    offerEspotAvailable: false,
    className: '',
    isBopisEligible: false,
    isBossEligible: false,
    isSkuResolved: false,
    showChangeStore: false,
    pickupTitleText: '',
    isBossEligBossInvAvail: false,
    isStoreBopisEligible: false,
    showPickupDetails: false,
    showPickupInfo: false,
    isSubmitting: false,
    isBossEnabled: false,
    isBopisEnabled: false,
    isBopisClearanceProductEnabled: false,
    isBossClearanceProductEnabled: false,
    getGeoDefaultStore: () => {},
    isRadialInventoryEnabled: false,
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
    this.isBopisEligible = false;
    this.isBossEligible = true;
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

  /**
   * @method setPickupTitle
   * @param {object} miscInfo carries the information of the product with
   * respective color product
   * @param {object} userDefaultStore carries the information of the store user's
   * default store
   */
  setPickupTitle() {
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
    let showChangeStore = false;
    let pickupTitleText = '';
    if (this.isSkuResolved) {
      if (userDefaultStore) {
        if (isBossEligBossInvAvail || this.isBopisEligible) {
          showChangeStore = true;
          pickupTitleText = labels.CHANGE_STORE;
        }
        pickupTitleText = labels.PRODUCT_PICKUP.TITLE_DEFAULT_NOSTORE;
      }
      if (this.isBopisEligible && !isBossEligBossInvAvail) {
        // bopis only
        /**
         * @returns if the product is only bopis eligible and the sku is resolved
         * then it @returns {labels.PRODUCT_BOPIS}
         */
        pickupTitleText = labels.PRODUCT_PICKUP.PRODUCT_BOPIS;
      }
      pickupTitleText = labels.PRODUCT_PICKUP.TITLE_DEFAULT_NOSTORE;
    }
    pickupTitleText = labels.PRODUCT_PICKUP.TITLE_DEFAULT_NOSTORE;

    return { showChangeStore, pickupTitleText, isBossEligBossInvAvail };
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
  getPickupInfo() {
    const {
      bopisItemInventory,
      userDefaultStore,
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
    return {
      showPickupDetails: this.pickupRenderCondition(isStoreAndProductBossEligible),
      isStoreBopisEligible,
    };
  }

  pickupRenderCondition = isStoreAndProductBossEligible => {
    return this.isBopisEligible && isStoreAndProductBossEligible;
  };

  noBossBopisInfo = () => {
    return !this.isBopisEligible && !this.isBossEligible;
  };

  shouldGetInventoryDetails = (userDefaultStore, itemValues, prevProps) => {
    return (
      this.isSkuResolved &&
      userDefaultStore &&
      (itemValues.size !== prevProps.itemValues.size || this.compareDefaultStore(prevProps))
    );
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

  render() {
    const {
      userDefaultStore,
      productInfo,
      isRadialInventoryEnabled,
      getBopisInventoryDetails,
      className,
      itemValues,
      bopisItemInventory,
      onPickUpOpenClick,
      ...otherProps
    } = this.props;

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

    const { showChangeStore, pickupTitleText, isBossEligBossInvAvail } = this.setPickupTitle();
    const { showPickupDetails, isStoreBopisEligible } = this.getPickupInfo();

    return (
      <ProductPickup
        getBopisInventoryDetails={getBopisInventoryDetails}
        itemValues={itemValues}
        onPickUpOpenClick={onPickUpOpenClick}
        productInfo={productInfo}
        isSkuResolved={this.isSkuResolved}
        isBopisEligible={this.isBopisEligible}
        showChangeStore={showChangeStore}
        pickupTitleText={pickupTitleText}
        userDefaultStore={userDefaultStore}
        isBossEligBossInvAvail={isBossEligBossInvAvail}
        bopisItemInventory={bopisItemInventory}
        isStoreBopisEligible={isStoreBopisEligible}
        showPickupDetails={showPickupDetails}
        showPickupInfo={showPickupInfo}
        isSubmitting={isSubmitting}
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  /*
   * Previously form values were tracked in the state of Product.jsx
   * This was causing unnecessary re-renders for the entire product card
   * Now using redux-form selector to pull the required values directly into
   * the components that need them
   */
  const selector = formValueSelector(ownProps.formName);
  // creating new prop userDefaultStore which is a combination of
  //  favStore store or geo default store of user
  // const favStore = storesStoreView.getDefaultStore(state);
  // const geoDefaultStore = storesStoreView.getGeoDefaultStore(state);
  // const userDefaultStore = favStore || geoDefaultStore || null;
  // const offerEspot = generalStoreView.getEspotByName(state, 'fav_store_pickup_content');
  const userDefaultStore = null;

  return {
    itemValues: selector(state, 'color', 'Fit', 'Size', 'Quantity'),
    isBopisEnabled: PickupSelectors.getIsBopisEnabled(state),
    isBossEnabled: PickupSelectors.getIsBossEnabled(state),
    isBopisClearanceProductEnabled: PickupSelectors.getIsBopisClearanceProductEnabled(state),
    isBossClearanceProductEnabled: PickupSelectors.getIsBossClearanceProductEnabled(state),
    userDefaultStore,
    userGeoCoordinates: {
      lat: null,
      long: null,
    },
    // TODO - these are required for default store.
    // Checking with BA since the requirement is not mentioned in the story.
    // TODO - check if required => userGeoCoordinates: userStoreView.getUserGeoCoordinates(state),
    // TODO - check if required => getGeoDefaultStore: storeOperators.storesOperator.loadDefaultStore,
    disabledFits: PickupSelectors.getBopisDisabledFits(state),
    bopisItemInventory: PickupSelectors.getBopisItemInventory(state),
    // TODO - This changes to CMS data - offerEspotAvailable: offerEspot && offerEspot.value,
    isRadialInventoryEnabled: PickupSelectors.getIsRadialInventoryEnabled(state),
  };
}

const mapDispatchToProps = dispatch => ({
  getBopisInventoryDetails: () => {
    dispatch(getBopisInventoryDetailsActn());
  },
  onPickUpOpenClick: () => {
    // TODO - use the open pickup modal action here
    console.log('onPickUpOpenClick');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPickupContainer);
