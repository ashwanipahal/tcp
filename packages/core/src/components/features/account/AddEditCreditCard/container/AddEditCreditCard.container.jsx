/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router'; //eslint-disable-line
import { getAddressList } from '../../AddressBook/container/AddressBook.actions';
import {
  getCardType,
  getCreditCardById,
  getCreditCardExpirationOptionMap,
  getOnFileAddressKey,
  getAddEditCreditCardSuccess,
  getAddEditCreditCardError,
} from './AddEditCreditCard.selectors';
import constants from './AddEditCreditCard.constants';
import labels from './AddEditCreditCard.labels';
import addressLabels from '../../AddressBook/container/AddressBook.labels';
import AddEditCreditCardComponent from '../views/AddEditCreditCard.view';
import { getAddressListState } from '../../AddressBook/container/AddressBook.selectors';
import { addCreditCard, editCreditCard } from './AddEditCreditCard.actions';
import { setDefaultPaymentSuccess } from '../../Payment/container/Payment.actions';

export class AddEditCreditCard extends React.PureComponent {
  static propTypes = {
    creditCard: PropTypes.object,
    cardType: PropTypes.string,
    onFileAddressKey: PropTypes.string,
    addressList: PropTypes.array,
    getAddressListAction: PropTypes.func.isRequired,
    isPLCCEnabled: PropTypes.bool,
    expMonthOptionsMap: PropTypes.array.isRequired,
    expYearOptionsMap: PropTypes.array.isRequired,
    addCreditCardAction: PropTypes.func.isRequired,
    editCreditCardAction: PropTypes.func.isRequired,
    showSuccessNotification: PropTypes.func.isRequired,
    addEditCreditCardSuccess: PropTypes.object,
    addEditCreditCardError: PropTypes.string,
  };

  static defaultProps = {
    cardType: '',
    addressList: [],
    isPLCCEnabled: true,
    onFileAddressKey: '',
    addEditCreditCardSuccess: null,
    addEditCreditCardError: null,
    creditCard: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
    };
  }

  componentDidMount() {
    const { addressList, getAddressListAction } = this.props;
    if (addressList === null) {
      getAddressListAction();
    }
    this.setInitialValues();
  }

  componentDidUpdate(prevProps) {
    const { addEditCreditCardSuccess, showSuccessNotification, creditCard } = this.props;
    if (!prevProps.addEditCreditCardSuccess && addEditCreditCardSuccess) {
      showSuccessNotification();
      this.backToPaymentClick();
    }

    if (!prevProps.creditCard && creditCard) {
      this.setInitialValues();
    }
  }

  setInitialValues = () => {
    const { addressList } = this.props;
    if (addressList && addressList.size > 0) {
      const initialValues = this.getInitialValues();
      this.setState({
        initialValues,
      });
    }
  };

  backToPaymentClick = () => {
    Router.push('/account?id=payment', '/account/payment');
  };

  getExpirationRequiredFlag = () => {
    const { cardType } = this.props;

    return !cardType || cardType !== constants.ACCEPTED_CREDIT_CARDS['PLACE CARD'];
  };

  getInitialValues = () => {
    const { addressList, creditCard } = this.props;
    let onFileAddressKey = '';

    if (addressList && addressList.size > 0) {
      const defaultBillingAddress = addressList.filter(address => address.primary === 'true');
      onFileAddressKey =
        defaultBillingAddress.size > 0 ? defaultBillingAddress.get(0).addressId : '';
    }

    if (creditCard) {
      // edit mode
      let cardType = creditCard.ccBrand || creditCard.ccType;
      cardType = constants.ACCEPTED_CREDIT_CARDS[cardType.toUpperCase()];
      return {
        onFileAddressKey: creditCard.billingAddressId.toString(),
        cardType,
        cardNumber: creditCard.accountNo,
        expYear: creditCard.expYear.trim(),
        expMonth: creditCard.expMonth.trim(),
        address: {
          country: 'US',
          addressLine2: '',
        },
      };
    }

    return {
      onFileAddressKey,
      address: {
        country: 'US',
        addressLine2: '',
      },
    };
  };

  onCreditCardFormSubmit = data => {
    const { cardType, creditCard, addCreditCardAction, editCreditCardAction } = this.props;

    const payload = Object.assign(data, {
      cardType,
    });

    if (creditCard && creditCard.creditCardId) {
      payload.creditCardId = creditCard.creditCardId;
      return editCreditCardAction(payload);
    }
    return addCreditCardAction(payload);
  };

  render() {
    const {
      creditCard,
      cardType,
      onFileAddressKey,
      addressList,
      isPLCCEnabled,
      expYearOptionsMap,
      expMonthOptionsMap,
      addEditCreditCardError,
    } = this.props;

    if (!addressList) {
      return null;
    }

    const isExpirationRequired = this.getExpirationRequiredFlag();
    const { initialValues } = this.state;

    return (
      <AddEditCreditCardComponent
        isEdit={!!creditCard}
        creditCard={creditCard}
        cardType={cardType}
        onFileAddressKey={onFileAddressKey}
        isPLCCEnabled={isPLCCEnabled}
        isExpirationRequired={isExpirationRequired}
        addressList={addressList}
        labels={labels}
        expMonthOptionsMap={expMonthOptionsMap}
        expYearOptionsMap={expYearOptionsMap}
        initialValues={initialValues}
        addressLabels={addressLabels}
        backToPaymentClick={this.backToPaymentClick}
        onSubmit={this.onCreditCardFormSubmit}
        errorMessage={addEditCreditCardError}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    creditCard: getCreditCardById(state, ownProps),
    addressList: getAddressListState(state, ownProps),
    cardType: getCardType(state, ownProps),
    onFileAddressKey: getOnFileAddressKey(state, ownProps),
    expMonthOptionsMap: getCreditCardExpirationOptionMap().monthsMap,
    expYearOptionsMap: getCreditCardExpirationOptionMap().yearsMap,
    isPLCCEnabled: true,
    addEditCreditCardSuccess: getAddEditCreditCardSuccess(state),
    addEditCreditCardError: getAddEditCreditCardError(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
    addCreditCardAction: payload => {
      dispatch(addCreditCard(payload));
    },
    editCreditCardAction: payload => {
      dispatch(editCreditCard(payload));
    },
    showSuccessNotification: () => {
      dispatch(setDefaultPaymentSuccess());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditCreditCard);
