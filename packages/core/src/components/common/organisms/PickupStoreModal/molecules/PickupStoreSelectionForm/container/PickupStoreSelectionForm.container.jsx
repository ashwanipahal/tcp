/* eslint-disable max-lines */

import React from 'react';
import { PropTypes } from 'prop-types';
import { propTypes as reduxFormPropTypes, change } from 'redux-form';
import { connect } from 'react-redux';
import PickupStoreSelectionForm from '../views';
import { getBrand } from '../../../../../../../utils';
import { getAddressLocationInfo } from '../../../../../../../utils/addressLocation';
import {
  getSkuId,
  getVariantId,
  getMapSliceForSize,
  isProductOOS,
  isBOSSProductOOSQtyMismatched,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { PICKUP_LABELS, BOPIS_ITEM_AVAILABILITY } from '../../../PickUpStoreModal.constants';
import ORDER_ITEM_TYPE from '../../../../../../features/CnC/CartItemTile/CartItemTile.constants';
import { minStoreCount } from '../../../PickUpStoreModal.config';
import { getCartItemInfo } from '../../../../../../features/CnC/AddedToBag/util/utility';

export const DISTANCES_MAP_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  })
);

class PickupStoreSelectionFormContainer extends React.Component {
  static propTypes = {
    /** flags if to search in current cart stores (if true)
     * or offer user to enter location to look for nearby stores (if false)
     */
    isSearchOnlyInCartStores: PropTypes.bool.isRequired,
    /** Callback for submitting this form. its parameters depend on the value of the prop
     * isSearchOnlyInCartStores as follows:
     * if true then it accepts skuId, quantity;
     * if false then it accepts locationPromise, skuId, quantity;
     * where locationPromise resolves to a location object with lat() and lng() methods that return the
     * latitude and longitude around which to search.
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * Callback for adding an item to cart for pickup isn the selected store.
     * Accepts: storeId, skuId (of the selected color/fit/size combination), quantity
     */
    onAddItemToCart: PropTypes.func.isRequired,

    /** We need to differentiate if Bopis Modal is open from cart or other place to change select item button's message (DT-27100) */
    isShoppingBag: PropTypes.bool.isRequired,

    // determines if variation is warning modal
    isPickUpWarningModal: PropTypes.bool.isRequired,

    /** Props passed by the redux-form Form HOC. */
    ...reduxFormPropTypes,

    /** Check to allow display of warning msg */
    /** global switches for BOSS and BOPIS */
    isBossEnabled: PropTypes.bool.isRequired,
    isBopisEnabled: PropTypes.bool.isRequired,
    isRadialInventoryEnabled: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.place = null;
    this.formData = null;
    this.state = {
      selectedStoreId: null,
      isBossSelected: null,
      isShowMessage: false,
      selectedValue: 25,
    };
    this.onSearch = this.onSearch.bind(this);
    this.untouch = this.untouch.bind(this);
    this.handleAddTobag = this.handleAddTobag.bind(this);
    this.handlePickupRadioBtn = this.handlePickupRadioBtn.bind(this);
    this.prePopulateZipCode = this.prePopulateZipCode.bind(this);
    this.getPreferredStoreData = this.getPreferredStoreData.bind(this);
    this.getIsBopisAvailable = this.getIsBopisAvailable.bind(this);
    this.preferredStore = null;
    this.isAutoSearchTriggered = false;
    this.initialValues = {
      addressLocation: '',
      distance: 25,
    };
  }

  prePopulateZipCodeAndSearch = (handleSubmit, changeDispatch) => {
    if (this.prePopulateZipCode()) {
      /*
       * If zipcode needs to be prepupulated then this method triggers
       * store's search automatically from user's default store zipcode
       */
      const { defaultStore, isSkuResolved } = this.props;
      const {
        basicInfo: {
          address: { zipCode },
        },
      } = defaultStore;
      changeDispatch('addressLocation', zipCode);
      // submitting the search form forcefully in case of step-2
      const autoSearch = isSkuResolved;
      if (autoSearch) {
        // Adding setTimeout to handle case when fav store comes on the fly from API, not from redux
        setTimeout(() => handleSubmit(this.onSearch)(), 1);
        this.isAutoSearchTriggered = true;
      }
    }
  };

  onSearch = formData => {
    const { colorFitsSizesMap, onSubmit } = this.props;

    this.setState({
      selectedStoreId: null,
      isBossSelected: null,
    });

    const locationPromise = this.place
      ? Promise.resolve(this.place.geometry.location)
      : formData && getAddressLocationInfo(formData.addressLocation);
    onSubmit(locationPromise, colorFitsSizesMap, formData);
    this.formData = { ...formData };
  };

  getDefaultStoreZipcode = () => {
    const { defaultStore } = this.props;
    return (
      defaultStore &&
      defaultStore.basicInfo &&
      defaultStore.basicInfo.address &&
      defaultStore.basicInfo.address.zipCode
    );
  };

  getIsBopisAvailable = () => {
    const { defaultStore } = this.props;
    return (
      defaultStore &&
      defaultStore.productAvailability &&
      (defaultStore.productAvailability.status === BOPIS_ITEM_AVAILABILITY.AVAILABLE ||
        defaultStore.productAvailability.status === BOPIS_ITEM_AVAILABILITY.LIMITED)
    );
  };

  getPreferredStoreData = defaultStore => {
    this.preferredStore = defaultStore;
    return (
      this.preferredStore &&
      this.preferredStore.productAvailability &&
      this.preferredStore.productAvailability.status
    );
  };

  quantityChange = (selectedQuantity, form) => {
    this.setState({ selectedValue: selectedQuantity });
    const { dispatch } = this.props;
    dispatch(change(form, 'distance', selectedQuantity));
  };

  /**
   * @method renderVariationText
   * this method returns the variation text depending on the
   * stores selected by the user
   */
  renderVariationText = (storeLimitReached, sameStore) => {
    const { SELECT_STORE, ONE_STORE_SELECTED, SAME_STORE_BOPIS_BOPIS } = PICKUP_LABELS;
    const { cartBopisStoresList, allowBossStoreSearch, isBossCtaEnabled } = this.props;

    /**
     * @var allowBossMsgOnCart
     * The variable handles the condition to show boss warning msg on cart page.
     * @param allowBossStoreSearch carries the condition when boss item on cart is
     * selected for changing or toggling the store.
     */
    const showBossMsgOnCart = allowBossStoreSearch && cartBopisStoresList.length;

    /**
     * @var showBossMsgOnProductPages
     * The variable handles the condition to show boss warning msgs on product
     * pages - PDP, PLP, SLP when store selection Modal is opened.
     * @param isBossCtaEnabled - is added to show boss warning msg only on boss items.
     *
     */
    const showBossMsgOnProductPages =
      cartBopisStoresList.length === minStoreCount &&
      isBossCtaEnabled &&
      cartBopisStoresList[0].pickupType.isStoreBossSelected;

    const showBossWarningMsg = showBossMsgOnCart || showBossMsgOnProductPages;

    if (showBossWarningMsg) {
      // condition checks if there is only single BOSS selected store item in the cart, added by user
      return ONE_STORE_SELECTED;
    }
    if (sameStore || storeLimitReached) {
      // condition checks if the two stores in the cart are same for BOSS and BOPIS
      return SAME_STORE_BOPIS_BOPIS;
    }
    if (this.showStoreSearching) {
      return SELECT_STORE;
    }
    return '';
  };

  deriveSKUInfo = ({ colorFitsSizesMap } = this.props, { initialValues } = this.props) => {
    const { color, Fit, Size } = initialValues;
    const variantId = getVariantId(colorFitsSizesMap, color, Fit, Size);
    const currentSizeEntry = getMapSliceForSize(colorFitsSizesMap, color, Fit, Size);
    const variantNo =
      currentSizeEntry && currentSizeEntry.variantNo ? currentSizeEntry.variantNo : null;
    const skuId = getSkuId(colorFitsSizesMap, color, Fit, Size);
    return {
      skuId,
      variantId,
      variantNo,
    };
  };

  /**
   * @method handleAddTobag
   * @description this method adds item to bag
   */
  handleAddTobag = (storeLocId, isBoss) => {
    const { initialValues, onAddItemToCart, onCloseClick, currentProduct } = this.props;
    this.setState({
      isShowMessage: true,
    });
    const brand = getBrand();
    /**
     * added initial values to send in AddItem params.
     * Previously it was only handled post user searching
     * If searching is blocked then the intitial values received
     * will be passed as the expected params
     */
    const { color, Fit: fit, Size: size, Quantity: quantity } = initialValues;
    const formIntialValues = {
      // This is required as different teams have used different 'Fit' or 'fit' labels
      color,
      fit,
      size,
    };
    const productFormData = {
      ...formIntialValues,
      wishlistItemId: false,
      quantity,
      isBoss,
      brand,
      storeLocId,
    };
    const productInfo = getCartItemInfo(currentProduct, productFormData);
    const payload = {
      productInfo,
      callback: onCloseClick,
    };

    return onAddItemToCart(payload);
  };

  /**
   *
   * @method calculateTargetOrderType
   * @description this method returns targetOrderType
   * @memberof PickupStoreSelectionFormContainer
   */
  calculateTargetOrderType = (isBopisCtaEnabled, isBossCtaEnabled) => {
    if (isBopisCtaEnabled) {
      return ORDER_ITEM_TYPE.BOPIS;
    }
    if (isBossCtaEnabled) {
      return ORDER_ITEM_TYPE.BOSS;
    }
    return ORDER_ITEM_TYPE.ECOM;
  };

  /**
   *
   * @method handleUpdatePickUpItem
   * @description this method returns targetOrderType
   * @memberof PickupStoreSelectionFormContainer
   */
  handleUpdatePickUpItem = (selectedStoreId, isBossSelected) => {
    const {
      onUpdatePickUpItem,
      initialValues,
      initialValuesFromBagPage,
      currentProduct,
      onCloseClick,
      isBopisCtaEnabled,
      isBossCtaEnabled,
      isItemShipToHome,
    } = this.props;
    this.setState({
      isShowMessage: true,
    });
    const { itemBrand } = initialValuesFromBagPage;
    const { color, Fit: fit, Size: size, Quantity: quantity } = initialValues;
    const formIntialValues = {
      // This is required as different teams have used different 'Fit' or 'fit' labels
      color,
      fit,
      size,
    };
    const productFormData = {
      ...formIntialValues,
      wishlistItemId: false,
      quantity,
      isBoss: isBossSelected,
      brand: itemBrand,
      storeLocId: selectedStoreId,
    };
    const productInfo = getCartItemInfo(currentProduct, productFormData);
    const { orderId, orderItemId, orderItemType } = initialValuesFromBagPage;
    const {
      skuInfo: { skuId, variantNo, variantId },
      quantity: newQuantity,
    } = productInfo;
    const targetOrderType = this.calculateTargetOrderType(isBopisCtaEnabled, isBossCtaEnabled);

    const payload = {
      apiPayload: {
        orderId: orderId.toString(),
        orderItem: [
          {
            orderItemId,
            xitem_catEntryId: skuId,
            quantity: newQuantity.toString(),
            variantNo,
            itemPartNumber: variantId,
          },
        ],
        x_storeLocId: selectedStoreId,
        // replaced "ECOM" and "BOPIS" with a config variable
        x_orderitemtype: isItemShipToHome ? ORDER_ITEM_TYPE.ECOM : orderItemType, // source type of Item
        x_updatedItemType: targetOrderType,
      },
      callback: onCloseClick,
      updateActionType: 'UpdatePickUpItem',
    };
    onUpdatePickUpItem(payload);
  };

  /**
   * @method handlePickupRadioBtn
   * @description this method sets the pickup mode for store
   */
  handlePickupRadioBtn = (selectedStoreId, isBossSelected) => {
    this.setState({
      isBossSelected,
      selectedStoreId,
    });
  };

  untouch = () => {
    const { untouch } = this.props;
    untouch('color');
    untouch('size');
    untouch('fit');
    untouch('quantity');
    untouch('addressLocation');
    untouch('distance');
  };

  prePopulateZipCode = () => {
    /** This method validates if zipcode needs to be propulated or not.
     * !this.formData.addressLocation - this check is to ensure that
     * auto search will not overwrite manual search
     * !this.isAutoSearchTriggered - this check is to ensure that
     * autosearch should be trigerred only once in componentDidUpdate
     * Since default store is already set till user reaches this modal,
     * prevProps and newProps are always same; thus using this check;
     * this.props.allowBossStoreSearch - this check is to allow search
     *  from change store link on my bag
     * !this.props.isSearchOnlyInCartStores - this is to check if there is no restriction modal
     * isLoading - This check is for restricted modal scenario to avoid API call till
     * getUserBopisStore API returns data
     */
    const { defaultStore } = this.props;

    const showStoreSearchForm = this.showStoreSearching;
    const isValidZipCode =
      defaultStore &&
      defaultStore.basicInfo &&
      defaultStore.basicInfo.address &&
      defaultStore.basicInfo.address.zipCode;
    return (
      isValidZipCode &&
      !this.isAutoSearchTriggered &&
      showStoreSearchForm &&
      (!this.formData || !this.formData.addressLocation)
    );
  };

  deriveBossCtaEnabled = () => {
    const {
      isRadialInventoryEnabled,
      isBossCtaEnabled,
      colorFitsSizesMap,
      initialValues,
    } = this.props;
    let isRadialBossEnabled;
    if (isRadialInventoryEnabled) {
      isRadialBossEnabled =
        !isBOSSProductOOSQtyMismatched(colorFitsSizesMap, initialValues) && isBossCtaEnabled;
    } else {
      isRadialBossEnabled = !isProductOOS(colorFitsSizesMap, initialValues) && isBossCtaEnabled;
    }
    return isRadialBossEnabled;
  };

  deriveStoreSearchAttributes = () => {
    const {
      cartBopisStoresList,
      maxAllowedStoresInCart,
      isSearchOnlyInCartStores,
      allowBossStoreSearch,
      isSkuResolved,
      isGetUserStoresLoaded,
    } = this.props;

    const storeLimitReached = cartBopisStoresList.length === maxAllowedStoresInCart;
    const sameStore =
      storeLimitReached &&
      cartBopisStoresList[0].basicInfo.id === cartBopisStoresList[1].basicInfo.id;
    const showStoreSearching =
      !isSkuResolved ||
      allowBossStoreSearch ||
      (isGetUserStoresLoaded && !isSearchOnlyInCartStores);
    this.showStoreSearching = showStoreSearching;
    return {
      storeLimitReached,
      sameStore,
      showStoreSearching,
    };
  };

  render() {
    const {
      isPickUpWarningModal,
      updateCartItemStore,
      defaultStore,
      isSkuResolved,
      isShoppingBag,
      addToCartError,
      isBopisCtaEnabled,
      isBossEnabled,
      isBopisEnabled,
      isGiftCard,
      distancesMap,
      className,
      storeSearchError,
      PickupSkuFormValues,
      colorFitsSizesMap,
      isSearchOnlyInCartStores,
      onCloseClick,
      allowBossStoreSearch,
      bopisChangeStore,
      cartBopisStoresList,
      isGetUserStoresLoaded,
      error,
      openRestrictedModalForBopis,
    } = this.props;
    const { selectedStoreId, isBossSelected, isShowMessage, selectedValue } = this.state;

    return (
      <PickupStoreSelectionForm
        onSearch={this.onSearch}
        isPickUpWarningModal={isPickUpWarningModal}
        renderVariationText={this.renderVariationText}
        getPreferredStoreData={this.getPreferredStoreData}
        isGetUserStoresLoaded={isGetUserStoresLoaded}
        deriveStoreSearchAttributes={this.deriveStoreSearchAttributes}
        deriveBossCtaEnabled={this.deriveBossCtaEnabled}
        updateCartItemStore={updateCartItemStore}
        prePopulateZipCodeAndSearch={this.prePopulateZipCodeAndSearch}
        defaultStore={defaultStore}
        isSkuResolved={isSkuResolved}
        isShoppingBag={isShoppingBag}
        addToCartError={addToCartError}
        isBopisCtaEnabled={isBopisCtaEnabled}
        isBossEnabled={isBossEnabled}
        isBopisEnabled={isBopisEnabled}
        isGiftCard={isGiftCard}
        preferredStore={defaultStore}
        handleAddTobag={this.handleAddTobag}
        handlePickupRadioBtn={this.handlePickupRadioBtn}
        handleUpdatePickUpItem={this.handleUpdatePickUpItem}
        selectedStoreId={selectedStoreId}
        isBossSelected={isBossSelected}
        isShowMessage={isShowMessage}
        distancesMap={distancesMap}
        className={className}
        storeSearchError={storeSearchError}
        PickupSkuFormValues={PickupSkuFormValues}
        colorFitsSizesMap={colorFitsSizesMap}
        isSearchOnlyInCartStores={isSearchOnlyInCartStores}
        onCloseClick={onCloseClick}
        allowBossStoreSearch={allowBossStoreSearch}
        bopisChangeStore={bopisChangeStore}
        cartBopisStoresList={cartBopisStoresList}
        error={error}
        getIsBopisAvailable={this.getIsBopisAvailable}
        selectedValue={selectedValue}
        onQuantityChange={this.quantityChange}
        initialValues={this.initialValues}
        openRestrictedModalForBopis={openRestrictedModalForBopis}
      />
    );
  }
}

export default connect()(PickupStoreSelectionFormContainer);
