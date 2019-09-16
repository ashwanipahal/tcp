import React from 'react';
import { connect } from 'react-redux';
import { getCardList } from '../../../../../account/Payment/container/Payment.actions';
import { getCardListState } from '../../../../../account/Payment/container/Payment.selectors';
import BillingPaymentForm from '../views';
import CreditCardSelector from './CreditCard.selectors';
import constants from './CreditCard.constants';
import BAG_PAGE_ACTIONS from '../../../../BagPage/container/BagPage.actions';
import CheckoutSelectors from '../../../container/Checkout.selector';

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
      card =>
        card.ccType !== constants.ACCEPTED_CREDIT_CARDS.GIFT_CARD &&
        card.ccType !== constants.ACCEPTED_CREDIT_CARDS.VENMO &&
        card.defaultInd
    );

  getInitialValues = cardList => {
    if (!cardList) {
      return {
        onFileCardKey: 0,
        paymentMethodId: constants.PAYMENT_METHOD_CREDIT_CARD,
      };
    }
    return {
      onFileCardKey: cardList.get(0) && cardList.get(0).creditCardId,
      paymentMethodId: constants.PAYMENT_METHOD_CREDIT_CARD,
    };
  };

  getSelectedCard = (cardList, paymentId) => {
    return cardList.find(card => card.creditCardId === paymentId);
  };

  submitBillingData = data => {
    const { cardList, handleSubmit } = this.props;
    const cardDetails = this.getSelectedCard(cardList, data.onFileCardKey);

    const isCardTypeRequired = cardDetails.cardType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD;
    handleSubmit({
      address: {
        ...cardDetails.addressDetails,
        onFileAddressId: cardDetails.billingAddressId,
        onFileAddressKey: undefined,
        sameAsShipping: true,
      },
      billing: {
        cardNumber: cardDetails.accountNo,
        cardType: cardDetails.ccBrand,
        cvv: '',
        expMonth: cardDetails.expMonth,
        expYear: cardDetails.expYear,
        isCVVRequired: isCardTypeRequired,
        isExpirationRequired: isCardTypeRequired,
      },
      cardNumber: cardDetails.accountNo,
      cardType: cardDetails.ccBrand,
      cvv: data.cvvCode,
      emailAddress: undefined,
      expMonth: cardDetails.expMonth,
      expYear: cardDetails.expYear,
      isCVVRequired: isCardTypeRequired,
      isExpirationRequired: isCardTypeRequired,
      paymentId: cardDetails.creditCardId,
      paymentMethod: data.paymentMethodId,
      phoneNumber: cardDetails.addressDetails && cardDetails.addressDetails.phone1,
      saveToAccount: true,
      setAsDefault: data.defaultPaymentMethod || cardDetails.defaultInd,
    });
  };

  render() {
    const {
      cardList,
      labels,
      onFileCardKey,
      paymentMethodId,
      getCVVCodeInfo,
      cvvCodeInfoContentId,
      cvvCodeRichText,
      orderHasShipping,
      isGuest,
      backLinkPickup,
      backLinkShipping,
      nextSubmitText,
      formErrorMessage,
      isPaymentDisabled,
    } = this.props;
    if (cvvCodeInfoContentId) {
      getCVVCodeInfo([cvvCodeInfoContentId]);
    }
    this.initialValues = this.getInitialValues(this.getCreditCardDefault(cardList));
    return (
      <BillingPaymentForm
        cardList={cardList}
        labels={labels}
        onFileCardKey={onFileCardKey}
        initialValues={this.initialValues}
        paymentMethodId={paymentMethodId}
        getCVVCodeInfo={getCVVCodeInfo}
        cvvCodeInfoContentId={cvvCodeInfoContentId}
        cvvCodeRichText={cvvCodeRichText}
        onSubmit={this.submitBillingData}
        orderHasShipping={orderHasShipping}
        isGuest={isGuest}
        backLinkPickup={backLinkPickup}
        backLinkShipping={backLinkShipping}
        nextSubmitText={nextSubmitText}
        formErrorMessage={formErrorMessage}
        isPaymentDisabled={isPaymentDisabled}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getCardListAction: () => {
      dispatch(getCardList());
    },
    getCVVCodeInfo: contentIds => {
      dispatch(BAG_PAGE_ACTIONS.fetchModuleX(contentIds));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    cardList: getCardListState(state),
    labels: CreditCardSelector.getCreditCardLabels(state),
    onFileCardKey: CreditCardSelector.getOnFileCardKey(state, ownProps),
    paymentMethodId: CreditCardSelector.getPaymentMethodId(state, ownProps),
    cvvCodeInfoContentId: CreditCardSelector.getCVVCodeInfoContentId(state),
    cvvCodeRichText: CreditCardSelector.getCVVCodeRichTextSelector(state),
    formErrorMessage: CreditCardSelector.getFormValidationErrorMessages(state),
    isPaymentDisabled: CheckoutSelectors.getIsPaymentDisabled(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardsContainer);
