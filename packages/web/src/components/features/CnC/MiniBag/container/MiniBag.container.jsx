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
import BAG_PAGE_ACTIONS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.actions';
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniBagContainer);
