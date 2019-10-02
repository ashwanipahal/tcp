/* eslint-disable max-lines */

import React from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field, propTypes as reduxFormPropTypes } from 'redux-form';
import { getBrand } from '../../../../../../../utils';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import { getAddressLocationInfo } from '../../../../../../../utils/addressLocation';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import {
  getSkuId,
  getVariantId,
  getMapSliceForSize,
  isProductOOS,
  isBOSSProductOOSQtyMismatched,
} from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import Spinner from '../../../atoms/Spinner';
import BodyCopy from '../../../../../atoms/BodyCopy';
import { PICKUP_LABELS, BOPIS_ITEM_AVAILABILITY } from '../../../PickUpStoreModal.constants';
import { minStoreCount } from '../../../PickUpStoreModal.config';
import PickupStoreListContainer from '../../PickupStoreList';
import PickupStoreListItem from '../../PickupStoreListItem';
import withStyles from '../../../../../hoc/withStyles';
import PickupStoreSelectionFormStyle from '../styles/PickupStoreSelectionForm.style';
import { TextBox, SelectBox, Row, Col, Button } from '../../../../../atoms';
import { getCartItemInfo } from '../../../../../../features/CnC/AddedToBag/util/utility';

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
      isLoading: false,
      selectedStoreId: null,
      isBossSelected: null,
      isShowMessage: false,
    };
    this.onSearch = this.onSearch.bind(this);
    this.untouch = this.untouch.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
    this.handleAddTobag = this.handleAddTobag.bind(this);
    this.handlePickupRadioBtn = this.handlePickupRadioBtn.bind(this);
    this.preferredStore = null;
    this.isAutoSearchTrigerred = false;
  }

  onSearch(formData) {
    const { colorFitsSizesMap, onSubmit } = this.props;

    this.setState({
      selectedStoreId: null,
      isBossSelected: null,
    });

    const locationPromise = this.place
      ? Promise.resolve(this.place.geometry.location)
      : getAddressLocationInfo(formData.addressLocation);
    onSubmit(locationPromise, colorFitsSizesMap, formData);
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
    return SELECT_STORE;
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
   * @method handlePickupRadioBtn
   * @description this method sets the pickup mode for store
   */
  handlePickupRadioBtn(selectedStoreId, isBossSelected) {
    this.setState({
      isBossSelected,
      selectedStoreId,
    });
  }

  toggleLoader(isLoading = false) {
    this.setState({ isLoading });
  }

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
    let isRadialBossEnabled;
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
      isSkuResolved,
    } = this.props;

    const storeLimitReached = cartBopisStoresList.length === maxAllowedStoresInCart;
    const sameStore =
      storeLimitReached &&
      cartBopisStoresList[0].basicInfo.id === cartBopisStoresList[1].basicInfo.id;
    const showStoreSearching = !isSkuResolved || allowBossStoreSearch || !isSearchOnlyInCartStores;

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
      isBopisEnabled,
      isGiftCard,
      cartBopisStoresList,
    } = this.props;
    const { selectedStoreId, isBossSelected, isShowMessage } = this.state;

    return submitting ? (
      <Spinner />
    ) : (
      <PickupStoreListContainer
        isShoppingBag={isShoppingBag}
        onStoreSelect={this.handleAddTobag}
        onPickupRadioBtnToggle={this.handlePickupRadioBtn}
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
        cartBopisStoresList={cartBopisStoresList}
      />
    );
  }

  displayFavStore({
    storeLimitReached,
    prefStoreWithData,
    sameStore,
    buttonLabel,
    isBossCtaEnabled,
  }) {
    const { selectedStoreId, isBossSelected, isShowMessage } = this.state;
    const {
      isShoppingBag,
      addToCartError,
      isBopisCtaEnabled,
      updateCartItemStore,
      isBossEnabled,
      isBopisEnabled,
      isGiftCard,
    } = this.props;
    return (
      !storeLimitReached &&
      prefStoreWithData && (
        <div className="favorite-store-box">
          <PickupStoreListItem
            sameStore={sameStore}
            isShoppingBag={isShoppingBag}
            store={this.preferredStore}
            onStoreSelect={this.handleAddTobag}
            onPickupRadioBtnToggle={this.handlePickupRadioBtn}
            isBopisSelected={
              this.preferredStore.basicInfo.id === selectedStoreId && !isBossSelected
            }
            isBossSelected={this.preferredStore.basicInfo.id === selectedStoreId && isBossSelected}
            selectedStoreId={selectedStoreId}
            isBopisAvailable={this.getIsBopisAvailable()}
            isBossAvailable={this.preferredStore.storeBossInfo.isBossEligible}
            storeBossInfo={this.preferredStore.storeBossInfo}
            addToCartError={isShowMessage ? addToCartError : ''}
            isBopisCtaEnabled={isBopisCtaEnabled && isBopisEnabled}
            isBossCtaEnabled={isBossCtaEnabled && isBossEnabled}
            updateCartItemStore={updateCartItemStore}
            buttonLabel={buttonLabel}
            isGiftCard={isGiftCard}
          />
        </div>
      )
    );
  }

  displayStoreSearchForm(showStoreSearching) {
    const {
      distancesMap,
      pristine,
      submitting,
      className,
      storeSearchError,
      PickupSkuFormValues,
      colorFitsSizesMap,
      isSkuResolved,
    } = this.props;

    let disableButton = pristine;

    const formExists = Object.entries(PickupSkuFormValues).length === 0;

    const { color, Fit, Size } = PickupSkuFormValues;

    const enableButton = formExists ? pristine : true;

    const sizeAvailable = !formExists && getMapSliceForSize(colorFitsSizesMap, color, Fit, Size);
    disableButton = sizeAvailable && sizeAvailable.maxAvailable > 0 ? !sizeAvailable : enableButton;

    return showStoreSearching ? (
      <div className={className}>
        <BodyCopy
          className="find-store-label"
          fontFamily="secondary"
          fontSize="fs16"
          fontWeight="semibold"
        >
          {PICKUP_LABELS.FIND_STORE}
        </BodyCopy>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 4, large: 6 }}>
            <Field
              name="addressLocation"
              id="addressLocation"
              component={TextBox}
              className="zipcode-field"
              placeholder="Zip or City, State"
              enableSuccessCheck={false}
            />
          </Col>
          <Col colSize={{ small: 2, medium: 2, large: 3 }}>
            <Field
              name="distance"
              component={SelectBox}
              title="Distance"
              options={distancesMap}
              className="distance-input"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 2, large: 3 }} className="button-wrapper">
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              title="search"
              className="button-search-bopis"
              disabled={pristine || submitting || disableButton}
            >
              Search
            </Button>
          </Col>
        </Row>
        {isSkuResolved && (
          <BodyCopy
            className="storeSearchError"
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="extrabold"
            textAlign="center"
          >
            {storeSearchError}
          </BodyCopy>
        )}
      </div>
    ) : null;
  }

  displayStoreSearchComp() {
    const { isLoading } = this.state;
    const { updateCartItemStore, defaultStore, isSkuResolved } = this.props;
    const prefStoreWithData = this.getPreferredStoreData(defaultStore);
    const { storeLimitReached, sameStore, showStoreSearching } = this.deriveStoreSearchAttributes();
    const isBossCtaEnabled = this.deriveBossCtaEnabled();
    const buttonLabel = updateCartItemStore ? PICKUP_LABELS.UPDATE : PICKUP_LABELS.ADD_TO_BAG;

    return (
      <React.Fragment>
        {isSkuResolved && (
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {this.renderVariationText(storeLimitReached, sameStore)}
          </BodyCopy>
        )}
        {isSkuResolved &&
          this.displayFavStore({
            storeLimitReached,
            prefStoreWithData,
            sameStore,
            buttonLabel,
            isBossCtaEnabled,
          })}
        {this.displayStoreSearchForm(showStoreSearching)}
        {isLoading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {isSkuResolved &&
              this.displayStoreListItems({
                isBossCtaEnabled,
                buttonLabel,
                sameStore,
              })}
            {isSkuResolved && this.displayErrorCopy()}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { handleSubmit, isPickUpWarningModal } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSearch)}>
        {isPickUpWarningModal && (
          <BodyCopy className="item-unavailable">{PICKUP_LABELS.ITEM_UNAVAILABLE}</BodyCopy>
        )}
        {!isPickUpWarningModal && this.displayStoreSearchComp()}
      </form>
    );
  }
}

const defaultValidation = getStandardConfig(
  [{ addressLocation: 'addressLine1' }, { distance: 'distance' }],
  { stopOnFirstError: true }
);

const validateMethod = createValidateMethod(defaultValidation);

const PickupStoreSelectionForm = reduxForm({
  form: 'pickupSearchStoresForm',
  ...validateMethod,
  keepDirtyOnReinitialize: true, // [https://github.com/erikras/redux-form/issues/3690] redux-forms 7.2.0 causes bug that forms will reInit after mount setting changed values back to init values
  touchOnChange: true, // to show validation error messageas even if user did not touch the fields
  touchOnBlur: false, // to avoid hidding the search results on blur of any field without changes
})(_PickupStoreSelectionForm);
PickupStoreSelectionForm.displayName = 'PickupStoreSelection';

export default withStyles(PickupStoreSelectionForm, PickupStoreSelectionFormStyle);
