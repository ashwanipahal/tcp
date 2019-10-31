import { connect } from 'react-redux';
import {
  PRODUCT_ADD_TO_BAG,
  PRODUCT_SKU_SELECTION_FORM,
} from '@tcp/core/src/constants/reducer.constants';
import PickUpStoreModalView from '../views/PickUpStoreModal.view';
import * as PickupSelectors from './PickUpStoreModal.selectors';
import * as sessionSelectors from '../../../../../reduxStore/selectors/session.selectors';
import { maxAllowedStoresInCart, distancesMap } from '../PickUpStoreModal.config';
import { PICKUP_HEADING } from '../PickUpStoreModal.constants';
import { isCanada } from '../../../../../utils';
import {
  closePickupModal,
  getBopisStoresActn,
  setStoreSearchError,
  getUserCartStores,
} from './PickUpStoreModal.actions';
import { addItemToCartBopis } from '../../../../features/CnC/AddedToBag/container/AddedToBag.actions';
import {
  getCurrentCurrency,
  getCurrencyAttributes,
} from '../../../../features/browse/ProductDetail/container/ProductDetail.selectors';
import { getAddedToPickupError } from '../../../../features/CnC/AddedToBag/container/AddedToBag.selectors';
import { updateCartItem } from '../../../../features/CnC/CartItemTile/container/CartItemTile.actions';

export const mapDispatchToProps = dispatch => {
  return {
    closePickupModal: payload => {
      dispatch(closePickupModal(payload));
    },
    onSearchAreaStoresSubmit: payload => {
      dispatch(getBopisStoresActn(payload));
    },
    onClearSearchFormError: () => {
      dispatch(setStoreSearchError({ errorMessage: '' }));
    },
    getUserCartStoresAndSearch: payload => {
      dispatch(getUserCartStores(payload));
    },
    addItemToCartInPickup: payload => {
      dispatch(addItemToCartBopis(payload));
    },
    updatePickUpCartItem: payload => {
      dispatch(updateCartItem(payload));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  // creating new prop defaultStore which is a combination of
  //  favStore store or geo default store of user
  const favStore = PickupSelectors.getDefaultStore(state);
  const geoDefaultStore = PickupSelectors.getGeoDefaultStore(state);
  const defaultStore = favStore || geoDefaultStore || null;
  const { isShowAddItemSuccessNotification, onSubmit, onSubmitSuccess, navigation } = ownProps;
  const isShowDefaultSize = false; // TODO - Do we need this ? abTestingStoreView.getIsShowDefaultSize(state);

  const currentProduct = PickupSelectors.getCurrentProduct(state);
  const generalProductId = currentProduct && currentProduct.generalProductId;
  const atbProductFormId = `${PRODUCT_ADD_TO_BAG}-${generalProductId}`;
  const initialValueFromQuickView = {
    ...PickupSelectors.getInitialValues(state, atbProductFormId),
  }; // TODO - IN QV - quickViewStoreView.getQuickViewFormInitialValues(state, ownProps.initialValues, true);
  const itemValues = { showDefaultSizeMsg: false, formValues: initialValueFromQuickView };
  const { colorFitSizeDisplayNames = null } = currentProduct;
  const isPickupModalOpen = PickupSelectors.getIsPickupModalOpen(state);
  const isBopisCtaEnabled = PickupSelectors.getIsBopisCtaEnabled(state);
  const isBossCtaEnabled = PickupSelectors.getIsBossCtaEnabled(state);
  const isPickUpWarningModal = PickupSelectors.getIsPickUpWarningModal(state);
  const openSkuSelectionForm = PickupSelectors.getOpenSkuSelectionForm(state);
  const storeSearchError = PickupSelectors.getStoreSearchError(state);
  const pickupSkuFormId = `${PRODUCT_SKU_SELECTION_FORM}-${generalProductId}`;
  const PickupSkuFormValues = { ...PickupSelectors.getInitialValues(state, pickupSkuFormId) };
  const fromBagPage = PickupSelectors.getIsPickupModalOpenFromBagPage(state);
  const initialValuesFromBagPage = PickupSelectors.getInitialValuesFromBagPage(state);
  const updateCartItemStore = PickupSelectors.getUpdateCartItemStore(state);
  const isItemShipToHome = PickupSelectors.getIsItemShipToHome(state);
  const alwaysSearchForBOSS = PickupSelectors.getAlwaysSearchForBOSS(state);
  const openRestrictedModalForBopis = PickupSelectors.openRestrictedModalForBopis(state);
  return {
    onAddItemToCartSuccess: isShowAddItemSuccessNotification,
    onSubmit,
    colorFitSizeDisplayNames,
    onSubmitSuccess,
    maxAllowedStoresInCart,
    cartBopisStoresList: PickupSelectors.getStoresOnCart(state),
    distancesMap,
    isShowExtendedSizesNotification: false,
    initialValues: fromBagPage ? initialValuesFromBagPage : itemValues.formValues,
    showDefaultSizeMsg: itemValues.showDefaultSizeMsg,
    isPickupStoreUpdating: false,
    requestorKey: '',
    defaultStore,
    isPickupModalOpen,
    isBopisCtaEnabled,
    isBossCtaEnabled,
    isPickUpWarningModal,
    openSkuSelectionForm,
    alwaysSearchForBOSS,
    openRestrictedModalForBopis,
    isCanada: isCanada(),
    addToBagError: getAddedToPickupError(state),
    isPlcc: PickupSelectors.getUserIsPlcc(state),
    currencySymbol: sessionSelectors.getCurrentCurrencySymbol(state),
    isInternationalShipping: sessionSelectors.getIsInternationalShipping(state),
    isBopisEnabled: sessionSelectors.getIsBopisEnabled(state),
    isBossEnabled: sessionSelectors.getIsBossEnabled(state),
    isRadialInventoryEnabled: sessionSelectors.getIsRadialInventoryEnabled(state),
    isShowDefaultSize,
    cartItemsCount: PickupSelectors.getItemsCount(state),
    pickupModalHeading: PICKUP_HEADING,
    storeSearchError,
    currentProduct,
    PickupSkuFormValues,
    currency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    navigation,
    updateCartItemStore,
    initialValuesFromBagPage,
    isItemShipToHome,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickUpStoreModalView);
