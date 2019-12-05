/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { isAndroid } from '../../../../../../../utils/index.native';
import { Button } from '../../../../../atoms';
import withStyles from '../../../../../hoc/withStyles';
import PickupStoreListContainer from '../../PickupStoreList';
import PickupStoreListItem from '../../PickupStoreListItem';
import styles, {
  PickUpHeaderText,
  PickUpModalView,
  Row,
  AddressCol,
  DistanceCol,
  dropDownStyle,
  itemStyle,
} from '../styles/PickupStoreSelectionForm.style.native';
import { PICKUP_LABELS } from '../../../PickUpStoreModal.constants';

class PickupStoreSelectionForm extends React.PureComponent<Props> {
  componentDidMount() {
    const { onSearch, openRestrictedModalForBopis, isSkuResolved } = this.props;
    if (openRestrictedModalForBopis || isSkuResolved) {
      onSearch();
    }
  }

  componentDidUpdate() {
    const { prePopulateZipCodeAndSearch, handleSubmit, change } = this.props;
    prePopulateZipCodeAndSearch(handleSubmit, change);
  }

  displayStoreListItems({ isBossCtaEnabled, buttonLabel, sameStore }) {
    const {
      isShoppingBag,
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
      setFavoriteStore,
      getDefaultStore,
    } = this.props;

    return (
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
        setFavoriteStore={setFavoriteStore}
        getDefaultStore={getDefaultStore}
      />
    );
  }

  displayErrorCopy() {
    const { error, onCloseClick } = this.props;
    return error ? (
      <>
        <BodyCopyWithSpacing fontSize="fs14" fontWeight="semibold" color="red.500" text={error} />
        <Button onPress={onCloseClick} type="button" className="button-cancel">
          Cancel
        </Button>
      </>
    ) : null;
  }

  displayStoreSearchForm(showStoreSearching) {
    const {
      distancesMap,
      pristine,
      submitting,
      storeSearchError,
      isSkuResolved,
      handleSubmit,
      onSearch,
      PickupSkuFormValues,
      selectedValue,
    } = this.props;
    const disableButton = Object.values(PickupSkuFormValues).includes('');
    return showStoreSearching ? (
      <PickUpModalView>
        <PickUpHeaderText>{PICKUP_LABELS.FIND_STORE}</PickUpHeaderText>
        <Row>
          <AddressCol>
            <Field
              name="addressLocation"
              id="addressLocation"
              component={TextBox}
              label="Zip, City or State"
            />
          </AddressCol>
          <DistanceCol>
            <Field
              bounces={false}
              name="distance"
              component={DropDown}
              heading="Distance"
              data={distancesMap}
              label="Distance"
              className="distance-input"
              dropDownStyle={{ ...dropDownStyle }}
              itemStyle={{ ...itemStyle }}
              variation="secondary"
              selectedValue={selectedValue && selectedValue.toString()}
              onValueChange={itemValue => {
                const { onQuantityChange, form } = this.props;
                if (onQuantityChange) {
                  onQuantityChange(itemValue, form);
                }
              }}
            />
          </DistanceCol>
        </Row>
        <Button
          margin={isAndroid() ? '16px 0 35px 0' : '16px 0 25px 0'}
          color="white"
          fill="BLUE"
          text="Search"
          fontSize="fs10"
          fontWeight="extrabold"
          fontFamily="secondary"
          onPress={handleSubmit(onSearch)}
          locator="pdp_color_swatch"
          accessibilityLabel="Search"
          disabled={pristine || submitting || disableButton}
        />
        {isSkuResolved && (
          <BodyCopyWithSpacing
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="extrabold"
            textAlign="center"
            text={storeSearchError}
          />
        )}
      </PickUpModalView>
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
      selectedStoreId,
      isBossSelected,
      isShowMessage,
      getIsBopisAvailable,
      isGetUserStoresLoaded,
      handleUpdatePickUpItem,
      setFavoriteStore,
      getDefaultStore,
    } = this.props;
    return (
      !storeLimitReached &&
      isGetUserStoresLoaded &&
      preferredStore &&
      prefStoreWithData && (
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
          setFavoriteStore={setFavoriteStore}
          getDefaultStore={getDefaultStore}
        />
      )
    );
  }

  displayStoreSearchComp() {
    const {
      getPreferredStoreData,
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
          <BodyCopyWithSpacing
            margin="20px 14px"
            mobileFontFamily="secondary"
            fontSize="fs14"
            text={renderVariationText(storeLimitReached, sameStore)}
          />
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
        <React.Fragment>
          {isSkuResolved &&
            this.displayStoreListItems({
              isBossCtaEnabled,
              buttonLabel,
              sameStore,
            })}
          {isSkuResolved && this.displayErrorCopy()}
        </React.Fragment>
      </React.Fragment>
    );
  }

  render() {
    const { isPickUpWarningModal } = this.props;
    return (
      <>
        {isPickUpWarningModal && (
          <BodyCopyWithSpacing
            fontSize="fs14"
            fontWeight="semibold"
            color="gray.900"
            text={PICKUP_LABELS.ITEM_UNAVAILABLE}
          />
        )}
        {!isPickUpWarningModal && this.displayStoreSearchComp()}
      </>
    );
  }
}

const defaultValidation = getStandardConfig(
  [{ addressLocation: 'addressLine1' }, { distance: 'distance' }],
  { stopOnFirstError: true }
);

const validateMethod = createValidateMethod(defaultValidation);

export default connect()(
  reduxForm({
    form: 'pickupSearchStoresForm',
    ...validateMethod,
    keepDirtyOnReinitialize: true, // [https://github.com/erikras/redux-form/issues/3690] redux-forms 7.2.0 causes bug that forms will reInit after mount setting changed values back to init values
    touchOnChange: true, // to show validation error messageas even if user did not touch the fields
    touchOnBlur: false, // to avoid hidding the search results on blur of any field without changes
  })(withStyles(PickupStoreSelectionForm, styles))
);

export { PickupStoreSelectionForm as PickupStoreSelectionFormVanilla };
