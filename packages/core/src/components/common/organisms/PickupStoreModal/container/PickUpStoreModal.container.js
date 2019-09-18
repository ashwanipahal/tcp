import { connect } from 'react-redux';
import PickUpStoreModalView from '../views/PickUpStoreModal.view';
import * as PickupSelectors from './PickUpStoreModal.selectors';
import { maxAllowedStoresInCart, distancesMap } from '../PickUpStoreModal.config';
import { PICKUP_HEADING } from '../PickUpStoreModal.constants';
import { isCanada } from '../../../../../utils';
import { closePickupModal, getBopisStoresActn } from './PickUpStoreModal.actions';
import errorBoundary from '../../../hoc/withErrorBoundary';

export const mapDispatchToProps = dispatch => {
  return {
    closePickupModal: payload => {
      dispatch(closePickupModal(payload));
    },
    onSearchAreaStoresSubmit: (skuId, quantity, distance, locationPromise, variantId) => {
      dispatch(getBopisStoresActn({ skuId, quantity, distance, locationPromise, variantId }));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  // creating new prop defaultStore which is a combination of
  //  favStore store or geo default store of user
  const favStore = PickupSelectors.getDefaultStore(state);
  const geoDefaultStore = PickupSelectors.getGeoDefaultStore(state);
  const defaultStore = favStore || geoDefaultStore || null;
  const productInfo = {}; // TODO - In cart - quickViewStoreView.getQuickViewProduct(state);
  const { colorFitSizeDisplayNames = null } = productInfo;
  const {
    initialValues = {},
    onAddItemToCart,
    isShowAddItemSuccessNotification,
    onSubmit,
    onSubmitSuccess,
  } = ownProps;
  const isShowDefaultSize = false; // TODO - Do we need this ? abTestingStoreView.getIsShowDefaultSize(state);
  const initialValueFromQuickView = initialValues; // TODO - IN QV - quickViewStoreView.getQuickViewFormInitialValues(state, ownProps.initialValues, true);
  const itemValues = { showDefaultSizeMsg: false, initialValueFromQuickView };
  const isPickupModalOpen = PickupSelectors.getIsPickupModalOpen(state);
  const isBopisCtaEnabled = PickupSelectors.getIsBopisCtaEnabled(state);
  const isBossCtaEnabled = PickupSelectors.getIsBossCtaEnabled(state);
  const isPickUpWarningModal = PickupSelectors.getIsPickUpWarningModal(state);
  const openSkuSelectionForm = PickupSelectors.getOpenSkuSelectionForm(state);

  return {
    onAddItemToCart,
    onAddItemToCartSuccess: isShowAddItemSuccessNotification,
    onSubmit,
    onSubmitSuccess,
    maxAllowedStoresInCart,
    cartBopisStoresList: PickupSelectors.getBopisStoresOnCart(state),
    distancesMap,
    isShowExtendedSizesNotification: false,
    productInfo,
    colorFitSizeDisplayNames,
    initialValues: itemValues.formValues,
    showDefaultSizeMsg: itemValues.showDefaultSizeMsg,
    isPickupStoreUpdating: false, // TODO - IN CART -  cartStoreView.getIsPickupStoreUpdating(state),
    requestorKey: '', // TODO - IN QV  - quickViewStoreView.getQuickViewRequestInfo(state).requestorKey,
    defaultStore,
    isPickupModalOpen,
    isBopisCtaEnabled,
    isBossCtaEnabled,
    isPickUpWarningModal,
    openSkuSelectionForm,
    isCanada: isCanada(),
    isPlcc: PickupSelectors.getUserIsPlcc(state),
    currencySymbol: PickupSelectors.getCurrentCurrencySymbol(state),
    isInternationalShipping: PickupSelectors.getIsInternationalShipping(state),
    isBopisEnabled: PickupSelectors.getIsBopisEnabled(state),
    isBossEnabled: PickupSelectors.getIsBossEnabled(state),
    isRadialInventoryEnabled: PickupSelectors.getIsRadialInventoryEnabled(state),
    isShowDefaultSize,
    itemsCount: PickupSelectors.getItemsCount(state),
    pickupModalHeading: PICKUP_HEADING,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorBoundary(PickUpStoreModalView));
