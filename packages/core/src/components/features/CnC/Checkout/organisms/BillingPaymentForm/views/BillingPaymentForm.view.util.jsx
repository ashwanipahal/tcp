import PropTypes from 'prop-types';
import React from 'react';
import constants from '../container/CreditCard.constants';
import Button from '../../../../../../common/atoms/Button';
import Card from '../../../../../../common/molecules/Card';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  cardList: PropTypes.shape({}).isRequired,
  onFileCardKey: PropTypes.string,
  initialValues: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  cvvCodeRichText: PropTypes.string,
  paymentMethodId: PropTypes.string.isRequired,
  orderHasShipping: PropTypes.bool,
  backLinkPickup: PropTypes.string.isRequired,
  backLinkShipping: PropTypes.string.isRequired,
  nextSubmitText: PropTypes.string.isRequired,
  isPaymentDisabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  cardType: PropTypes.string,
  syncErrorsObj: PropTypes.shape({}),
  isGuest: PropTypes.bool,
  isSaveToAccountChecked: PropTypes.bool,
  selectedOnFileAddressId: PropTypes.string,
  userAddresses: PropTypes.shape({}),
  addressLabels: PropTypes.shape({}).isRequired,
  shippingAddress: PropTypes.shape({}),
  isSameAsShippingChecked: PropTypes.bool,
  billingData: PropTypes.shape({}),
};

const defaultProps = {
  className: '',
  onFileCardKey: '',
  cvvCodeRichText: null,
  orderHasShipping: false,
  isPaymentDisabled: false,
  cardType: null,
  syncErrorsObj: null,
  isGuest: true,
  isSaveToAccountChecked: false,
  selectedOnFileAddressId: null,
  userAddresses: null,
  shippingAddress: null,
  isSameAsShippingChecked: false,
  billingData: null,
};

const getExpirationRequiredFlag = ({ cardType }) => {
  return !cardType || cardType !== constants.ACCEPTED_CREDIT_CARDS.PLACE_CARD;
};

const getSelectedCard = ({ creditCardList, onFileCardKey }) => {
  return creditCardList.find(card => card.creditCardId === +onFileCardKey);
};

const getCreditCardList = ({ cardList }) =>
  cardList &&
  cardList.size > 0 &&
  cardList.filter(
    card =>
      card.ccType !== constants.ACCEPTED_CREDIT_CARDS.GIFT_CARD &&
      card.ccType !== constants.ACCEPTED_CREDIT_CARDS.VENMO
  );

const getCardOptions = ({ cardList, labels, onFileCardKey, addNewCCState }) => {
  let cardOptions = cardList.map(card => ({
    value: card.creditCardId,
    title: `${labels.lbl_billing_creditCardEnd}${card.accountNo.slice(-4)} ${
      card.defaultInd ? `(${labels.lbl_billing_default})` : ''
    }`,
    content: (
      <Card
        card={card}
        isDefault={card.defaultInd}
        cardNumber={`${labels.lbl_billing_creditCardEnd}${card.accountNo.slice(-4)}`}
        labels={labels}
        selectedValue={+onFileCardKey}
      />
    ),
  }));

  cardOptions = cardOptions.push({
    value: '',
    title: labels.lbl_billing_addCreditHeading,
    content: (
      <Button
        className="addCreditCardBtn"
        fullWidth
        buttonVariation="variable-width"
        fill="BLACK"
        onClick={this.onAddNewCCClick}
        disabled={addNewCCState}
      >
        {labels.lbl_billing_addCreditBtn}
      </Button>
    ),
  });

  return cardOptions;
};

export {
  propTypes,
  defaultProps,
  getExpirationRequiredFlag,
  getSelectedCard,
  getCreditCardList,
  getCardOptions,
};
