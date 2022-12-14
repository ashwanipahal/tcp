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
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import { toggleApplyNowModal } from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';

import {
  getUserLoggedInState,
  isPlccUser,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { updateCartItem, confirmRemoveCartItem } from '../../../container/CartItemTile.actions';
import ProductTileWrapper from '../views/ProductTileWrapper.view';
import BAG_SELECTORS from '../../../../BagPage/container/BagPage.selectors';

export const ProductTileWrapperContainer = props => {
  return (
    <>
      <ProductTileWrapper {...props} />
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
    isBagLoading: BAG_SELECTORS.isBagLoading(state),
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
    openOverlay: component => dispatch(openOverlayModal(component)),
    openModalApplyNowModal: payload => dispatch(toggleApplyNowModal(payload)),
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
