import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import QuickViewModal from '../views';
import { closeQuickViewModal } from './QuickViewModal.actions';
import {
  getAddedToBagError,
  getMultipleItemsAddedToBagError,
} from '../../../../features/CnC/AddedToBag/container/AddedToBag.selectors';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import {
  getModalState,
  getProductInfo,
  getQuickViewLabels,
  getQuickViewFormValues,
  getProductInfoFromBag,
  getLoadingState,
  getFromBagPage,
  getIsFromBagProductSfl,
} from './QuickViewModal.selectors';
import {
  getPlpLabels,
  getCurrentCurrency,
  getCurrencyAttributes,
} from '../../../../features/browse/ProductDetail/container/ProductDetail.selectors';
import {
  addToCartEcom,
  addMultipleItemsToCartEcom,
  clearAddToBagErrorState,
  clearAddToCartMultipleItemErrorState,
} from '../../../../features/CnC/AddedToBag/container/AddedToBag.actions';
import { updateCartItem } from '../../../../features/CnC/CartItemTile/container/CartItemTile.actions';
import BAG_PAGE_ACTIONS from '../../../../features/CnC/BagPage/container/BagPage.actions';
import { getCartItemInfo } from '../../../../features/CnC/AddedToBag/util/utility';

class QuickViewModalContainer extends React.PureComponent {
  handleAddToBag = () => {
    const { addToBagEcom, formValues, productInfo, closeQuickViewModalAction } = this.props;
    const [{ product }] = productInfo;
    const [formValue] = formValues;
    let cartItemInfo = getCartItemInfo(product, formValue);
    cartItemInfo = { ...cartItemInfo, callBack: closeQuickViewModalAction };
    addToBagEcom(cartItemInfo);
  };

  handleUpdateItem = () => {
    const {
      updateCartItemAction,
      formValues,
      productInfo,
      closeQuickViewModalAction,
      isFromBagProductSfl,
      productInfoFromBag,
      updateCartSflItemAction,
    } = this.props;
    const [{ product }] = productInfo;
    const [formValue] = formValues;
    const cartItemInfo = getCartItemInfo(product, formValue);
    const {
      skuInfo: { skuId, variantNo, variantId },
    } = cartItemInfo;
    if (isFromBagProductSfl) {
      updateCartSflItemAction({
        oldSkuId: productInfoFromBag.skuId,
        newSkuId: skuId,
        callBack: closeQuickViewModalAction,
      });
    } else {
      const { quantity } = cartItemInfo;
      const { orderItemId } = productInfoFromBag;
      const payload = {
        skuId,
        itemId: orderItemId,
        quantity,
        variantNo,
        itemPartNumber: variantId,
        callBack: closeQuickViewModalAction,
      };
      updateCartItemAction(payload);
    }
  };

  render() {
    const {
      isModalOpen,
      closeQuickViewModalAction,
      productInfo,
      plpLabels,
      currencyAttributes,
      toastMessage,
      ...otherProps
    } = this.props;
    return (
      <QuickViewModal
        isModalOpen={isModalOpen}
        closeQuickViewModal={closeQuickViewModalAction}
        productInfo={productInfo}
        plpLabels={plpLabels}
        handleAddToBag={this.handleAddToBag}
        handleUpdateItem={this.handleUpdateItem}
        currencyAttributes={currencyAttributes}
        toastMessage={toastMessage}
        {...otherProps}
      />
    );
  }
}

function mapStateToProps(state) {
  const productInfo = getProductInfo(state);
  const isMultiItemQVModal = productInfo && productInfo.length > 1;

  return {
    isModalOpen: getModalState(state),
    isLoading: getLoadingState(state),
    productInfo,
    isMultiItemQVModal,
    plpLabels: getPlpLabels(state),
    currency: getCurrentCurrency(state),
    currencyAttributes: getCurrencyAttributes(state),
    quickViewLabels: getQuickViewLabels(state),
    formValues: getQuickViewFormValues(state),
    addToBagError: getAddedToBagError(state) || '',
    addToBagMultipleItemError: getMultipleItemsAddedToBagError(state) || {},
    productInfoFromBag: getProductInfoFromBag(state),
    fromBagPage: getFromBagPage(state),
    isFromBagProductSfl: getIsFromBagProductSfl(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeQuickViewModalAction: () => {
      dispatch(closeQuickViewModal({ isModalOpen: false }));
    },
    addMultipleItemsToBagEcom: payload => {
      dispatch(addMultipleItemsToCartEcom(payload));
    },
    addToBagEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
    clearAddToBagError: () => {
      dispatch(clearAddToBagErrorState());
    },
    clearMultipleItemsAddToBagError: () => {
      dispatch(clearAddToCartMultipleItemErrorState());
    },
    updateCartItemAction: payload => {
      dispatch(updateCartItem(payload));
    },
    updateCartSflItemAction: payload => {
      dispatch(BAG_PAGE_ACTIONS.updateSflItem(payload));
    },
    toastMessage: payload => {
      dispatch(toastMessageInfo(payload));
    },
  };
}

QuickViewModalContainer.propTypes = {
  plpLabels: PropTypes.shape({}),
  isModalOpen: PropTypes.bool.isRequired,
  formValues: PropTypes.shape([]).isRequired,
  closeQuickViewModalAction: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  addMultipleItemsToBagEcom: PropTypes.func.isRequired,
  updateCartItemAction: PropTypes.func.isRequired,
  productInfo: PropTypes.shape([PRODUCT_INFO_PROP_TYPE_SHAPE]).isRequired,
  productInfoFromBag: PropTypes.shape({}),
  currencyAttributes: PropTypes.shape({}),
  toastMessage: PropTypes.func,
  isFromBagProductSfl: PropTypes.bool,
  updateCartSflItemAction: PropTypes.func.isRequired,
};

QuickViewModalContainer.defaultProps = {
  productInfoFromBag: {},
  plpLabels: {},
  currencyAttributes: {
    exchangevalue: 1,
  },
  toastMessage: () => {},
  isFromBagProductSfl: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickViewModalContainer);
