import React from 'react';
import { connect } from 'react-redux';
import {
  getGrandTotal,
  getCurrencySymbol,
} from '@tcp/core/src/components/features/CnC/BagPage/organisms/OrderLedger/container/orderLedger.selector';
import MiniBagView from '../views/MiniBag.view';
import { getLabelsMiniBag, getTotalItemCount } from './MiniBag.selectors';
import {
  getCurrentPointsState,
  getTotalRewardsState,
} from '../../../../../../../core/src/components/features/account/User/container/User.selectors';

// @flow
type Props = {
  isOpen: boolean,
  totalItems: any,
  labels: any,
  toggleMiniBagModal: any,
  userName: any,
  subTotal: any,
  currencySymbol: any,
  currentPoints: any,
  totalRewards: any,
};
export class MiniBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(e) {
    if (e) e.preventDefault();
    const { toggleMiniBagModal } = this.props;
    toggleMiniBagModal({ e, isOpen: false });
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
  };
};
export default connect(mapStateToProps)(MiniBagContainer);
