/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import ProductPickup from '../views/ProductPickup.view';
import { getBopisInventoryDetailsAction } from './ProductPickup.actions';
import * as PickupSelectors from './ProductPickup.selectors';
import {
  validateSkuDetails,
  validateBossEligibility,
  validateBopisEligibility,
  isBOSSProductOOS,
  isProductOOS,
  numericStringToBool,
} from '../util';
import { openPickupModalWithValues } from '../../PickupStoreModal/container/PickUpStoreModal.actions';
import {
  getVariantId,
  getMapSliceForSize,
} from '../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import {
  COLOR_FITS_SIZES_MAP_PROP_TYPE,
  PRICING_PROP_TYPES,
} from '../../PickupStoreModal/PickUpStoreModal.proptypes';
import { getIsPickupModalOpen } from '../../PickupStoreModal/container/PickUpStoreModal.selectors';

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

const updateItemValueObj = itemObjParam => {
  const itemObj = itemObjParam;
  const itemObjKeys = Object.keys(itemObj);
  itemObjKeys.forEach(objKey => {
    if (itemObj[objKey] && itemObj[objKey].name) {
      itemObj[objKey] = itemObj[objKey].name;
    }
  });
  return itemObj;
};
class ProductPickupContainer extends React.PureComponent {
  static propTypes = {
    miscInfo: PropTypes.shape({}),
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
    isBossEnabled: PropTypes.bool,
    isBopisEnabled: PropTypes.bool,
    isBopisClearanceProductEnabled: PropTypes.bool,
    isBossClearanceProductEnabled: PropTypes.bool,
    getBopisInventoryDetails: PropTypes.func.isRequired,
    getGeoDefaultStore: PropTypes.func,
    isRadialInventoryEnabled: PropTypes.bool,
    labels: PropTypes.shape({
      lbl_Product_pickup_BOPIS_AVAILABLE: PropTypes.string,
      lbl_Product_pickup_BOPIS_DISABLED_FITS_HUSKY: PropTypes.string,
      lbl_Product_pickup_BOPIS_DISABLED_FITS_PLUS: PropTypes.string,
      lbl_Product_pickup_BOPIS_DISABLED_FITS_SLIM: PropTypes.string,
      lbl_Product_pickup_BOPIS_ONLY_AVAILABLE: PropTypes.string,
      lbl_Product_pickup_BOSS_AVAILABLE: PropTypes.string,
      lbl_Product_pickup_BOSS_ONLY_AVAILABLE: PropTypes.string,
      lbl_Product_pickup_FIND_STORE: PropTypes.string,
      lbl_Product_pickup_FREE_SHIPPING: PropTypes.string,
      lbl_Product_pickup_NO_MIN_PURCHASE: PropTypes.string,
      lbl_Product_pickup_PICKUP_IN_STORE: PropTypes.string,
      lbl_Product_pickup_PRODUCT_BOPIS: PropTypes.string,
      lbl_Product_pickup_TITLE_DEFAULT_NOSTORE: PropTypes.string,
      lbl_Product_pickup_CHANGE_STORE: PropTypes.string,
    }),
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
    isBossEnabled: false,
    isBopisEnabled: false,
    isBopisClearanceProductEnabled: false,
    isBossClearanceProductEnabled: false,
    getGeoDefaultStore: () => {},
    isRadialInventoryEnabled: false,
    labels: {
      lbl_Product_pickup_BOPIS_AVAILABLE: 'Pick up TODAY!',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_HUSKY: 'husky',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_PLUS: 'plus',
      lbl_Product_pickup_BOPIS_DISABLED_FITS_SLIM: 'slim',
      lbl_Product_pickup_BOPIS_ONLY_AVAILABLE: 'Item available for pickup TODAY',
      lbl_Product_pickup_BOSS_AVAILABLE: 'Or choose NO RUSH Pickup ',
      lbl_Product_pickup_BOSS_ONLY_AVAILABLE: 'Choose NO RUSH Pickup ',
      lbl_Product_pickup_FIND_STORE: 'FIND A STORE',
      lbl_Product_pickup_FREE_SHIPPING: 'FREE Shipping Every Day!',
      lbl_Product_pickup_NO_MIN_PURCHASE: 'No Minimum Purchase Required.',
      lbl_Product_pickup_PICKUP_IN_STORE: 'PICK UP IN STORE',
      lbl_Product_pickup_PRODUCT_BOPIS: 'Select Store',
      lbl_Product_pickup_TITLE_DEFAULT_NOSTORE: 'Select Store',
      lbl_Product_pickup_CHANGE_STORE: '(Change Store)',
    },
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
        itemValues.Fit,
        itemValues.Size
      );
      const currentSizeEntry = getMapSliceForSize(
        productInfo.colorFitsSizesMap,
        itemValues.color,
        itemValues.Fit,
        itemValues.Size
      );
      const variantNo =
        currentSizeEntry && currentSizeEntry.variantNo ? currentSizeEntry.variantNo : null;
      const itemInfo = [
        {
          storeId:
            userDefaultStore.basicInfo &&
            userDefaultStore.basicInfo.id &&
            userDefaultStore.basicInfo.id.substring(2),
          variantNo,
          itemPartNumber,
        },
      ];
      getBopisInventoryDetails({ itemInfo });
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
    const {
      userDefaultStore,
      productInfo,
      itemValues,
      isRadialInventoryEnabled,
      labels,
    } = this.props;

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
    let pickupTitleText = labels.lbl_Product_pickup_TITLE_DEFAULT_NOSTORE;
    if (this.isSkuResolved) {
      if (userDefaultStore) {
        if (isBossEligBossInvAvail || this.isBopisEligible) {
          showChangeStore = true;
        }
        pickupTitleText = labels.lbl_Product_pickup_TITLE_DEFAULT_NOSTORE;
        return { showChangeStore, pickupTitleText, isBossEligBossInvAvail };
      }
      if (this.isBopisEligible && !isBossEligBossInvAvail) {
        // bopis only
        /**
         * @returns if the product is only bopis eligible and the sku is resolved
         * then it @returns {labels.PRODUCT_BOPIS}
         */
        pickupTitleText = labels.lbl_Product_pickup_PRODUCT_BOPIS;
        return { showChangeStore, pickupTitleText, isBossEligBossInvAvail };
      }
      pickupTitleText = labels.lbl_Product_pickup_TITLE_DEFAULT_NOSTORE;
      return { showChangeStore, pickupTitleText, isBossEligBossInvAvail };
    }
    return { showChangeStore, pickupTitleText, isBossEligBossInvAvail };
  }

  /**
   * @member getPickupInfo
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
      (itemValues.Size !== prevProps.itemValues.Size || this.compareDefaultStore(prevProps))
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
      itemValues,
      bopisItemInventory,
      onPickUpOpenClick,
      labels,
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
        labels={labels}
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
  // TODO - use the favorite store and getGeoDefaultStore selector from store locator
  // const favStore = storesStoreView.getDefaultStore(state);
  // const geoDefaultStore = storesStoreView.getGeoDefaultStore(state);
  // const userDefaultStore = favStore || geoDefaultStore || null;
  // const offerEspot = generalStoreView.getEspotByName(state, 'fav_store_pickup_content');
  // const userDefaultStore = null;

  return {
    labels: PickupSelectors.getLabels(state),
    itemValues: updateItemValueObj(selector(state, 'color', 'Fit', 'Size', 'Quantity')),
    pickupModalState: getIsPickupModalOpen(state),
    // isBopisEnabled: PickupSelectors.getIsBopisEnabled(state),
    // isBossEnabled: PickupSelectors.getIsBossEnabled(state),
    // isBopisClearanceProductEnabled: PickupSelectors.getIsBopisClearanceProductEnabled(state),
    // isBossClearanceProductEnabled: PickupSelectors.getIsBossClearanceProductEnabled(state),
    isBopisEnabled: true,
    isBossEnabled: true,
    isBopisClearanceProductEnabled: true,
    isBossClearanceProductEnabled: true,

    // userDefaultStore,
    // TODO - This is a sample default store value for implementation.
    // Will be removed once the favorite store is available in the store
    userDefaultStore: {
      storeBossInfo: {
        isBossEligible: '1',
        startDate: '09/29/2019',
        endDate: '10/03/2019',
      },
      pickupType: {
        isStoreBossSelected: true,
        isStoreBopisSelected: true,
      },
      distance: null,
      basicInfo: {
        id: '114037',
        storeName: 'south park meadows',
        isDefault: 1,
        address: {
          addressLine1: '9500 south ih-35',
          city: 'austin',
          state: 'TX',
          country: 'US',
          zipCode: '78748',
        },
        phone: '(512) 292-3025',
        coordinates: {
          lat: 30.16216,
          long: -97.7892,
        },
      },
      hours: {
        regularHours: [
          {
            dayName: 'TUESDAY',
            openIntervals: [
              {
                fromHour: '2019-09-24 10:00:00',
                toHour: '2019-09-24 21:00:00',
              },
            ],
            isClosed: false,
          },
          {
            dayName: 'WEDNESDAY',
            openIntervals: [
              {
                fromHour: '2019-09-25 10:00:00',
                toHour: '2019-09-25 21:00:00',
              },
            ],
            isClosed: false,
          },
          {
            dayName: 'THURSDAY',
            openIntervals: [
              {
                fromHour: '2019-09-26 10:00:00',
                toHour: '2019-09-26 21:00:00',
              },
            ],
            isClosed: false,
          },
          {
            dayName: 'FRIDAY',
            openIntervals: [
              {
                fromHour: '2019-09-27 10:00:00',
                toHour: '2019-09-27 21:00:00',
              },
            ],
            isClosed: false,
          },
          {
            dayName: 'SATURDAY',
            openIntervals: [
              {
                fromHour: '2019-09-28 10:00:00',
                toHour: '2019-09-28 21:00:00',
              },
            ],
            isClosed: false,
          },
          {
            dayName: 'SUNDAY',
            openIntervals: [
              {
                fromHour: '2019-09-29 12:00:00',
                toHour: '2019-09-29 18:00:00',
              },
            ],
            isClosed: false,
          },
          {
            dayName: 'MONDAY',
            openIntervals: [
              {
                fromHour: '2019-09-30 10:00:00',
                toHour: '2019-09-30 21:00:00',
              },
            ],
            isClosed: false,
          },
          {
            dayName: 'TUESDAY',
            openIntervals: [
              {
                fromHour: '2019-10-01 10:00:00',
                toHour: '2019-10-01 21:00:00',
              },
            ],
            isClosed: false,
          },
          {
            dayName: 'WEDNESDAY',
            openIntervals: [
              {
                fromHour: '2019-10-02 10:00:00',
                toHour: '2019-10-02 21:00:00',
              },
            ],
            isClosed: false,
          },
        ],
        holidayHours: [],
        regularAndHolidayHours: [],
      },
      features: {
        storeType: 'Retail Store',
      },
      productAvailability: {},
      timeStamp: 1569314564525,
    },
    userGeoCoordinates: {
      lat: null,
      long: null,
    },
    // TODO - these are required for default store.
    // Checking with BA since the requirement is not mentioned in the story.
    // TODO - check if required => userGeoCoordinates: userStoreView.getUserGeoCoordinates(state),
    // TODO - check if required => getGeoDefaultStore: storeOperators.storesOperator.loadDefaultStore,
    bopisItemInventory: PickupSelectors.getBopisItemInventory(state),
    // TODO - This changes to CMS data - offerEspotAvailable: offerEspot && offerEspot.value,
    isRadialInventoryEnabled: PickupSelectors.getIsRadialInventoryEnabled(state),
    // TODO - dummy values for hardcoding the status. Remove once the API works.
    // bopisItemInventory: [
    //   {
    //     status: 'Limited availability',
    //     quantity: 10,
    //   },
    // ],
    // isRadialInventoryEnabled: true,
  };
}

const mapDispatchToProps = dispatch => ({
  getBopisInventoryDetails: payload => {
    dispatch(getBopisInventoryDetailsAction(payload));
  },
  onPickUpOpenClick: payload => {
    dispatch(openPickupModalWithValues(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPickupContainer);
