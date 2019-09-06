import React from 'react';
import { connect } from 'react-redux';
import { getCardList } from '../../../../../account/Payment/container/Payment.actions';
import { getCardListState } from '../../../../../account/Payment/container/Payment.selectors';
import BillingPaymentForm from '../views';
import CreditCardSelector from './CreditCard.selectors';
// import GIFT_CARD_ACTIONS from './GiftCards.action';

export class GiftCardsContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  componentWillMount() {
    const { getCardListAction } = this.props;
    getCardListAction();
  }

  getCreditCardDefault = cardList =>
    cardList &&
    cardList.size > 0 &&
    cardList.filter(
      card => card.ccType !== 'GiftCard' && card.ccType !== 'VENMO' && card.defaultInd
    );

  getInitialValues = cardList => {
    if (!cardList) {
      return {
        onFileCardKey: 0,
        paymentMethodId: 'creditCard',
      };
    }
    return {
      onFileCardKey: cardList.get(0).creditCardId,
      paymentMethodId: 'creditCard',
    };
  };

  render() {
    const { cardList, labels, onFileCardKey, isMobile } = this.props;
    this.initialValues = this.getInitialValues(this.getCreditCardDefault(cardList));
    return (
      <BillingPaymentForm
        cardList={cardList}
        labels={labels}
        onFileCardKey={onFileCardKey}
        isMobile={isMobile}
        initialValues={this.initialValues}
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

const mapStateToProps = (state, ownProps) => {
  return {
    cardList: getCardListState(state),
    labels: CreditCardSelector.getCreditCardLabels(state),
    onFileCardKey: CreditCardSelector.getOnFileCardKey(state, ownProps),
    isMobile: CreditCardSelector.getIsMobile(),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardsContainer);
