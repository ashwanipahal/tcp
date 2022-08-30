import React from 'react';
import { connect } from 'react-redux';
import {
  getCardList,
  checkBalance,
} from '@tcp/core/src/components/features/account/Payment/container/Payment.actions';
import {
  getCardListState,
  checkbalanceValue,
  getCardListFetchingState,
} from '@tcp/core/src/components/features/account/Payment/container/Payment.selectors';
import PaymentTileComponent from '../views';
import PaymentOverviewTileSkeleton from '../skeleton/PaymentOverviewTileSkeleton.view.native';

export class PaymentTile extends React.Component<Props> {
  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  render() {
    const { isFetching } = this.props;
    if (isFetching) {
      return <PaymentOverviewTileSkeleton />;
    }
    return <PaymentTileComponent {...this.props} />;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
    onGetBalanceCard: payload => {
      dispatch(checkBalance(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    cardList: getCardListState(state),
    checkbalanceValueInfo: checkbalanceValue(state),
    isFetching: getCardListFetchingState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentTile);
