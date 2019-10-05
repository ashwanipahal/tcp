import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCartOrderList,
  getLabelsCartItemTile,
  getIsCartItemsUpdating,
  getIsCartItemsSFL,
  getIsSflItemRemoved,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import {
  getUserLoggedInState,
  isPlccUser,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { updateCartItem, confirmRemoveCartItem } from '../../../container/CartItemTile.actions';
import QuickViewModal from '../../../../../../common/organisms/QuickViewModal/container/QuickViewModal.container';
import ProductTileWrapper from '../views/ProductTileWrapper.view';

export const ProductTileWrapperContainer = props => {
  const { pageView } = props;
  return (
    <>
      <ProductTileWrapper {...props} />
      <QuickViewModal fromBagPage={pageView === 'myBag'} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    orderItems: getCartOrderList(state),
    labels: getLabelsCartItemTile(state),
    isUserLoggedIn: getUserLoggedInState(state),
    isPlcc: isPlccUser(state),
    isCartItemsUpdating: getIsCartItemsUpdating(state),
    isCartItemSFL: getIsCartItemsSFL(state),
    isSflItemRemoved: getIsSflItemRemoved(state),
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    confirmRemoveCartItem: orderItemId => {
      dispatch(confirmRemoveCartItem(orderItemId));
    },
    updateCartItem: (itemId, skuId, quantity, itemPartNumber, variantNo) => {
      dispatch(updateCartItem({ itemId, skuId, quantity, itemPartNumber, variantNo }));
    },
  };
};

ProductTileWrapperContainer.defaultProps = {
  orderItems: [],
  pageView: '',
};

ProductTileWrapperContainer.propTypes = {
  orderItems: PropTypes.shape({}),
  initialActions: PropTypes.func.isRequired,
  pageView: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTileWrapperContainer);
