import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; // eslint-disable-line
import PropTypes from 'prop-types';
import QuickViewModal from '../views';
import { closeQuickViewModal } from './QuickViewModal.actions';
import { getAddedToBagError } from '../../../../features/CnC/AddedToBag/container/AddedToBag.selectors';
import { PRODUCT_INFO_PROP_TYPE_SHAPE } from '../../../../features/browse/ProductListing/molecules/ProductList/propTypes/productsAndItemsPropTypes';
import {
  getModalState,
  getProductInfo,
  getQuickViewLabels,
  getQuickViewFormValues,
  getProductInfoFromBag,
} from './QuickViewModal.selectors';
import {
  getPlpLabels,
  getCurrentCurrency,
} from '../../../../features/browse/ProductDetail/container/ProductDetail.selectors';
import {
  addToCartEcom,
  clearAddToBagErrorState,
} from '../../../../features/CnC/AddedToBag/container/AddedToBag.actions';
import { updateCartItem } from '../../../../features/CnC/CartItemTile/container/CartItemTile.actions';
import { getCartItemInfo } from '../../../../features/CnC/AddedToBag/util/utility';

class QuickViewModalContainer extends React.PureComponent {
  handleAddToBag = () => {
    const { addToBagEcom, formValues, productInfo, closeQuickViewModalAction } = this.props;
    let cartItemInfo = getCartItemInfo(productInfo, formValues);
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
    const cartItemInfo = getCartItemInfo(productInfo, formValues);
    const payload = {
      skuId: cartItemInfo.skuInfo.skuId,
      itemId: productInfoFromBag.orderItemId,
      quantity: cartItemInfo.quantity,
      variantNo: cartItemInfo.skuInfo.variantNo,
      itemPartNumber: cartItemInfo.skuInfo.variantId,
      callBack: closeQuickViewModalAction,
    };
    updateCartItemAction(payload);
  };

  render() {
    const { isModalOpen, closeQuickViewModalAction, productInfo, ...otherProps } = this.props;
    return (
      <React.Fragment>
        {productInfo ? (
          <QuickViewModal
            isModalOpen={isModalOpen}
            closeQuickViewModal={closeQuickViewModalAction}
            productInfo={productInfo}
            handleAddToBag={this.handleAddToBag}
            handleUpdateItem={this.handleUpdateItem}
            {...otherProps}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isModalOpen: getModalState(state),
    productInfo: getProductInfo(state),
    plpLabels: getPlpLabels(state),
    currency: getCurrentCurrency(state),
    quickViewLabels: getQuickViewLabels(state),
    formValues: getQuickViewFormValues(state),
    addToBagError: getAddedToBagError(state),
    productInfoFromBag: getProductInfoFromBag(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeQuickViewModalAction: () => {
      dispatch(closeQuickViewModal({ isModalOpen: false }));
    },
    addToBagEcom: payload => {
      dispatch(addToCartEcom(payload));
    },
    clearAddToBagError: () => {
      dispatch(clearAddToBagErrorState());
    },
    updateCartItemAction: payload => {
      dispatch(updateCartItem(payload));
    },
  };
}

QuickViewModalContainer.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  formValues: PropTypes.shape({}).isRequired,
  closeQuickViewModalAction: PropTypes.func.isRequired,
  addToBagEcom: PropTypes.func.isRequired,
  updateCartItemAction: PropTypes.func.isRequired,
  productInfo: PRODUCT_INFO_PROP_TYPE_SHAPE.isRequired,
  productInfoFromBag: PropTypes.shape({}),
};

QuickViewModalContainer.defaultProps = {
  productInfoFromBag: {},
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickViewModalContainer)
);
