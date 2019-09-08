import { connect } from 'react-redux';
import PickUpStoreModalView from '../views/PickUpStoreModal.view';
import * as PickupSelectors from './PickUpStoreModal.selectors';
import { maxAllowedStoresInCart } from '../PickUpStoreModal.config';
import { PICKUP_HEADING } from '../PickUpStoreModal.constants';
import { isCanada } from '../../../../../utils';

const mapStateToProps = (state, ownProps) => {
  // creating new prop defaultStore which is a combination of
  //  favStore store or geo default store of user
  const favStore = PickupSelectors.getDefaultStore(state);
  const geoDefaultStore = PickupSelectors.getGeoDefaultStore(state);
  const defaultStore = favStore || geoDefaultStore || null;
  const productInfo = null; // TODO - In cart - quickViewStoreView.getQuickViewProduct(state);
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
  const itemValues = PickupSelectors.getDefaultSizes(
    initialValueFromQuickView,
    productInfo,
    isShowDefaultSize
  );
  const pickupModalAttrs = PickupSelectors.getPickupModalAttrs();
  return {
    onAddItemToCart,
    onAddItemToCartSuccess: isShowAddItemSuccessNotification,
    onSubmit,
    onSubmitSuccess,
    maxAllowedStoresInCart,
    cartBopisStoresList: 0, // TODO - IN QV  - storesStoreView.getBopisStoresOnCart(state),
    distancesMap: {}, // TODO - IN QV - Do we need this ? - storesStoreView.getDistancesMap(),
    isShowExtendedSizesNotification: false,
    productInfo,
    colorFitSizeDisplayNames,
    initialValues: itemValues.formValues,
    showDefaultSizeMsg: itemValues.showDefaultSizeMsg,
    isPickupStoreUpdating: false, // TODO - IN CART -  cartStoreView.getIsPickupStoreUpdating(state),
    requestorKey: '', // TODO - IN QV  - quickViewStoreView.getQuickViewRequestInfo(state).requestorKey,
    defaultStore,
    ...pickupModalAttrs,
    isCanada: isCanada(),
    isPlcc: PickupSelectors.getUserIsPlcc(state),
    currencySymbol: PickupSelectors.getCurrentCurrencySymbol(state),
    isInternationalShipping: PickupSelectors.getIsInternationalShipping(state),
    isBopisEnabled: PickupSelectors.getIsBopis(state),
    isBossEnabled: PickupSelectors.getIsBossEnabled(state),
    isRadialInventoryEnabled: PickupSelectors.getIsRadialInventoryEnabled(state),
    isShowDefaultSize,
    itemsCount: PickupSelectors.getItemsCount(state),
    pickupModalHeading: PICKUP_HEADING,
  };
};

export default connect(mapStateToProps)(PickUpStoreModalView);
