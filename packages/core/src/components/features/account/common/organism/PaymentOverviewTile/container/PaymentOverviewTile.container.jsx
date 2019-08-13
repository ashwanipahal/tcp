import React from 'react';
import { connect } from 'react-redux';
import PaymentOverviewTileComponent from '../views';
import {
  getCreditCardDefault,
  getGiftCards,
  getVenmoCards,
} from '../../../../Payment/container/Payment.selectors';
import { getCardList } from '../../../../Payment/container/Payment.actions';

export class PaymentOverviewTile extends React.Component<Props> {
  componentDidMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  render() {
    const { creditCardDefault, giftCardList, venmoCardList, labels } = this.props;
    const creditCardDefaultValue = creditCardDefault.get(0);
    const giftCardListValue = giftCardList.get(0);
    const venmoCardListValue = venmoCardList.get(0);
    return (
      <PaymentOverviewTileComponent
        creditCardDefault={creditCardDefaultValue}
        giftCardList={giftCardListValue}
        venmoCardList={venmoCardListValue}
        labels={labels}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
  };
};

const mapStateToProps = state => {
  return {
    creditCardDefault: getCreditCardDefault(state),
    giftCardList: getGiftCards(state),
    venmoCardList: getVenmoCards(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOverviewTile);
