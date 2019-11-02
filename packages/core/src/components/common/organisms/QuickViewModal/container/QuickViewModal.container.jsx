import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
      productInfoFromBag,
    } = this.props;
    const [{ product }] = productInfo;
    const [formValue] = formValues;
    const cartItemInfo = getCartItemInfo(product, formValue);
    const {
      skuInfo: { skuId, variantNo, variantId },
    } = cartItemInfo;
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
  };

  render() {
    const {
      isModalOpen,
      closeQuickViewModalAction,
      productInfo,
      plpLabels,
      currencyAttributes,
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
        currencyExchange={currencyAttributes.exchangevalue}
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
};

QuickViewModalContainer.defaultProps = {
  productInfoFromBag: {},
  plpLabels: {},
  currencyAttributes: {
    exchangevalue: 1,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickViewModalContainer);
