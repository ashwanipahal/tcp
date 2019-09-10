import React from 'react';
import { PropTypes } from 'prop-types';
import LabeledCheckbox from '../../../../../atoms/LabeledCheckbox';
import { BOPIS_ITEM_AVAILABILITY } from '../../../PickUpStoreModal.constants';
import PickupStoreListItem from '../../PickupStoreListItem';

const derieveStoresWithAvailability = (isOnlyShowAvailable, isBopisEnabled, storesList) => {
  return isOnlyShowAvailable && isBopisEnabled
    ? storesList.filter(
        store => store.productAvailability.status !== BOPIS_ITEM_AVAILABILITY.UNAVAILABLE
      )
    : [];
};

class PickupStoreList extends React.Component {
  static propTypes = {
    /** Error message when add to cart */
    addToCartError: PropTypes.string.isRequired,
    /** Array of stores to display */
    storesList: PropTypes.arrayOf(PickupStoreListItem.propTypes.store).isRequired,

    /**
     * Function to call when a store is selected. The called function will
     * receive one parameter, the id of the clicked store.
     */
    onStoreSelect: PropTypes.func.isRequired,

    /** Flag to identify Boss/Bopis */
    isBossSelected: PropTypes.bool.isRequired,
    /** flags if to show the checkbox for showing only stores with avialability */
    isShowFilterCheckbox: PropTypes.bool.isRequired,
    /** flags if search was in stores already in cart */
    isResultOfSearchingInCartStores: PropTypes.bool.isRequired,

    /** We need to differentiate if Bopis Modal is open from cart or other place to change select item button's message (DT-27100) */
    isShoppingBag: PropTypes.bool.isRequired,

    /** Function to call when the Cancel button is clicked */
    onCancel: PropTypes.func.isRequired,

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
    /** store id that was selected */
    selectedStoreId: PropTypes.number.isRequired,

    /** Global switches for BOSS and BOPIS */
    isBossEnabled: PropTypes.bool,
    isBopisEnabled: PropTypes.bool,

    isGiftCard: PropTypes.bool.isRequired,
    allowBossStoreSearch: PropTypes.bool.isRequired,
    updateCartItemStore: PropTypes.bool.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    bopisChangeStore: PropTypes.bool.isRequired,
    isBopisCtaEnabled: PropTypes.bool.isRequired,
    isBossCtaEnabled: PropTypes.bool.isRequired,
    defaultStoreName: PropTypes.string,
  };

  static defaultProps = {
    isBossEnabled: true,
    isBopisEnabled: true,
    defaultStoreName: '',
  };

  constructor(props) {
    super(props);
    this.state = { isOnlyShowAvailable: false };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleShowAvailableChange = this.handleShowAvailableChange.bind(this);
    this.isShowDistanceForSearch = true;
  }

  handleShowAvailableChange() {
    this.setState(oldState => ({ isOnlyShowAvailable: !oldState.isOnlyShowAvailable }));
  }

  handleCancelClick() {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  render() {
    const {
      sameStore,
      cartBopisStoresList,
      isShoppingBag,
      storesList,
      onStoreSelect,
      isShowFilterCheckbox,
      isResultOfSearchingInCartStores,
      selectedStoreId,
      isBossSelected,
      addToCartError,
      // resetAddToBagForBopis,
      isBopisCtaEnabled,
      isBossCtaEnabled,
      allowBossStoreSearch,
      updateCartItemStore,
      buttonLabel,
      bopisChangeStore,
      isBossEnabled,
      isBopisEnabled,
      defaultStoreName,
      isGiftCard,
    } = this.props;
    const { isOnlyShowAvailable } = this.state;
    const storesWithAvailability = derieveStoresWithAvailability(
      isOnlyShowAvailable,
      isBopisEnabled,
      storesList
    );
    /**
     * checking if both stores for BOPIS and BOSS are same then show only one result
     * if the stores are not same then we are checking if only bopis product is getting
     * changed in bag overview. Then only one store is show with having bopis pickup type
     * */
    let cartStoresFiltered = [];
    if (sameStore) {
      cartStoresFiltered = cartBopisStoresList.slice(0, 1);
    } else if (bopisChangeStore) {
      cartStoresFiltered = cartBopisStoresList.filter(
        store => store.pickupType.isStoreBopisSelected
      );
    } else {
      cartStoresFiltered = cartBopisStoresList;
    }

    let derivedStoresList = [];
    if (isOnlyShowAvailable) {
      derivedStoresList = storesWithAvailability;
    } else if (allowBossStoreSearch) {
      derivedStoresList = storesList;
    } else if (isResultOfSearchingInCartStores) {
      derivedStoresList = cartStoresFiltered;
    } else {
      derivedStoresList = storesList;
    }

    /*
    const isSelectedStoreInList =
      derivedStoresList.length &&
      !!derivedStoresList.find(store => store.basicInfo.id === selectedStoreId);
    resetAddToBagForBopis(isSelectedStoreInList);
*/
    return (
      <div className="stores-info">
        {!allowBossStoreSearch && (!isResultOfSearchingInCartStores && isShowFilterCheckbox) && (
          <LabeledCheckbox
            className="store-availability-checkbox"
            title="Only show stores available for pickup today."
            input={{ value: isOnlyShowAvailable, onChange: this.handleShowAvailableChange }}
          />
        )}
        {derivedStoresList.map(store => (
          <PickupStoreListItem
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
            isShowDistance={!isResultOfSearchingInCartStores && this.isShowDistanceForSearch}
            isGiftCard={isGiftCard}
          />
        ))}
      </div>
    );
  }
}

export default PickupStoreList;
