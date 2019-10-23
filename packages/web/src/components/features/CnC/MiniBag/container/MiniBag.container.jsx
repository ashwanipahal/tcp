import React from 'react';
import { connect } from 'react-redux';
import {
  getGrandTotal,
  getCurrencySymbol,
} from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/container/orderLedger.selector';
import {
  openMiniBag,
  closeMiniBag,
} from '@tcp/core/src/components/common/organisms/Header/container/Header.actions';
import { openOverlayModal } from '@tcp/core/src/components/features/account/OverlayModal/container/OverlayModal.actions';
import BAG_PAGE_ACTIONS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.actions';
import { isPlccUser } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { getAddedToBagError } from '@tcp/core/src/components/features/CnC/AddedToBag/container/AddedToBag.selectors';
import MiniBagView from '../views/MiniBag.view';
import {
  getLabelsMiniBag,
  getTotalItemCount,
  getIsCartItemsUpdating,
  getIsCartItemsSFL,
  getCartItemsSflError,
  getIsMiniBagOpen,
} from './MiniBag.selectors';
import {
  getCurrentPointsState,
  getTotalRewardsState,
} from '../../../../../../../core/src/components/features/account/User/container/User.selectors';
import BAG_ACTIONS from '../../../../../../../core/src/components/features/CnC/BagPage/container/BagPage.actions';

// @flow
type Props = {
  isOpen: boolean,
  totalItems: any,
  labels: any,
  userName: any,
  subTotal: any,
  currencySymbol: any,
  currentPoints: any,
  totalRewards: any,
  isCartItemsUpdating: any,
  isCartItemSFL: any,
  cartItemSflError: any,
  updateCartItemCount: Function,
  closeMiniBagDispatch: Function,
  openOverlay: Function,
  resetSuccessMessage: Function,
  isPlcc: PropTypes.bool.isRequired,
  addedToBagError: any,
};
export class MiniBagContainer extends React.Component<Props> {
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
      currencySymbol,
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
    } = this.props;
    return (
      <MiniBagView
        openState={isOpen}
        onRequestClose={this.closeModal}
        labels={labels}
        totalItems={totalItems}
        userName={userName}
        subTotal={subTotal}
        currencySymbol={currencySymbol}
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
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    labels: getLabelsMiniBag(state),
    totalItems: getTotalItemCount(state),
    subTotal: getGrandTotal(state),
    currencySymbol: getCurrencySymbol(state),
    currentPoints: getCurrentPointsState(state),
    totalRewards: getTotalRewardsState(state),
    isCartItemsUpdating: getIsCartItemsUpdating(state),
    isCartItemSFL: getIsCartItemsSFL(state),
    cartItemSflError: getCartItemsSflError(state),
    isOpen: getIsMiniBagOpen(state),
    isPlcc: isPlccUser(state),
    addedToBagError: getAddedToBagError(state),
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
