import React from 'react';
import { connect } from 'react-redux';
import { getCardList } from '../../../../../account/Payment/container/Payment.actions';
import { getCardListState } from '../../../../../account/Payment/container/Payment.selectors';
import BillingPaymentForm from '../views';
import CreditCardSelector from './CreditCard.selectors';
import { fetchModuleX } from './CreditCard.action';

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
    const {
      cardList,
      labels,
      onFileCardKey,
      isMobile,
      paymentMethodId,
      getCVVCodeInfo,
      cvvCodeInfoContentId,
      cvvCodeRichText,
    } = this.props;
    if (cvvCodeInfoContentId) {
      getCVVCodeInfo(cvvCodeInfoContentId);
    }
    this.initialValues = this.getInitialValues(this.getCreditCardDefault(cardList));
    return (
      <BillingPaymentForm
        cardList={cardList}
        labels={labels}
        onFileCardKey={onFileCardKey}
        isMobile={isMobile}
        initialValues={this.initialValues}
        paymentMethodId={paymentMethodId}
        getCVVCodeInfo={getCVVCodeInfo}
        cvvCodeInfoContentId={cvvCodeInfoContentId}
        cvvCodeRichText={cvvCodeRichText}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
    getCVVCodeInfo: cid => {
      dispatch(fetchModuleX(cid));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    cardList: getCardListState(state),
    labels: CreditCardSelector.getCreditCardLabels(state),
    onFileCardKey: CreditCardSelector.getOnFileCardKey(state, ownProps),
    isMobile: CreditCardSelector.getIsMobile(),
    paymentMethodId: CreditCardSelector.getPaymentMethodId(state, ownProps),
    cvvCodeInfoContentId: CreditCardSelector.getCVVCodeInfoContentId(state),
    cvvCodeRichText: CreditCardSelector.getCVVCodeRichTextSelector(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardsContainer);
