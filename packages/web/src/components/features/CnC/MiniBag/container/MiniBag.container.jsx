import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGrandTotal } from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
import {
  openMiniBag,
  closeMiniBag,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import BAG_PAGE_ACTIONS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.actions';
import { isPlccUser } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { getAddedToBagError } from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.selectors';
import { getSaveForLaterSwitch } from '@tcp/core/src/components/features/CnC/SaveForLater/container/SaveForLater.selectors';
import { getIsMiniBagOpen } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import MiniBagView from '../views/MiniBag.view';
import {
  getLabelsMiniBag,
  getTotalItemCount,
  getIsCartItemsUpdating,
  getIsCartItemsSFL,
  getCartItemsSflError,
  getMiniBagLoaderState,
  getAccessibilityLabels,
} from './MiniBag.selectors';
import {
  getCurrentPointsState,
  getTotalRewardsState,
  isRememberedUser,
  getUserLoggedInState,
} from '../../../../../../../core/src/components/features/account/User/container/User.selectors';
import BAG_ACTIONS from '../../../../../../../core/src/components/features/CnC/BagPage/container/BagPage.actions';

export class MiniBagContainer extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    totalItems: PropTypes.number.isRequired,
    labels: PropTypes.shape({}).isRequired,
    userName: PropTypes.string.isRequired,
    subTotal: PropTypes.number.isRequired,
    currentPoints: PropTypes.number.isRequired,
    totalRewards: PropTypes.number.isRequired,
    isCartItemsUpdating: PropTypes.bool.isRequired,
    isCartItemSFL: PropTypes.bool.isRequired,
    cartItemSflError: PropTypes.string.isRequired,
    updateCartItemCount: PropTypes.func.isRequired,
    closeMiniBagDispatch: PropTypes.func.isRequired,
    openOverlay: PropTypes.func.isRequired,
    resetSuccessMessage: PropTypes.func.isRequired,
    isPlcc: PropTypes.bool.isRequired,
    addedToBagError: PropTypes.string.isRequired,
    isShowSaveForLaterSwitch: PropTypes.bool.isRequired,
    rememberedUserFlag: PropTypes.bool.isRequired,
    isUserLoggedIn: PropTypes.bool.isRequired,
    miniBagLoaderState: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(e) {
    if (e) e.preventDefault();
    const { updateCartItemCount, closeMiniBagDispatch } = this.props;
    closeMiniBagDispatch();
    updateCartItemCount();
  }

  render() {
    const {
      labels,
      totalItems,
      isOpen,
      userName,
      subTotal,
      currentPoints,
      totalRewards,
      isCartItemsUpdating,
      isCartItemSFL,
      cartItemSflError,
      closeMiniBagDispatch,
      openOverlay,
      resetSuccessMessage,
      isPlcc,
      addedToBagError,
      isShowSaveForLaterSwitch,
      rememberedUserFlag,
      isUserLoggedIn,
      miniBagLoaderState,
    } = this.props;

    return (
      <MiniBagView
        openState={isOpen}
        onRequestClose={this.closeModal}
        labels={labels}
        totalItems={totalItems}
        userName={userName}
        subTotal={subTotal}
        currentPoints={currentPoints}
        totalRewards={totalRewards}
        isCartItemsUpdating={isCartItemsUpdating}
        isCartItemSFL={isCartItemSFL}
        cartItemSflError={cartItemSflError}
        closeMiniBagDispatch={closeMiniBagDispatch}
        openOverlay={openOverlay}
        resetSuccessMessage={resetSuccessMessage}
        isPlcc={isPlcc}
        addedToBagError={addedToBagError}
        isShowSaveForLaterSwitch={isShowSaveForLaterSwitch}
        isRememberedUser={rememberedUserFlag}
        isUserLoggedIn={isUserLoggedIn}
        miniBagLoaderState={miniBagLoaderState}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    labels: {
      ...getLabelsMiniBag(state),
      accessibility: getAccessibilityLabels(state),
    },
    totalItems: getTotalItemCount(state),
    subTotal: getGrandTotal(state),
    currentPoints: getCurrentPointsState(state),
    totalRewards: getTotalRewardsState(state),
    isCartItemsUpdating: getIsCartItemsUpdating(state),
    isCartItemSFL: getIsCartItemsSFL(state),
    cartItemSflError: getCartItemsSflError(state),
    isOpen: getIsMiniBagOpen(state),
    isPlcc: isPlccUser(state),
    addedToBagError: getAddedToBagError(state),
    isShowSaveForLaterSwitch: getSaveForLaterSwitch(state),
    rememberedUserFlag: isRememberedUser(state),
    isUserLoggedIn: getUserLoggedInState(state),
    miniBagLoaderState: getMiniBagLoaderState(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    openMiniBagDispatch: () => {
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails());
      dispatch(openMiniBag());
    },
    closeMiniBagDispatch: () => {
      dispatch(closeMiniBag());
    },
    openOverlay: component => dispatch(openOverlayModal(component)),
    resetSuccessMessage: payload => {
      dispatch(BAG_ACTIONS.setCartItemsSFL(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniBagContainer);
