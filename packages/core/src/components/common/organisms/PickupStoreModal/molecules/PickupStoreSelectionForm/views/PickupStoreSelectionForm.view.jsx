/* eslint-disable max-lines */

import React from 'react';
import { PropTypes } from 'prop-types';
import { reduxForm, Field, propTypes as reduxFormPropTypes } from 'redux-form';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { getMapSliceForSize } from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import Spinner from '../../../atoms/Spinner';
import BodyCopy from '../../../../../atoms/BodyCopy';
import { PICKUP_LABELS } from '../../../PickUpStoreModal.constants';
import PickupStoreListContainer from '../../PickupStoreList';
import PickupStoreListItem from '../../PickupStoreListItem';
import withStyles from '../../../../../hoc/withStyles';
import PickupStoreSelectionFormStyle from '../styles/PickupStoreSelectionForm.style';
import { TextBox, SelectBox, Row, Col, Button } from '../../../../../atoms';

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
  };

  componentDidMount() {
    const { onSearch, openRestrictedModalForBopis } = this.props;
    if (openRestrictedModalForBopis) {
      onSearch();
    }
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
      handleAddTobag,
      handlePickupRadioBtn,
      handleUpdatePickUpItem,
      selectedStoreId,
      isBossSelected,
      isShowMessage,
    } = this.props;

    return submitting ? (
      <Spinner />
    ) : (
      <PickupStoreListContainer
        isShoppingBag={isShoppingBag}
        onStoreSelect={handleAddTobag}
        onStoreUpdate={handleUpdatePickUpItem}
        onPickupRadioBtnToggle={handlePickupRadioBtn}
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

  displayFavStore({
    storeLimitReached,
    prefStoreWithData,
    sameStore,
    buttonLabel,
    isBossCtaEnabled,
  }) {
    const {
      isShoppingBag,
      addToCartError,
      isBopisCtaEnabled,
      updateCartItemStore,
      isBossEnabled,
      isBopisEnabled,
      isGiftCard,
      preferredStore,
      handleAddTobag,
      handlePickupRadioBtn,
      handleUpdatePickUpItem,
      selectedStoreId,
      isBossSelected,
      isShowMessage,
      getIsBopisAvailable,
    } = this.props;
    return (
      !storeLimitReached &&
      prefStoreWithData && (
        <div className="favorite-store-box">
          <PickupStoreListItem
            sameStore={sameStore}
            isShoppingBag={isShoppingBag}
            store={preferredStore}
            onStoreSelect={handleAddTobag}
            onStoreUpdate={handleUpdatePickUpItem}
            onPickupRadioBtnToggle={handlePickupRadioBtn}
            isBopisSelected={preferredStore.basicInfo.id === selectedStoreId && !isBossSelected}
            isBossSelected={preferredStore.basicInfo.id === selectedStoreId && isBossSelected}
            selectedStoreId={selectedStoreId}
            isBopisAvailable={getIsBopisAvailable()}
            isBossAvailable={preferredStore.storeBossInfo.isBossEligible}
            storeBossInfo={preferredStore.storeBossInfo}
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

  displayStoreSearchComp() {
    const {
      getPreferredStoreData,
      isLoading,
      deriveStoreSearchAttributes,
      deriveBossCtaEnabled,
      updateCartItemStore,
      defaultStore,
      isSkuResolved,
      renderVariationText,
    } = this.props;

    const prefStoreWithData = getPreferredStoreData(defaultStore);
    const { storeLimitReached, sameStore, showStoreSearching } = deriveStoreSearchAttributes();
    const isBossCtaEnabled = deriveBossCtaEnabled();
    const buttonLabel = updateCartItemStore ? PICKUP_LABELS.UPDATE : PICKUP_LABELS.ADD_TO_BAG;

    return (
      <React.Fragment>
        {isSkuResolved && (
          <BodyCopy fontFamily="secondary" fontSize="fs14">
            {renderVariationText(storeLimitReached, sameStore)}
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
          <span>searching</span>
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
    const { handleSubmit, isPickUpWarningModal, onSearch } = this.props;

    return (
      <form onSubmit={handleSubmit(onSearch)}>
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
