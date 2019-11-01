import React from 'react';
import { PropTypes } from 'prop-types';
import { BOPIS_ITEM_AVAILABILITY, BOPIS_FILTER_LABEL } from '../../../PickUpStoreModal.constants';
import PickupStoreListItem from '../../PickupStoreListItem';
import { STORE_SUMMARY_PROP_TYPES } from '../../../PickUpStoreModal.proptypes';
import InputCheckbox from '../../../../../atoms/InputCheckbox';
import StoreListItemSkeleton from '../../../atoms/StoreListItemSkeleton';

const PickupStoreList = props => {
  const {
    sameStore,
    isShoppingBag,
    onStoreSelect,
    isShowFilterCheckbox,
    isResultOfSearchingInCartStores,
    isBossSelected,
    addToCartError,
    isBopisCtaEnabled,
    isBossCtaEnabled,
    allowBossStoreSearch,
    updateCartItemStore,
    buttonLabel,
    isBossEnabled,
    isBopisEnabled,
    defaultStoreName,
    isGiftCard,
    selectedStoreId,
    handleShowAvailableChange,
    isOnlyShowAvailable,
    derivedStoresList,
    addItemToCartInPickup,
    onPickupRadioBtnToggle,
    onStoreUpdate,
    isSearching,
  } = props;

  return (
    <>
      {!allowBossStoreSearch && (!isResultOfSearchingInCartStores && isShowFilterCheckbox) && (
        <InputCheckbox
          checkBoxLabel
          execOnChangeByDefault={false}
          input={{ value: isOnlyShowAvailable, onChange: handleShowAvailableChange }}
        >
          {BOPIS_FILTER_LABEL}
        </InputCheckbox>
      )}
      {derivedStoresList.map(store => (
        <PickupStoreListItem
          addItemToCartInPickup={addItemToCartInPickup}
          sameStore={sameStore}
          isShoppingBag={isShoppingBag}
          key={store.basicInfo.id}
          store={store}
          onStoreSelect={onStoreSelect}
          isBopisSelected={store.basicInfo.id === selectedStoreId && !isBossSelected}
          isBossSelected={store.basicInfo.id === selectedStoreId && isBossSelected}
          selectedStoreId={selectedStoreId}
          isBopisAvailable={
            store.productAvailability.status === BOPIS_ITEM_AVAILABILITY.AVAILABLE ||
            store.productAvailability.status === BOPIS_ITEM_AVAILABILITY.LIMITED
          }
          defaultStoreName={defaultStoreName}
          isBossAvailable={store.storeBossInfo.isBossEligible}
          storeBossInfo={store.storeBossInfo}
          addToCartError={addToCartError}
          isBopisCtaEnabled={isBopisCtaEnabled && isBopisEnabled}
          isBossCtaEnabled={isBossCtaEnabled && isBossEnabled}
          updateCartItemStore={updateCartItemStore}
          buttonLabel={buttonLabel}
          isGiftCard={isGiftCard}
          onPickupRadioBtnToggle={onPickupRadioBtnToggle}
          onStoreUpdate={onStoreUpdate}
        />
      ))}
      {isSearching ? <StoreListItemSkeleton col={20} /> : ''}
    </>
  );
};

PickupStoreList.propTypes = {
  /** Error message when add to cart */
  addToCartError: PropTypes.string.isRequired,
  /** Array of stores to display */
  derivedStoresList: PropTypes.arrayOf(
    PropTypes.shape({
      ...STORE_SUMMARY_PROP_TYPES,
      /** the availability status of the searched for cart item in this store */
      basicInfo: PropTypes.shape({
        /** store id identifier */
        id: PropTypes.string,
      }),
      productAvailability: PropTypes.shape({
        status: PropTypes.oneOf(
          Object.keys(BOPIS_ITEM_AVAILABILITY).map(key => BOPIS_ITEM_AVAILABILITY[key])
        ).isRequired,
      }).isRequired,
    })
  ).isRequired,

  /**
   * Function to call when a store is selected. The called function will
   * receive one parameter, the id of the clicked store.
   */
  onStoreSelect: PropTypes.func.isRequired,
  onStoreUpdate: PropTypes.func.isRequired,
  handleShowAvailableChange: PropTypes.func.isRequired,
  addItemToCartInPickup: PropTypes.func.isRequired,

  /** Flag to identify Boss/Bopis */
  isBossSelected: PropTypes.bool.isRequired,
  isOnlyShowAvailable: PropTypes.bool.isRequired,
  /** flags if to show the checkbox for showing only stores with avialability */
  isShowFilterCheckbox: PropTypes.bool.isRequired,
  /** flags if search was in stores already in cart */
  isResultOfSearchingInCartStores: PropTypes.bool.isRequired,

  /** We need to differentiate if Bopis Modal is open from cart or other place to change select item button's message (DT-27100) */
  isShoppingBag: PropTypes.bool.isRequired,

  /** Function for enabling and disabling Add to bag sticky button */
  // resetAddToBagForBopis: PropTypes.func.isRequired,

  /** array of added store in the account */
  cartBopisStoresList: PropTypes.shape({
    distance: PropTypes.string,
    productAvailability: PropTypes.object,
    storeBossInfo: PropTypes.object,
  }).isRequired,

  /** checks if the cart having both same store for BOPIS and BOSS */
  sameStore: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  /** store id that was selected */
  selectedStoreId: PropTypes.number.isRequired,

  /** Global switches for BOSS and BOPIS */
  isBossEnabled: PropTypes.bool,
  isBopisEnabled: PropTypes.bool,

  isGiftCard: PropTypes.bool.isRequired,
  allowBossStoreSearch: PropTypes.bool.isRequired,
  onPickupRadioBtnToggle: PropTypes.func.isRequired,
  updateCartItemStore: PropTypes.bool.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  isBopisCtaEnabled: PropTypes.bool.isRequired,
  isBossCtaEnabled: PropTypes.bool.isRequired,
  defaultStoreName: PropTypes.string,
};

PickupStoreList.defaultProps = {
  isBossEnabled: true,
  isBopisEnabled: true,
  defaultStoreName: '',
};

export default PickupStoreList;
