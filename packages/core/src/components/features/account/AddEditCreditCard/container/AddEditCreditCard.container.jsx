import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import internalEndpoints from '@tcp/core/src/components/features/account/common/internalEndpoints';
import { routerPush, isCanada } from '@tcp/core/src/utils';
import { getAddressList } from '../../AddressBook/container/AddressBook.actions';
import {
  getCardType,
  getCreditCardById,
  getOnFileAddressKey,
  getAddEditCreditCardSuccess,
  getAddEditCreditCardError,
  getAddGiftCardErrorMessage,
  getshowNotification,
} from './AddEditCreditCard.selectors';
import { getFormValidationErrorMessages } from '../../Account/container/Account.selectors';
import constants from './AddEditCreditCard.constants';
import AddEditCreditCardComponent from '../views/AddEditCreditCard.view';
import { getAddressListState } from '../../AddressBook/container/AddressBook.selectors';
import { addCreditCard, editCreditCard, resetErrorState } from './AddEditCreditCard.actions';
import { setDefaultPaymentSuccess } from '../../Payment/container/Payment.actions';
import { getCreditCardExpirationOptionMap } from '../../../../../utils';
import { getAddEditAddressLabels } from '../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';

export class AddEditCreditCard extends React.PureComponent {
  static propTypes = {
    creditCard: PropTypes.shape({}),
    cardType: PropTypes.string,
    onFileAddressKey: PropTypes.string,
    addressList: PropTypes.shape([]),
    isPLCCEnabled: PropTypes.bool,
    addEditCreditCardSuccess: PropTypes.shape({}),
    addEditCreditCardError: PropTypes.string,
    getAddressListAction: PropTypes.func.isRequired,
    addCreditCardAction: PropTypes.func.isRequired,
    editCreditCardAction: PropTypes.func.isRequired,
    showSuccessNotification: PropTypes.func.isRequired,
    labels: PropTypes.shape({}),
    addressLabels: PropTypes.shape({}),
    formErrorMessage: PropTypes.shape({}).isRequired,
    showNotification: PropTypes.bool.isRequired,
    addEditCreditCardErrorMsg: PropTypes.string,
    resetErrorNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cardType: '',
    addressList: List(),
    isPLCCEnabled: true,
    onFileAddressKey: '',
    addEditCreditCardSuccess: null,
    addEditCreditCardError: null,
    creditCard: null,
    labels: {},
    addressLabels: { addressFormLabels: {} },
    addEditCreditCardErrorMsg: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      initialValues: {},
    };
    this.creditCardExpirationOptionMap = getCreditCardExpirationOptionMap();
  }

  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction();
    this.setInitialValues();
  }

  componentDidUpdate(prevProps) {
    const {
      addEditCreditCardSuccess,
      showSuccessNotification,
      creditCard,
      addressList,
    } = this.props;
    const isAddressListUpdated = !prevProps.addressList && addressList;
    if (!prevProps.addEditCreditCardSuccess && addEditCreditCardSuccess) {
      showSuccessNotification();
      this.backToPaymentClick();
    }

    if (isAddressListUpdated || (!prevProps.creditCard && creditCard)) {
      this.setInitialValues();
    }
  }

  componentWillUnmount() {
    const { resetErrorNotification } = this.props;
    resetErrorNotification();
  }

  setInitialValues = () => {
    const { addressList } = this.props;
    if (addressList) {
      const initialValues = this.getInitialValues();
      this.setState({
        initialValues,
      });
    }
  };

  backToPaymentClick = () => {
    routerPush(internalEndpoints.paymentPage.link, internalEndpoints.paymentPage.path);
  };

  getExpirationRequiredFlag = () => {
    const { cardType } = this.props;

    return !cardType || cardType !== constants.ACCEPTED_CREDIT_CARDS['PLACE CARD'];
  };

  getInitialValuesForEditMode = creditCard => {
    if (creditCard) {
      let cardType = creditCard.ccBrand || creditCard.ccType;
      cardType = constants.ACCEPTED_CREDIT_CARDS[cardType.toUpperCase()];
      return {
        onFileAddressKey: creditCard.billingAddressId.toString(),
        cardType,
        cardNumber: creditCard.accountNo,
        expYear: creditCard.expYear.trim(),
        expMonth: creditCard.expMonth.trim(),
        address: {
          country: isCanada() ? 'CA' : 'US',
          addressLine2: '',
        },
      };
    }

    return null;
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
      return this.getInitialValuesForEditMode(creditCard);
    }

    return {
      onFileAddressKey,
      address: {
        country: isCanada() ? 'CA' : 'US',
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
      payload.isDefault = creditCard.defaultInd;
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
      addEditCreditCardError,
      addEditCreditCardErrorMsg,
      labels,
      addressLabels,
      formErrorMessage,
      showNotification,
    } = this.props;

    if (addressList === null) {
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
        expMonthOptionsMap={this.creditCardExpirationOptionMap.monthsMap}
        expYearOptionsMap={this.creditCardExpirationOptionMap.yearsMap}
        initialValues={initialValues}
        addressLabels={labels}
        backToPaymentClick={this.backToPaymentClick}
        onSubmit={this.onCreditCardFormSubmit}
        errorMessage={addEditCreditCardError}
        addressFormLabels={addressLabels.addressFormLabels}
        formErrorMessage={formErrorMessage}
        showNotification={showNotification}
        globalErrorMessage={addEditCreditCardErrorMsg}
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
    isPLCCEnabled: true,
    addEditCreditCardSuccess: getAddEditCreditCardSuccess(state),
    addEditCreditCardError: getAddEditCreditCardError(state),
    addressLabels: getAddEditAddressLabels(state),
    formErrorMessage: getFormValidationErrorMessages(state),
    showNotification: getshowNotification(state),
    addEditCreditCardErrorMsg: getAddGiftCardErrorMessage(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAddressListAction: payload => {
      dispatch(getAddressList(payload));
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
    resetErrorNotification: () => {
      dispatch(resetErrorState());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditCreditCard);
