import PropTypes from 'prop-types';
import React from 'react';
import { change } from 'redux-form';
import constants from '../container/CreditCard.constants';
import Button from '../../../../../../common/atoms/Button';
import Card from '../../../../../../common/molecules/Card';
import { Heading } from '../../../../../../common/atoms';

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
  showAccordian: PropTypes.bool,
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
  showAccordian: true,
};

const getCardOptions = ({
  creditCardList,
  labels,
  onFileCardKey,
  addNewCCState,
  addNewCC,
  selectedCard,
}) => {
  let cardOptions = creditCardList.map(card => ({
    value: card.creditCardId,
    title: `${labels.creditCardEnd}${card.accountNo.slice(-4)} ${
      card.defaultInd ? `(${labels.defaultBadge})` : ''
    }`,
    content: (
      <Card
        card={card}
        isDefault={card.defaultInd}
        cardNumber={`${labels.creditCardEnd}${card.accountNo.slice(-4)}`}
        labels={labels}
        selectedValue={+onFileCardKey}
        dataLocator="cardDetailCardDropDown"
      />
    ),
  }));

  cardOptions = cardOptions.push({
    value: '',
    title: labels.addCreditHeading,
    content: (
      <Button
        className="addCreditCardBtn"
        fullWidth
        buttonVariation="variable-width"
        fill="BLACK"
        onClick={addNewCC}
        disabled={addNewCCState || !selectedCard}
        dataLocator="addCreditCardBtn"
      >
        {labels.addCreditBtn}
      </Button>
    ),
  });

  return cardOptions;
};

const onCCDropUpdateChange = (value, selectedCard, dispatch) => {
  if (selectedCard) {
    dispatch(change(constants.FORM_NAME, 'cardType', selectedCard.ccBrand.toUpperCase()));
  }
};

const onAddNewCreditCardUpdate = dispatch => {
  dispatch(change(constants.FORM_NAME, 'cardNumber', ''));
  dispatch(change(constants.FORM_NAME, 'expMonth', ''));
  dispatch(change(constants.FORM_NAME, 'expYear', ''));
  dispatch(change(constants.FORM_NAME, 'cvvCode', ''));
};

const getFormName = editMode => {
  return editMode ? constants.EDIT_FORM_NAME : constants.FORM_NAME;
};

const renderBillingAddressHeading = labels => {
  return (
    <Heading
      component="h3"
      variant="listMenu"
      className="cardDropdownHeading"
      dataLocator="cardDropDownLbl"
    >
      {labels.selectFromCard}
    </Heading>
  );
};

export {
  propTypes,
  defaultProps,
  getCardOptions,
  onCCDropUpdateChange,
  onAddNewCreditCardUpdate,
  getFormName,
  renderBillingAddressHeading,
};
