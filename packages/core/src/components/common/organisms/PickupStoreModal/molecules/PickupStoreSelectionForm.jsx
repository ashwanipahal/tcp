/* eslint-disable max-lines */
import React from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field, propTypes as reduxFormPropTypes } from 'redux-form';
import createValidateMethod from '../../../../../utils/formValidation/createValidateMethod';
import { getAddressLocationInfo } from '../../../../../utils/addressLocation';
import {
  getSkuId,
  getVariantId,
  getMapSliceForSize,
  isProductOOS,
  isBOSSProductOOSQtyMismatched,
} from '../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import Spinner from '../atoms/Spinner';
import Button from '../../../atoms/Button';
import BodyCopy from '../../../atoms/BodyCopy';
import { PICKUP_LABELS, BOPIS_ITEM_AVAILABILITY } from '../PickUpStoreModal.constants';
import { minStoreCount } from '../PickUpStoreModal.config';
import LabeledInput from '../../../atoms/LabeledInput';
import LabeledSelect from '../../../atoms/LabeledSelect';
import PickupStoreListContainer from './PickupStoreList';
import PickupStoreListItem from './PickupStoreListItem';
import PickupProductFormPart from './PickupProductFormPart';

export const DISTANCES_MAP_PROP_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  })
);

class _PickupStoreSelectionForm extends React.Component {
  static propTypes = {
    /** The map of distances options to select the radius of search */
    distancesMap: DISTANCES_MAP_PROP_TYPE.isRequired,
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

    /** indicates the 'extended' sizes not available for bopis notification needs to show
     * (only when user attempted to select it)
     */
    isShowExtendedSizesNotification: PropTypes.bool.isRequired,

    /**
     * indicates the modal is shown because of an error trying to add to the preferred store
     * (required only in PDP)
     */
    isPreferredStoreError: PropTypes.bool.isRequired,

    // determines if variation is warning modal
    isPickUpWarningModal: PropTypes.bool.isRequired,

    /** Props passed by the redux-form Form HOC. */
    ...reduxFormPropTypes,
    promotionalMessage: PropTypes.string,
    promotionalPLCCMessage: PropTypes.string,

    /** Check to allow display of warning msg */
    /** global switches for BOSS and BOPIS */
    isBossEnabled: PropTypes.bool.isRequired,
    isBopisEnabled: PropTypes.bool.isRequired,
    isRadialInventoryEnabled: PropTypes.number.isRequired,
    itemsCount: PropTypes.number.isRequired,
  };

  static defaultProps = {
    promotionalMessage: '',
    promotionalPLCCMessage: '',
  };

  constructor(props) {
    super(props);
    this.place = null;
    this.formData = null;
    this.state = {
      isLoading: true,
      selectedStoreId: null,
      isBossSelected: null,
      isShowMessage: false,
    };
    this.onSearch = this.onSearch.bind(this);
    this.untouch = this.untouch.bind(this);
    this.isShowDistanceForFavorite = false;
    this.preferredStore = null;
    this.isAutoSearchTrigerred = false;
  }

  componentDidMount() {
    const {
      initialValues,
      isPickUpWarningModal,
      onMount,
      colorFitsSizesMap,
      itemsCount,
    } = this.props;
    const skuId = getSkuId(
      colorFitsSizesMap,
      initialValues.color,
      initialValues.fit,
      initialValues.size
    );
    const currentSizeEntry = getMapSliceForSize(
      colorFitsSizesMap,
      initialValues.color,
      initialValues.fit,
      initialValues.size
    );
    const variantNo = currentSizeEntry && currentSizeEntry.variantNo;
    const itemPartNumber = getVariantId(
      colorFitsSizesMap,
      initialValues.color,
      initialValues.fit,
      initialValues.size
    );
    // invoking the API for fethhing store in user details

    if (!isPickUpWarningModal && itemsCount > 0) {
      onMount(skuId, variantNo, initialValues.quantity, itemPartNumber)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false }));
    }
    if (itemsCount === 0) {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate() {
    if (this.prePopulateZipCode()) {
      /*
       * If zipcode needs to be prepupulated then this method triggers
       * store's search automatically from user's default store zipcode
       */
      const { defaultStore, change, handleSubmit } = this.props;
      const {
        basicInfo: {
          address: { zipCode },
        },
      } = defaultStore;
      change('addressLocation', zipCode);
      // submitting the search form forcefully
      // Adding setTimeout to handle case when fav store comes on the fly from API, not from redux
      setTimeout(() => handleSubmit(this.onSearch)(), 1);
      this.isAutoSearchTrigerred = true;
    }
  }

  onSearch(formData) {
    const { colorFitsSizesMap, onSubmit } = this.props;

    this.setState({
      selectedStoreId: null,
      isBossSelected: null,
    });
    const skuId = getSkuId(colorFitsSizesMap, formData.color, formData.fit, formData.size);
    const variantId = getVariantId(colorFitsSizesMap, formData.color, formData.fit, formData.size);
    const locationPromise = this.place
      ? Promise.resolve(this.place.geometry.location)
      : getAddressLocationInfo(formData.addressLocation);
    return onSubmit(skuId, formData.quantity, formData.distance, locationPromise, variantId).then(
      () => {
        this.formData = { ...formData, skuId };
        this.untouch();
      }
    );
  }

  getDefaultStoreZipcode() {
    const { defaultStore } = this.props;
    return (
      defaultStore &&
      defaultStore.basicInfo &&
      defaultStore.basicInfo.address &&
      defaultStore.basicInfo.address.zipCode
    );
  }

  getIsBopisAvailable() {
    return (
      this.preferredStore.productAvailability.status === BOPIS_ITEM_AVAILABILITY.AVAILABLE ||
      this.preferredStore.productAvailability.status === BOPIS_ITEM_AVAILABILITY.LIMITED
    );
  }

  getPreferredStoreData(defaultStore) {
    this.preferredStore =
      defaultStore && defaultStore.basicInfo && defaultStore.basicInfo.isDefault
        ? defaultStore
        : null;
    return (
      this.preferredStore &&
      this.preferredStore.productAvailability &&
      this.preferredStore.productAvailability.status
    );
  }

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
     * The varialbe handles the condition to show boss warning msg on cart page.
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
    return SELECT_STORE;
  };

  /**
   * @method handleStoreSelect
   * @description this method sets the selected store
   * For desktop it adds the item to cart
   */
  handleStoreSelect = (storeId, isBoss) => {
    //  TODO - May be we need similar check to cater different functionality of mobile web -
    //  Setting default value as false for now..
    const { isMobile = false } = this.props;
    this.setState({
      selectedStoreId: storeId,
      isBossSelected: isBoss,
      isShowMessage: !isMobile,
    });
    if (!isMobile) {
      this.handleAddTobag(storeId, isBoss);
    }
  };

  /**
   * @method handleAddTobag
   * @description this method adds item to bag
   * called in case of mobile only
   */
  handleAddTobag = (storeId, isBoss) => {
    const { selectedStoreId, isBossSelected } = this.state;
    const { colorFitsSizesMap, initialValues, onAddItemToCart } = this.props;
    this.setState({
      selectedStoreId: storeId || selectedStoreId,
      isBossSelected: isBoss || isBossSelected,
      isShowMessage: true,
    });
    /**
     * added initial values to send in AddItem params.
     * Previously it was only handled post user searching
     * If searching is blocked then the intitial values received
     * will be passed as the expected params
     */
    const itemPartNumber = getVariantId(
      colorFitsSizesMap,
      initialValues.color,
      initialValues.fit,
      initialValues.size
    );
    const currentSizeEntry = getMapSliceForSize(
      colorFitsSizesMap,
      initialValues.color,
      initialValues.fit,
      initialValues.size
    );
    const variantNo =
      currentSizeEntry && currentSizeEntry.variantNo ? currentSizeEntry.variantNo : null;
    const skuId = getSkuId(
      colorFitsSizesMap,
      initialValues.color,
      initialValues.fit,
      initialValues.size
    );
    const productDetails = !this.formData
      ? { ...initialValues, skuId, storeId, isBoss, itemPartNumber, variantNo }
      : { ...this.formData, storeId, isBoss, itemPartNumber, variantNo };
    return onAddItemToCart(productDetails);
  };

  untouch() {
    const { untouch } = this.props;
    untouch('color');
    untouch('size');
    untouch('fit');
    untouch('quantity');
    untouch('addressLocation');
    untouch('distance');
  }

  prePopulateZipCode() {
    /** This method validates if zipcode needs to be propulated or not.
     * !this.formData.addressLocation - this check is to ensure that
     * auto search will not overwrite manual search
     * !this.isAutoSearchTrigerred - this check is to ensure that
     * autosearch should be trigerred only once in componentDidUpdate
     * Since default store is already set till user reaches this modal,
     * prevProps and newProps are always same; thus using this check;
     * this.props.allowBossStoreSearch - this check is to allow search
     *  from change store link on my bag
     * !this.props.isSearchOnlyInCartStores - this is to check if there is no restriction modal
     * isLoading - This check is for restricted modal scenario to avoid API call till
     * getUserBopisStore API returns data
     */
    const { allowBossStoreSearch, isSearchOnlyInCartStores, isPickUpWarningModal } = this.props;
    const { isLoading } = this.state;

    const showStoreSearchForm =
      !isPickUpWarningModal && !isLoading && (allowBossStoreSearch || !isSearchOnlyInCartStores);
    const isValidZipCode = this.getDefaultStoreZipcode();
    return (
      isValidZipCode &&
      !this.isAutoSearchTrigerred &&
      showStoreSearchForm &&
      (!this.formData || !this.formData.addressLocation)
    );
  }

  deriveBossCtaEnabled() {
    const {
      isRadialInventoryEnabled,
      isBossCtaEnabled,
      colorFitsSizesMap,
      initialValues,
    } = this.props;
    let isRadialBossEnabled = isBossCtaEnabled;
    if (isRadialInventoryEnabled) {
      isRadialBossEnabled =
        !isBOSSProductOOSQtyMismatched(colorFitsSizesMap, initialValues) && isBossCtaEnabled;
    } else {
      isRadialBossEnabled = !isProductOOS(colorFitsSizesMap, initialValues) && isBossCtaEnabled;
    }
    return isRadialBossEnabled;
  }

  deriveStoreSearchAttributes() {
    const {
      cartBopisStoresList,
      maxAllowedStoresInCart,
      isSearchOnlyInCartStores,
      allowBossStoreSearch,
    } = this.props;

    const storeLimitReached = cartBopisStoresList.length === maxAllowedStoresInCart;
    const sameStore =
      storeLimitReached &&
      cartBopisStoresList[0].basicInfo.id === cartBopisStoresList[1].basicInfo.id;
    const showStoreSearching = allowBossStoreSearch || !isSearchOnlyInCartStores;

    return {
      storeLimitReached,
      sameStore,
      showStoreSearching,
    };
  }

  displayErrorCopy() {
    const { error, onCloseClick } = this.props;
    return error ? (
      <div className="error-box-bopis">
        <BodyCopy className="error-message">{error}</BodyCopy>
        <Button onClick={onCloseClick} type="button" className="button-cancel">
          Cancel
        </Button>
      </div>
    ) : null;
  }

  displayStoreSearchForm(showStoreSearching) {
    const { distancesMap, pristine, submitting } = this.props;
    return showStoreSearching ? (
      <div className="search-store">
        <BodyCopy className="find-store-label">{PICKUP_LABELS.FIND_STORE}</BodyCopy>
        <Field
          title="Zip or City, State"
          name="addressLocation"
          className="address-location-input"
          component={LabeledInput}
          placeholder="Zip or City, State"
        />
        <Field
          name="distance"
          component={LabeledSelect}
          optionsMap={distancesMap}
          className="distance-input"
          title="Distance"
        />
        <Button
          type="submit"
          title="search"
          className="button-search-bopis"
          disabled={pristine || submitting}
        >
          Search
        </Button>
      </div>
    ) : null;
  }

  displayStoreListItems({ isBossCtaEnabled, buttonLabel, sameStore }) {
    const {
      isShoppingBag,
      submitting,
      isSearchOnlyInCartStores,
      onCloseClick,
      addToCartError,
      isBopisCtaEnabled,
      updateCartItemStore,
      isBossEnabled,
      allowBossStoreSearch,
      defaultStore,
      bopisChangeStore,
      anyTouched,
      isBopisEnabled,
      isGiftCard,
    } = this.props;
    const { selectedStoreId, isBossSelected, isShowMessage } = this.state;

    return submitting ? (
      <Spinner />
    ) : (
      !anyTouched && (
        <PickupStoreListContainer
          isShoppingBag={isShoppingBag}
          onStoreSelect={this.handleStoreSelect}
          isResultOfSearchingInCartStores={isSearchOnlyInCartStores}
          onCancel={onCloseClick}
          sameStore={sameStore}
          selectedStoreId={selectedStoreId}
          isBossSelected={isBossSelected}
          addToCartError={isShowMessage ? addToCartError : ''}
          isBopisCtaEnabled={isBopisCtaEnabled}
          isBossCtaEnabled={isBossCtaEnabled}
          isBossEnabled={isBossEnabled}
          isBopisEnabled={isBopisEnabled}
          allowBossStoreSearch={allowBossStoreSearch}
          bopisChangeStore={bopisChangeStore}
          updateCartItemStore={updateCartItemStore}
          buttonLabel={buttonLabel}
          isGiftCard={isGiftCard}
          defaultStore={defaultStore}
        />
      )
    );
  }

  displayStoreSearchComp() {
    const { isLoading, selectedStoreId, isBossSelected, isShowMessage } = this.state;
    const {
      isShoppingBag,
      addToCartError,
      isBopisCtaEnabled,
      updateCartItemStore,
      isBossEnabled,
      isBopisEnabled,
      isGiftCard,
      defaultStore,
    } = this.props;
    const prefStoreWithData = this.getPreferredStoreData(defaultStore);
    const { storeLimitReached, sameStore, showStoreSearching } = this.deriveStoreSearchAttributes();
    const isBossCtaEnabled = this.deriveBossCtaEnabled();
    const buttonLabel = updateCartItemStore ? PICKUP_LABELS.UPDATE : PICKUP_LABELS.ADD_TO_BAG;

    return isLoading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <BodyCopy className="select-store-label">
          {this.renderVariationText(storeLimitReached, sameStore)}
        </BodyCopy>
        {!storeLimitReached && prefStoreWithData && (
          <div className="favorite-store-box">
            <PickupStoreListItem
              sameStore={sameStore}
              isShoppingBag={isShoppingBag}
              store={this.preferredStore}
              onStoreSelect={this.handleStoreSelect}
              isBopisSelected={
                this.preferredStore.basicInfo.id === selectedStoreId && !isBossSelected
              }
              isBossSelected={
                this.preferredStore.basicInfo.id === selectedStoreId && isBossSelected
              }
              selectedStoreId={selectedStoreId}
              isBopisAvailable={this.getIsBopisAvailable()}
              isBossAvailable={this.preferredStore.storeBossInfo.isBossEligible}
              // boss details of a store
              storeBossInfo={this.preferredStore.storeBossInfo}
              addToCartError={isShowMessage ? addToCartError : ''}
              isBopisCtaEnabled={isBopisCtaEnabled && isBopisEnabled}
              isBossCtaEnabled={isBossCtaEnabled && isBossEnabled}
              updateCartItemStore={updateCartItemStore}
              buttonLabel={buttonLabel}
              isShowDistance={this.isShowDistanceForFavorite}
              isGiftCard={isGiftCard}
            />
          </div>
        )}
        {this.displayStoreSearchForm(showStoreSearching)}
        {this.displayStoreListItems({
          isBossCtaEnabled,
          buttonLabel,
          sameStore,
        })}
        {this.displayErrorCopy()}
      </React.Fragment>
    );
  }

  render() {
    const {
      isShowExtendedSizesNotification,
      isPreferredStoreError,
      submitting,
      handleSubmit,
      change,
      name,
      listPrice,
      offerPrice,
      imagePath,
      colorFitsSizesMap,
      promotionalMessage,
      touch,
      isInternationalShipping,
      isCanada,
      isPlcc,
      currencySymbol,
      initialValues,
      onEditSku,
      promotionalPLCCMessage,
      isPickUpWarningModal,
      colorFitSizeDisplayNames,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSearch)} className="bopis-product-container">
        {isPickUpWarningModal && (
          <BodyCopy className="item-unavailable">{PICKUP_LABELS.ITEM_UNAVAILABLE}</BodyCopy>
        )}
        <PickupProductFormPart
          colorFitSizeDisplayNames={colorFitSizeDisplayNames}
          colorFitsSizesMap={colorFitsSizesMap}
          name={name}
          isShowExtendedSizesNotification={isShowExtendedSizesNotification}
          isPreferredStoreError={isPreferredStoreError}
          onEditSku={onEditSku}
          listPrice={listPrice}
          offerPrice={offerPrice}
          imagePath={imagePath}
          change={change}
          touch={touch}
          isDisabledSubmitButton={submitting}
          promotionalMessage={promotionalMessage}
          initialValues={initialValues}
          promotionalPLCCMessage={promotionalPLCCMessage}
          isPickUpWarningModal={isPickUpWarningModal}
          isCanada={isCanada}
          isHasPlcc={isPlcc}
          currencySymbol={currencySymbol}
          isInternationalShipping={isInternationalShipping}
        />
        {!isPickUpWarningModal && this.displayStoreSearchComp()}
      </form>
    );
  }
}

const validateMethod = createValidateMethod(PickupProductFormPart.defaultValidation);

const PickupStoreSelectionForm = reduxForm({
  form: 'bopisSearchStoresForm',
  ...validateMethod,
  keepDirtyOnReinitialize: true, // [https://github.com/erikras/redux-form/issues/3690] redux-forms 7.2.0 causes bug that forms will reInit after mount setting changed values back to init values
  touchOnChange: true, // to show validation error messageas even if user did not touch the fields
  touchOnBlur: false, // to avoid hidding the search results on blur of any field without changes
})(_PickupStoreSelectionForm);
PickupStoreSelectionForm.displayName = 'PickupStoreSelection';

export default PickupStoreSelectionForm;
