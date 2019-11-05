import { connect } from 'react-redux';
import React from 'react';
import { PropTypes } from 'prop-types';
import PickupStoreList from '../views/PickupStoreList.view';
import {
  getSuggestedStores,
  getDefaultStore,
  isStoreSearching,
} from '../../../container/PickUpStoreModal.selectors';
import { BOPIS_ITEM_AVAILABILITY } from '../../../PickUpStoreModal.constants';
import { STORE_SUMMARY_PROP_TYPES } from '../../../PickUpStoreModal.proptypes';

const derieveStoresWithAvailability = (isOnlyShowAvailable, isBopisEnabled, storesList) => {
  return isOnlyShowAvailable && isBopisEnabled
    ? storesList.filter(
        store => store.productAvailability.status !== BOPIS_ITEM_AVAILABILITY.UNAVAILABLE
      )
    : [];
};

class _PickupStoreList extends React.Component {
  static propTypes = {
    /** Error message when add to cart */
    addToCartError: PropTypes.string.isRequired,
    /** Array of stores to display */
    storesList: PropTypes.arrayOf(
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

    /** Flag to identify Boss/Bopis */
    isBossSelected: PropTypes.bool.isRequired,
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
    this.handleShowAvailableChange = this.handleShowAvailableChange.bind(this);
  }

  handleShowAvailableChange() {
    this.setState(oldState => ({ isOnlyShowAvailable: !oldState.isOnlyShowAvailable }));
  }

  render() {
    const {
      sameStore,
      cartBopisStoresList,
      storesList,
      isResultOfSearchingInCartStores,
      allowBossStoreSearch,
      bopisChangeStore,
      isBopisEnabled,
      ...otherProps
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

    return (
      <PickupStoreList
        sameStore={sameStore}
        handleShowAvailableChange={this.handleShowAvailableChange}
        isOnlyShowAvailable={isOnlyShowAvailable}
        derivedStoresList={derivedStoresList}
        isBopisEnabled={isBopisEnabled}
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const suggestedStores = getSuggestedStores(state);
  const defaultStore = getDefaultStore(state);
  return {
    storesList: suggestedStores,
    isSearching: isStoreSearching(state),
    isShowFilterCheckbox: suggestedStores && suggestedStores.length > 0,
    defaultStoreName: (defaultStore && defaultStore.basicInfo.storeName) || null,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(_PickupStoreList);
