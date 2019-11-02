/* eslint-disable extra-rules/no-commented-out-code */
/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import DropDown from '@tcp/core/src/components/common/atoms/DropDown/views/DropDown.native';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { getMapSliceForSize } from '../../../../../../features/browse/ProductListing/molecules/ProductList/utils/productsCommonUtils';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
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
      />
    );
  }

  displayErrorCopy() {
    const { error, onCloseClick } = this.props;
    return error ? (
      <div className="error-box-bopis">
        <BodyCopyWithSpacing fontSize="fs14" fontWeight="semibold" color="red.500" text={error} />
        <Button onPress={onCloseClick} type="button" className="button-cancel">
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
      storeSearchError,
      PickupSkuFormValues,
      colorFitsSizesMap,
      isSkuResolved,
      onCloseClick,
      handleSubmit,
      onSearch,
      selectedValue,
    } = this.props;

    let disableButton = pristine;

    const formExists = Object.entries(PickupSkuFormValues).length === 0;

    const { color, Fit, Size } = PickupSkuFormValues;

    const enableButton = formExists ? pristine : true;

    const sizeAvailable = !formExists && getMapSliceForSize(colorFitsSizesMap, color, Fit, Size);
    disableButton = sizeAvailable ? !sizeAvailable : enableButton;

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
              selectedValue={selectedValue}
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
          margin="16px 0 20px 0"
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
    } = this.props;
    return (
      !storeLimitReached &&
      prefStoreWithData && (
        <PickupStoreListItem
          sameStore={sameStore}
          isShoppingBag={isShoppingBag}
          store={preferredStore}
          onStoreSelect={handleAddTobag}
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
