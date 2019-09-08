/* eslint-disable no-underscore-dangle */
/**
 * @module PickUpStoreModal
 * @desc Component to display PickUp in Store  Modal
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../molecules/Modal';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import { STORE_SUMMARY_PROP_TYPES } from '../PickUpStoreModal.proptypes';
import {
  getMapSliceForColor,
  getIconImageForColor,
  getPrices,
  checkAndGetDefaultFitName,
} from '../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { SKU_DETAILS } from '../PickUpStoreModal.constants';
import PickupSkuSelectionForm from '../molecules/PickupSkuSelectionForm';
import PickupStoreSelectionForm, {
  DISTANCES_MAP_PROP_TYPE,
} from '../molecules/PickupStoreSelectionForm';
import spacing from '../../../../../../styles/themes/TCP/spacing';

const ERRORS_MAP = require('../../../../../services/handler/stateful/errorResponseMapping');

class PickUpStoreModalView extends React.Component {
  static propTypes = {
    /* the list of stores currently in the cart */
    cartBopisStoresList: PropTypes.arrayOf(
      PropTypes.shape({
        basicInfo: PropTypes.shape({
          storeName: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,

    /** labels for selection fields */
    colorFitSizeDisplayNames: PropTypes.shape({
      /** label for color selection field */
      color: PropTypes.string,
      /** label for fit selection field */
      fit: PropTypes.string,
      /** label for size selection field */
      size: PropTypes.string,
    }),

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
    onAddItemToCart: PropTypes.func.isRequired,

    /**
     * Function to call when the item has been successfully added to, or updated
     * in, the cart.
     */
    onAddItemToCartSuccess: PropTypes.func,

    /** callback for closing this modal */
    onCloseClick: PropTypes.func.isRequired,

    onColorChange: PropTypes.func.isRequired,

    /**
     * Callback to run on component mount
     * (usually to populate redux store information consumened by this component).
     * Should return a promise
     * */
    onMount: PropTypes.func.isRequired,

    /** the maximum number of different stores used for BOPIS in a single shopping cart.
     * must be at least 1 */

    /** submit method for PickupStoreSelectionForm */
    onSearchAreaStoresSubmit: PropTypes.func.isRequired,

    /** submit method for BopisCartStoresInventoryForm */
    onSearchInCurrentCartStoresSubmit: PropTypes.func.isRequired,

    productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,

    /** an optional identifier to be passed to onAddItemToCart */
    requestorKey: PropTypes.string,
    pickupHeading: PropTypes.string.isRequired,
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
    autoSkipStep1: PropTypes.bool,
    showDefaultSizeMsg: PropTypes.bool,
    isRadialInventoryEnabled: PropTypes.number,
    itemsCount: PropTypes.number,
    defaultStore: STORE_SUMMARY_PROP_TYPES,
  };

  static defaultProps = {
    colorFitSizeDisplayNames: null,
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
    itemsCount: 0,
    defaultStore: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formValues: props.initialValues,
      isSkuResolved:
        this.validateSkuDetails(props.initialValues, props.openSkuSelectionForm) &&
        (props.autoSkipStep1 || !props.showDefaultSizeMsg),
      error: null,
    };
    this.skuFormValues = props.initialValues; //  skuFormValues has the initial and latest sku details to keep step 1 and step 2 in sync
    this.skuId = null;
    this.quantity = null;

    this.handleSearchAreaStoresSubmit = this.handleSearchAreaStoresSubmit.bind(this);
    this.handleSearchInCurrentCartStoresSubmit = this.handleSearchInCurrentCartStoresSubmit.bind(
      this
    );
    this.handleAddItemToCart = this.handleAddItemToCart.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNextStep = this.handleNextStep.bind(this);
    this.handleEditSkuDetails = this.handleEditSkuDetails.bind(this);
  }

  /** Validate SKU detils if SKU is resolved or not */
  validateSkuDetails(initialValues, openSkuSelectionForm) {
    if (openSkuSelectionForm) {
      return false;
    }
    let isValidSKU = true;
    Object.keys(initialValues).forEach(key => {
      if (
        initialValues[key] &&
        (key !== SKU_DETAILS.fit || (key === SKU_DETAILS.fit && this.showFitsForProduct()))
      ) {
        isValidSKU = false;
      }
    });
    return isValidSKU;
  }

  /** Handle click of Next button on Step 1 - which will switch to Step 2 */
  handleNextStep(formData) {
    this.skuFormValues = formData;
    this.setState(oldState => ({
      isSkuResolved: !oldState.isSkuResolved,
      formValues: formData,
    }));
  }

  /** Handle click of Edit button on Step 2 - which will switch to Step 1 */
  handleEditSkuDetails() {
    this.setState(oldState => ({ isSkuResolved: !oldState.isSkuResolved }));
  }

  handleFormChange(formData) {
    const { productInfo } = this.props;
    const formValues = formData;
    formValues.fit = checkAndGetDefaultFitName(
      formData.fit,
      formData.color,
      productInfo.colorFitsSizesMap
    );
    this.setState({ formValues });
  }

  handleSearchAreaStoresSubmit(skuId, quantity, distance, locationPromise, variantId) {
    const { onSearchAreaStoresSubmit } = this.props;
    this.skuId = skuId;
    this.quantity = quantity;
    return onSearchAreaStoresSubmit(skuId, quantity, distance, locationPromise, variantId);
  }

  handleSearchInCurrentCartStoresSubmit(skuId, quantity) {
    const { onSearchInCurrentCartStoresSubmit } = this.props;
    this.skuId = skuId;
    this.quantity = quantity;
    return onSearchInCurrentCartStoresSubmit(skuId, quantity);
  }

  handleAddItemToCart(formData) {
    const {
      productInfo,
      onCloseClick,
      onAddItemToCartSuccess,
      requestorKey,
      isBopisCtaEnabled,
      isBossCtaEnabled,
      onAddItemToCart,
      updateCartItemStore,
    } = this.props;
    this.setState({ error: null });
    return onAddItemToCart(formData, requestorKey, isBopisCtaEnabled, isBossCtaEnabled)
      .then(() => {
        // TODO - Do we need this ? - setDefaultSizes(isShowDefaultSize, productInfo, formData);
        onCloseClick();
        if (!onAddItemToCartSuccess) {
          return null;
        }
        const addedProductInfo = {
          isGiftCard: false,
          productName: productInfo.name,
          skuInfo: {
            skuId: formData.skuId,
            imageUrl: getIconImageForColor(productInfo, formData.color),
            color: getMapSliceForColor(productInfo.colorFitsSizesMap, formData.color).color,
            fit: formData.fit,
            size: formData.size,
          },
          quantity: formData.quantity,
          orderItemId: formData.orderItemId,
        };
        onAddItemToCartSuccess(addedProductInfo);
        return addedProductInfo;
      })
      .catch(error => {
        let {
          errors: { _error },
        } = error;
        if (
          _error !== ERRORS_MAP._ERR_MORE_THAN_15_ITEM_IN_CART_ERROR.errorMessage &&
          _error !== ERRORS_MAP._API_CANT_RESOLVE_FFMCENTER.errorMessage
        ) {
          // showing oops an error occured if error type is anything but the above 2
          _error = ERRORS_MAP.ERROR_MESSAGES_BOPIS.storeSearchException;
        } else if (
          _error === ERRORS_MAP._ERR_MORE_THAN_15_ITEM_IN_CART_ERROR.errorMessage &&
          updateCartItemStore
        ) {
          // showing alternate error message for more than 15 error type if being used from cart page
          _error = ERRORS_MAP._ERR_MORE_THAN_15_ITEM_IN_CART_ERROR.altMessage;
        }

        this.setState({ error: _error || ERRORS_MAP.ERROR_MESSAGES_BOPIS.storeSearchException });
      });
  }

  /**
   * @method showFitsForProduct
   * @description this method returns the bool value, to show product
   * fits properties
   */
  showFitsForProduct() {
    const { productInfo, initialValues } = this.props;
    const currentColorEntry = getMapSliceForColor(
      productInfo.colorFitsSizesMap,
      initialValues.color
    );
    return currentColorEntry && currentColorEntry.hasFits;
  }

  renderNormal() {
    const {
      isPreferredStoreError,
      isShowExtendedSizesNotification,
      isShoppingBag,
      cartBopisStoresList,
      maxAllowedStoresInCart,
      onCloseClick,
      productInfo,
      productInfo: { name, colorFitsSizesMap },
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
      onMount,
      showDefaultSizeMsg,
      isRadialInventoryEnabled,
      itemsCount,
    } = this.props;
    let { colorFitSizeDisplayNames } = this.props;

    const isSearchOnlyInCartStores = maxAllowedStoresInCart <= cartBopisStoresList.length;

    const {
      formValues,
      formValues: { color, fit, size },
      isSkuResolved,
      error,
    } = this.state;

    const prices = getPrices(productInfo, color, fit, size);

    // initialFormValues has the latest sku details to be passed in step 2
    const initialFormValues = {
      distance: distancesMap[0].id,
      ...formValues,
    };
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
      <div
        className={`pickup-modal-wrapper ${
          isSkuResolved ? ' scrollable-pickup-modal-wrapper' : ' '
        }`}
      >
        {!isSkuResolved && (
          <PickupSkuSelectionForm
            colorFitSizeDisplayNames={colorFitSizeDisplayNames}
            colorFitsSizesMap={colorFitsSizesMap}
            initialValues={this.skuFormValues}
            onColorChange={onColorChange}
            onChange={this.handleFormChange}
            onSubmit={this.handleNextStep}
            productInfo={productInfo}
            isCanada={isCanada}
            isPlcc={isPlcc}
            currencySymbol={currencySymbol}
            isInternationalShipping={isInternationalShipping}
            listPrice={prices.listPrice}
            offerPrice={prices.offerPrice}
            showDefaultSizeMsg={showDefaultSizeMsg}
          />
        )}
        {isSkuResolved && (
          <PickupStoreSelectionForm
            colorFitSizeDisplayNames={colorFitSizeDisplayNames}
            maxAllowedStoresInCart={maxAllowedStoresInCart}
            colorFitsSizesMap={colorFitsSizesMap}
            cartBopisStoresList={cartBopisStoresList}
            distancesMap={distancesMap}
            imagePath={getIconImageForColor(productInfo, color)}
            initialValues={initialFormValues}
            isPreferredStoreError={isPreferredStoreError}
            isSearchOnlyInCartStores={isSearchOnlyInCartStores}
            isPickUpWarningModal={isPickUpWarningModal}
            isShoppingBag={isShoppingBag}
            onEditSku={this.handleEditSkuDetails}
            isShowExtendedSizesNotification={isShowExtendedSizesNotification}
            listPrice={prices.listPrice}
            name={name}
            offerPrice={prices.offerPrice}
            onAddItemToCart={this.handleAddItemToCart}
            onCloseClick={onCloseClick}
            onSubmit={this.handleSearchAreaStoresSubmit}
            promotionalMessage={productInfo.promotionalMessage}
            promotionalPLCCMessage={productInfo.promotionalPLCCMessage}
            onMount={onMount}
            addToCartError={error}
            isBopisCtaEnabled={isBopisCtaEnabled}
            isBossCtaEnabled={isBossCtaEnabled}
            updateCartItemStore={updateCartItemStore}
            allowBossStoreSearch={allowBossStoreSearch}
            bopisChangeStore={bopisChangeStore}
            currencySymbol={currencySymbol}
            isBopisEnabled={isBopisEnabled}
            isBossEnabled={isBossEnabled}
            isGiftCard={productInfo.isGiftCard}
            isRadialInventoryEnabled={isRadialInventoryEnabled}
            defaultStore={defaultStore}
            itemsCount={itemsCount}
            isCanada={isCanada}
            isPlcc={isPlcc}
            isInternationalShipping={isInternationalShipping}
          />
        )}
      </div>
    );
  }

  render() {
    const { pickupHeading } = this.props;
    return (
      <Modal
        colSet={{ large: 4, medium: 8, small: 6 }}
        isOpen
        onRequestClose={this.onCloseModal}
        overlayClassName="TCPModal__Overlay"
        className="TCPModal__Content"
        heading={pickupHeading}
        fixedWidth
        maxWidth={spacing.MODAL_WIDTH.SMALL}
        minHeight="675px"
      >
        {this.renderNormal()}
      </Modal>
    );
  }
}

export default PickUpStoreModalView;
