/* eslint-disable max-lines */
/* eslint-disable no-underscore-dangle */
/**
 * @module PickUpStoreModal
 * @desc Component to display PickUp in Store  Modal
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getSiteId } from '@tcp/core/src/utils';
import Modal from '../../../molecules/Modal';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import {
  STORE_SUMMARY_PROP_TYPES,
  CART_BOPIS_STORE_LIST,
  COLOR_FIT_SIZE_DISPLAY_NAME,
} from '../PickUpStoreModal.proptypes';
import {
  getSkuId,
  getVariantId,
  getMapSliceForColor,
  getIconImageForColor,
  getMapSliceForSize,
  getPrices,
} from '../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import withStyles from '../../../hoc/withStyles';
import styles, { modalstyles } from '../styles/PickUpStoreModal.style';
import { SKU_DETAILS } from '../PickUpStoreModal.constants';
import PickupSkuSelectionForm from '../molecules/PickupSkuSelectionForm';
import PickupStoreSelectionFormContainer from '../molecules/PickupStoreSelectionForm';
import errorBoundary from '../../../hoc/withErrorBoundary/errorBoundary';

const DISTANCES_MAP_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  })
);

// eslint-disable-next-line no-unused-vars
// const ERRORS_MAP = require('../../../../../services/handler/stateful/errorResponseMapping/index.json');

class PickUpStoreModalView extends React.Component {
  static propTypes = {
    /* the list of stores currently in the cart */
    cartBopisStoresList: CART_BOPIS_STORE_LIST.cartBopisStoresList.isRequired,
    /** labels for selection fields */
    colorFitSizeDisplayNames: COLOR_FIT_SIZE_DISPLAY_NAME.colorFitSizeDisplayNames,
    /** The map of distances options to select the radius of search */
    distancesMap: DISTANCES_MAP_PROP_TYPE.isRequired,
    /** seed values for the form */
    initialValues: PropTypes.shape({
      /** user's preselected color id from parent instance */
      color: PropTypes.string,
      /** user's preselected fit id from parent instance */
      fit: PropTypes.string,
      /** user's preselected size id from parent instance */
      size: PropTypes.string,
      /** user's preselected quantity from parent instance */
      quantity: PropTypes.number,
    }).isRequired,
    /**
     * indicates the modal is shown because of an error trying to add to the preferred store
     * (required only in PDP)
     */
    isPreferredStoreError: PropTypes.bool,
    /** We need to differentiate if Bopis Modal is open from cart or other place to change
     * select item button's message (DT27100)
     */
    isShoppingBag: PropTypes.bool,
    /** indicates the 'extended' sizes not available for bopis notification needs to show
     * (only when user attempted to select it)
     */
    isShowExtendedSizesNotification: PropTypes.bool.isRequired,

    // determines if variation is warning modal
    isPickUpWarningModal: PropTypes.bool,

    // determines if step one needs to be opened
    openSkuSelectionForm: PropTypes.bool,
    maxAllowedStoresInCart: PropTypes.number.isRequired,

    /**
     * Callback for adding an item to cart for pickup in the selected store.
     * Accepts: formData, itemId; where formData is an object with the keys:
     * storeId, skuId (of the selected color/fit/size combination), quantity
     * and itemId is an optional identifier of the item one wishes to add to the cart
     * (see the prop requestorKey).
     */
    addItemToCartInPickup: PropTypes.func.isRequired,
    navigation: PropTypes.shape({}),

    /**
     * Function to call when the item has been successfully added to, or updated
     * in, the cart.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    onAddItemToCartSuccess: PropTypes.func,

    /** callback for closing this modal */
    closePickupModal: PropTypes.func.isRequired,
    onColorChange: PropTypes.func.isRequired,

    /**
     * Callback to run on component mount
     * (usually to populate redux store information consumened by this component).
     * Should return a promise
     * */
    getUserCartStoresAndSearch: PropTypes.func.isRequired,

    /** the maximum number of different stores used for BOPIS in a single shopping cart.
     * must be at least 1 */

    /** submit method for PickupStoreSelectionForm */
    // eslint-disable-next-line react/no-unused-prop-types
    onSearchAreaStoresSubmit: PropTypes.func.isRequired,

    /** submit method for BopisCartStoresInventoryForm */
    onSearchInCurrentCartStoresSubmit: PropTypes.func.isRequired,
    currentProduct: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,

    /** an optional identifier to be passed to addItemToCartInPickup */
    // eslint-disable-next-line react/no-unused-prop-types
    requestorKey: PropTypes.string,
    pickupModalHeading: PropTypes.string.isRequired,
    isCanada: PropTypes.bool.isRequired,
    isPlcc: PropTypes.bool,
    /* The session currency symbol */
    currencySymbol: PropTypes.string,
    /* We are available to know if is an international shipping */
    isInternationalShipping: PropTypes.bool,

    /** Global switches for boss and bopis */
    isBossEnabled: PropTypes.bool,
    isBopisEnabled: PropTypes.bool,
    isBossCtaEnabled: PropTypes.bool,
    isBopisCtaEnabled: PropTypes.bool,
    updateCartItemStore: PropTypes.bool,
    isItemShipToHome: PropTypes.bool,
    autoSkipStep1: PropTypes.bool,
    showDefaultSizeMsg: PropTypes.bool,
    isRadialInventoryEnabled: PropTypes.number,
    cartItemsCount: PropTypes.number,
    defaultStore: STORE_SUMMARY_PROP_TYPES,
    storeSearchError: PropTypes.string,
    addToBagError: PropTypes.string,
    onClearSearchFormError: PropTypes.func.isRequired,
    PickupSkuFormValues: PropTypes.shape({
      /** user's preselected color id from parent instance */
      color: PropTypes.string,
      /** user's preselected fit id from parent instance */
      fit: PropTypes.string,
      /** user's preselected size id from parent instance */
      size: PropTypes.string,
      /** user's preselected quantity from parent instance */
      quantity: PropTypes.number,
    }).isRequired,
    className: PropTypes.string,
    currency: PropTypes.string,
    currencyAttributes: PropTypes.shape({}),
    updatePickUpCartItem: PropTypes.func.isRequired,
    initialValuesFromBagPage: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    colorFitSizeDisplayNames: {},
    updateCartItemStore: false,
    isPickUpWarningModal: false,
    isBossEnabled: false,
    isBopisEnabled: false,
    isBossCtaEnabled: false,
    isBopisCtaEnabled: false,
    openSkuSelectionForm: false,
    autoSkipStep1: false,
    onAddItemToCartSuccess: null,
    isRadialInventoryEnabled: false,
    showDefaultSizeMsg: false,
    isInternationalShipping: false,
    currencySymbol: '$',
    isPlcc: false,
    requestorKey: '',
    isPreferredStoreError: false,
    isShoppingBag: false,
    navigation: null,
    cartItemsCount: 0,
    defaultStore: {},
    storeSearchError: '',
    addToBagError: '',
    className: '',
    currency: 'USD',
    isItemShipToHome: false,
    currencyAttributes: {},
  };

  constructor(props) {
    super(props);
    const isSkuResolved =
      this.validateSkuDetails(props.initialValues, props.openSkuSelectionForm) &&
      (props.autoSkipStep1 || !props.showDefaultSizeMsg);
    const SkuSelectedValues = {
      ...props.initialValues,
      distance: props.distancesMap[0].id,
    };

    this.state = {
      SkuSelectedValues, //  SkuSelectedValues has the initial and latest sku details to keep step 1 and step 2 in sync
      isSkuResolved,
      selectedColor: '',
    };
    this.skuId = null;
    this.quantity = null;

    this.handleSearchAreaStoresSubmit = this.handleSearchAreaStoresSubmit.bind(this);
    this.handleSearchInCurrentCartStoresSubmit = this.handleSearchInCurrentCartStoresSubmit.bind(
      this
    );
    this.handleEditSkuDetails = this.handleEditSkuDetails.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onCloseClick() {
    const { closePickupModal } = this.props;
    closePickupModal({
      isModalOpen: false,
    });
  }

  getSkuIdForSearch(colorFitsSizesMap, formData) {
    const { PickupSkuFormValues } = this.props;

    return (
      getSkuId(
        colorFitsSizesMap,
        (PickupSkuFormValues && PickupSkuFormValues.color) || formData.color,
        (PickupSkuFormValues && PickupSkuFormValues.Fit) || formData.Fit,
        PickupSkuFormValues && PickupSkuFormValues.Size
      ) || formData.Size
    );
  }

  getVariantIdFormSearch(colorFitsSizesMap, formData) {
    const { PickupSkuFormValues } = this.props;

    return (
      getVariantId(
        colorFitsSizesMap,
        (PickupSkuFormValues && PickupSkuFormValues.color) || formData.color,
        (PickupSkuFormValues && PickupSkuFormValues.Fit) || formData.Fit,
        PickupSkuFormValues && PickupSkuFormValues.Size
      ) || formData.Size
    );
  }

  /** Validate SKU detils if SKU is resolved or not */
  validateSkuDetails(initialValues, openSkuSelectionForm) {
    const { currentProduct } = this.props;
    if (openSkuSelectionForm) {
      return false;
    }

    const invalidInitialValues = !initialValues || !Object.keys(initialValues).length;

    if (invalidInitialValues) {
      return false;
    }

    const colorFitsSizesMap = currentProduct && currentProduct.colorFitsSizesMap;
    const { color, Fit, Size } = initialValues;

    const sizeAvailable = getMapSliceForSize(colorFitsSizesMap, color, Fit, Size);
    const invalidInitialValuesState =
      sizeAvailable && sizeAvailable.maxAvailable > 0 ? !sizeAvailable : true;

    if (invalidInitialValuesState) {
      return false;
    }

    let isValidSKU = true;
    Object.keys(initialValues).forEach(key => {
      if (
        !initialValues[key] &&
        (key !== SKU_DETAILS.fit || (key === SKU_DETAILS.fit && this.showFitsForProduct()))
      ) {
        isValidSKU = false;
      }
    });
    return isValidSKU;
  }

  /** Handle click of Edit button on Step 2 - which will switch to Step 1 */
  handleEditSkuDetails(e) {
    e.preventDefault();
    this.setState(oldState => ({ isSkuResolved: !oldState.isSkuResolved }));
  }

  deriveSkuInfoAndSearch(locationPromise, colorFitsSizesMap, formData, cartItemsCount) {
    const { SkuSelectedValues } = this.state;
    const { getUserCartStoresAndSearch } = this.props;
    const { color, Fit, Size, Quantity: quantity } = SkuSelectedValues;
    const country = getSiteId() && getSiteId().toUpperCase();
    const variantId = getVariantId(colorFitsSizesMap, color, Fit, Size);
    const skuId = getSkuId(colorFitsSizesMap, color, Fit, Size);
    const { distance } = formData;
    this.skuId = skuId;
    this.quantity = quantity;
    getUserCartStoresAndSearch({
      skuId,
      quantity,
      distance,
      locationPromise,
      variantId,
      cartItemsCount,
      country,
    });
  }

  handleSearchAreaStoresSubmit(locationPromise, colorFitsSizesMap, formData) {
    const { isPickUpWarningModal, cartItemsCount } = this.props;
    const { isSkuResolved } = this.state;
    if (!isSkuResolved) {
      const { PickupSkuFormValues, distancesMap } = this.props;
      const SkuSelectedValues = {
        ...PickupSkuFormValues,
        distance: distancesMap[0].id,
      };
      this.setState(
        {
          isSkuResolved: true,
          SkuSelectedValues,
          selectedColor: PickupSkuFormValues.color,
        },
        () => {
          if (!isPickUpWarningModal)
            this.deriveSkuInfoAndSearch(
              locationPromise,
              colorFitsSizesMap,
              formData,
              cartItemsCount
            );
        }
      );
    } else if (!isPickUpWarningModal) {
      this.deriveSkuInfoAndSearch(locationPromise, colorFitsSizesMap, formData, cartItemsCount);
    }
  }

  handleSearchInCurrentCartStoresSubmit(skuId, quantity) {
    const { onSearchInCurrentCartStoresSubmit } = this.props;
    this.skuId = skuId;
    this.quantity = quantity;
    return onSearchInCurrentCartStoresSubmit(skuId, quantity);
  }

  /**
   * @method showFitsForProduct
   * @description this method returns the bool value, to show product
   * fits properties
   */
  showFitsForProduct() {
    const { currentProduct, initialValues } = this.props;
    const currentColorEntry = getMapSliceForColor(
      currentProduct.colorFitsSizesMap,
      initialValues.color
    );
    return currentColorEntry && currentColorEntry.hasFits;
  }

  renderModal() {
    const {
      isPreferredStoreError,
      isShowExtendedSizesNotification,
      isShoppingBag,
      cartBopisStoresList,
      maxAllowedStoresInCart,
      currentProduct,
      distancesMap,
      onColorChange,
      isCanada,
      isPlcc,
      isBopisCtaEnabled,
      isBossCtaEnabled,
      updateCartItemStore,
      isPickUpWarningModal,
      defaultStore,
      currencySymbol,
      isInternationalShipping,
      isBopisEnabled,
      isBossEnabled,
      showDefaultSizeMsg,
      isRadialInventoryEnabled,
      cartItemsCount,
      storeSearchError,
      onClearSearchFormError,
      addItemToCartInPickup,
      updatePickUpCartItem,
      currency,
      currencyAttributes,
      PickupSkuFormValues,
      addToBagError,
      navigation,
      initialValuesFromBagPage,
      isItemShipToHome,
    } = this.props;
    let { colorFitSizeDisplayNames } = this.props;
    let { name } = currentProduct;
    const { colorFitsSizesMap } = currentProduct;

    name = currentProduct ? currentProduct.name : name;

    const {
      SkuSelectedValues = {},
      SkuSelectedValues: { color, Fit, Size } = {},
      isSkuResolved,
      selectedColor,
    } = this.state;

    const isSearchOnlyInCartStores = maxAllowedStoresInCart <= cartBopisStoresList.length;

    const prices = getPrices(currentProduct, color, Fit, Size);

    // initialFormValues has the latest sku details to be passed in step 2
    // const initialFormValues = {
    //   distance: distancesMap && distancesMap[0] && distancesMap[0].id,
    //   ...this.SkuSelectedValues,
    // };
    /** allowBossStoreSearch flag allows searching in stores forcefully irrespective of
     *  store limit reached or if both the store available in account is bopis stores
     * */

    const allowBossStoreSearch = updateCartItemStore && !isBopisCtaEnabled && isBossCtaEnabled;

    /**
     * bopisChangeStore - checks if the product getting changed from bag is only bopis
     * product
     */
    const bopisChangeStore = updateCartItemStore && isBopisCtaEnabled && !isBossCtaEnabled;
    colorFitSizeDisplayNames = {
      color: 'Color',
      fit: 'Fit',
      size: 'Size',
      size_alt: 'Size',
      ...colorFitSizeDisplayNames,
    };

    return (
      <>
        <PickupSkuSelectionForm
          colorFitSizeDisplayNames={colorFitSizeDisplayNames}
          isShowExtendedSizesNotification={isShowExtendedSizesNotification}
          isPreferredStoreError={isPreferredStoreError}
          onEditSku={this.handleEditSkuDetails}
          promotionalMessage={currentProduct.promotionalMessage}
          promotionalPLCCMessage={currentProduct.promotionalPLCCMessage}
          isPickUpWarningModal={isPickUpWarningModal}
          onColorChange={onColorChange}
          productInfo={currentProduct}
          isCanada={isCanada}
          name={name}
          isPlcc={isPlcc}
          currencySymbol={currencySymbol}
          isInternationalShipping={isInternationalShipping}
          prices={prices}
          showDefaultSizeMsg={showDefaultSizeMsg}
          isSkuResolved={isSkuResolved}
          currentProduct={currentProduct}
          initialValues={SkuSelectedValues}
          selectedColor={selectedColor}
          currency={currency}
          currencyExchange={currencyAttributes.exchangevalue}
          className="pickup-sku-selection"
          onCloseClick={this.onCloseClick}
          navigation={navigation}
        />
        <PickupStoreSelectionFormContainer
          colorFitSizeDisplayNames={colorFitSizeDisplayNames}
          maxAllowedStoresInCart={maxAllowedStoresInCart}
          colorFitsSizesMap={colorFitsSizesMap}
          cartBopisStoresList={cartBopisStoresList}
          distancesMap={distancesMap}
          imagePath={getIconImageForColor(currentProduct, color)}
          initialValues={SkuSelectedValues}
          isPreferredStoreError={isPreferredStoreError}
          isSearchOnlyInCartStores={isSearchOnlyInCartStores}
          isPickUpWarningModal={isPickUpWarningModal}
          isShoppingBag={isShoppingBag}
          isShowExtendedSizesNotification={isShowExtendedSizesNotification}
          listPrice={prices.listPrice}
          name={name}
          offerPrice={prices.offerPrice}
          onAddItemToCart={addItemToCartInPickup}
          onUpdatePickUpItem={updatePickUpCartItem}
          onCloseClick={this.onCloseClick}
          onSubmit={this.handleSearchAreaStoresSubmit}
          promotionalMessage={currentProduct.promotionalMessage}
          promotionalPLCCMessage={currentProduct.promotionalPLCCMessage}
          currentProduct={currentProduct}
          addToCartError={addToBagError}
          isBopisCtaEnabled={isBopisCtaEnabled}
          isBossCtaEnabled={isBossCtaEnabled}
          updateCartItemStore={updateCartItemStore}
          allowBossStoreSearch={allowBossStoreSearch}
          bopisChangeStore={bopisChangeStore}
          currencySymbol={currencySymbol}
          isBopisEnabled={isBopisEnabled}
          isBossEnabled={isBossEnabled}
          isGiftCard={currentProduct.isGiftCard}
          isRadialInventoryEnabled={isRadialInventoryEnabled}
          defaultStore={defaultStore}
          itemsCount={cartItemsCount}
          isCanada={isCanada}
          isPlcc={isPlcc}
          isInternationalShipping={isInternationalShipping}
          storeSearchError={storeSearchError}
          onClearSearchFormError={onClearSearchFormError}
          isSkuResolved={isSkuResolved}
          PickupSkuFormValues={PickupSkuFormValues}
          initialValuesFromBagPage={initialValuesFromBagPage}
          isItemShipToHome={isItemShipToHome}
          currencyExchange={currencyAttributes.exchangevalue}
        />
      </>
    );
  }

  render() {
    const { pickupModalHeading, className } = this.props;
    return (
      <Modal
        isOpen
        onRequestClose={this.onCloseClick}
        overlayClassName="TCPModal__Overlay"
        className={`${className} TCPModal__Content`}
        heading={pickupModalHeading}
        fixedWidth
        fullWidth
        stickyHeader
        inheritedStyles={modalstyles}
        widthConfig={{ small: '375px', medium: '600px', large: '704px' }}
        heightConfig={{ minHeight: '534px', height: '620', maxHeight: '650' }}
        headingAlign="center"
        horizontalBar={false}
        stickyCloseIcon
      >
        {this.renderModal()}
      </Modal>
    );
  }
}

export default withStyles(errorBoundary(PickUpStoreModalView), styles);
export { PickUpStoreModalView as PickUpStoreModalViewVanilla };
