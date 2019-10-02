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
import { getCurrentCurrency } from '../../../../features/browse/ProductDetail/container/ProductDetail.selectors';
import { getAddedToBagError } from '../../../../features/CnC/AddedToBag/container/AddedToBag.selectors';

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
  };
};

const mapStateToProps = (state, ownProps) => {
  // creating new prop defaultStore which is a combination of
  //  favStore store or geo default store of user
  const favStore = PickupSelectors.getDefaultStore(state);
  const geoDefaultStore = PickupSelectors.getGeoDefaultStore(state);
  const defaultStore = favStore || geoDefaultStore || null;
  const { isShowAddItemSuccessNotification, onSubmit, onSubmitSuccess } = ownProps;
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

  return {
    onAddItemToCartSuccess: isShowAddItemSuccessNotification,
    onSubmit,
    colorFitSizeDisplayNames,
    onSubmitSuccess,
    maxAllowedStoresInCart,
    cartBopisStoresList: PickupSelectors.getStoresOnCart(state),
    distancesMap,
    isShowExtendedSizesNotification: false,
    initialValues: itemValues.formValues,
    showDefaultSizeMsg: itemValues.showDefaultSizeMsg,
    isPickupStoreUpdating: false,
    requestorKey: '',
    defaultStore,
    isPickupModalOpen,
    isBopisCtaEnabled,
    isBossCtaEnabled,
    isPickUpWarningModal,
    openSkuSelectionForm,
    isCanada: isCanada(),
    addToBagError: getAddedToBagError(state),
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickUpStoreModalView);
