import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { Map } from 'immutable';

import PropTypes from 'prop-types';
import { toastMessageInfo } from '@tcp/core/src/components/common/atoms/Toast/container/Toast.actions.native';
import { addAddressReq, updateAddressReq, resetState } from './AddEditAddress.actions';

import { getAddressList } from '../../../../features/account/AddressBook/container/AddressBook.actions';
import AddAddressComponent from '../views/AddEditAddress.view';
import {
  getAddressResponse,
  getUserEmail,
  getAddEditAddressLabels,
  getAddEditErrorMessage,
  getshowNotification,
} from './AddEditAddress.selectors';
import { verifyAddress } from '../../AddressVerification/container/AddressVerification.actions';
import { getAddressListState } from '../../../../features/account/AddressBook/container/AddressBook.selectors';
import { getVerificationResult } from '../../AddressVerification/container/AddressVerification.selectors';
import constants from './AddEditAddress.constants';

export class AddEditAddressContainer extends React.PureComponent<Props> {
  static propTypes = {
    submitEditAddressFormAction: PropTypes.func,
    submitNewAddressFormAction: PropTypes.func,
    verifyAddressAction: PropTypes.func,
    addressResponse: PropTypes.string,
    userEmail: PropTypes.string,
    addressList: PropTypes.shape({}),
    address: PropTypes.shape({}),
    labels: PropTypes.shape({
      addressFormLabels: PropTypes.shape({}),
      addressBook: PropTypes.shape({}),
    }),
    backToAddressBookClick: PropTypes.func,
    onCancel: PropTypes.func,
    toggleAddressModal: PropTypes.func,
    currentForm: PropTypes.string,
    setModalHeading: PropTypes.func,
    verificationResult: PropTypes.string,
    toastMessage: PropTypes.func.isRequired,
    addEditAddressErrorMsg: PropTypes.string,
    showNotification: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    submitEditAddressFormAction: () => {},
    submitNewAddressFormAction: () => {},
    verifyAddressAction: () => {},
    addressResponse: '',
    userEmail: '',
    addressList: {},
    address: {},
    labels: {
      addressFormLabels: {},
      addressBook: {},
    },
    backToAddressBookClick: () => {},
    onCancel: () => {},
    toggleAddressModal: () => {},
    currentForm: '',
    setModalHeading: () => {},
    verificationResult: '',
    addEditAddressErrorMsg: '',
  };

  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  componentDidUpdate(prevProps) {
    const {
      addressResponse,
      getAddressListAction,
      onCancel,
      resetFormState,
      addEditAddressErrorMsg,
      toastMessage,
      showNotification,
    } = this.props;
    const isSuccess =
      addressResponse && Map.isMap(addressResponse) && addressResponse.get('addressId');
    if (isSuccess) {
      getAddressListAction();
      onCancel();
      resetFormState();
    }
    if (!prevProps.showNotification && showNotification) {
      toastMessage(addEditAddressErrorMsg);
    }
  }

  componentWillUnmount() {
    const {
      resetFormState,
      toggleAddressModal,
      currentForm,
      resetAddressLine1,
      resetAddressState,
    } = this.props;
    resetFormState();
    if (currentForm === 'VerificationModal') toggleAddressModal();

    if (resetAddressLine1) resetAddressLine1();
    resetAddressState();
  }

  getInitialValues = (addressList, address) => {
    if (!address) {
      return {
        primary: addressList && addressList.size === 0,
        country: constants.COUNTRY_US,
        addressLine2: '',
      };
    }
    return {
      firstName: address.firstName,
      lastName: address.lastName,
      addressLine1: address.addressLine[0],
      addressLine2: address.addressLine[1],
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phoneNumber: address.phone1,
      primary: address.primary === 'true',
      nickName: address.nickName,
    };
  };

  verifyAddress = payload => {
    const { verifyAddressAction, toggleAddressModal, setAddressLine1 } = this.props;
    const formattedFormPayload = Object.assign(this.initialValues, payload);
    const formattedPayload = this.formatPayload(formattedFormPayload);

    verifyAddressAction(formattedPayload);
    toggleAddressModal();
    if (setAddressLine1) {
      setAddressLine1(formattedPayload.address1, formattedPayload.state);
    }
  };

  submitAddressForm = payloadParam => {
    const { submitEditAddressFormAction, submitNewAddressFormAction, address } = this.props;
    const { userEmail } = this.props;
    const payload = Object.assign(payloadParam, {
      email: userEmail,
    });
    if (address) {
      submitEditAddressFormAction(payload);
    } else {
      submitNewAddressFormAction(payload);
    }
  };

  formatPayload = payload => {
    const { addressLine1, addressLine2, zipCode, primary, ...otherPayload } = payload;
    return {
      ...otherPayload,
      ...{
        address1: addressLine1,
        address2: addressLine2,
        zip: zipCode,
        primary: primary ? 'true' : 'false',
      },
    };
  };

  resetInitialValue = () => {
    const { onCancel, resetFormState } = this.props;
    onCancel();
    resetFormState();
  };

  render() {
    const {
      addressResponse,
      addressList,
      address,
      labels,
      backToAddressBookClick,
      isEdit,
      toggleAddressModal,
      currentForm,
      addressLine1,
      countryState,
      setModalHeading,
      verificationResult,
    } = this.props;
    this.initialValues = this.getInitialValues(addressList, address);
    const addressListSize = addressList && addressList.size;
    const isMakeDefaultDisabled = address ? addressListSize === 1 : addressListSize === 0;
    return (
      <AddAddressComponent
        onCancel={this.resetInitialValue}
        addressResponse={addressResponse}
        submitAddressFormAction={this.submitAddressForm}
        verifyAddressAction={this.verifyAddress}
        isMakeDefaultDisabled={isMakeDefaultDisabled}
        initialValues={this.initialValues}
        isEdit={isEdit}
        currentForm={currentForm}
        toggleAddressModal={toggleAddressModal}
        addressFormLabels={labels.addressFormLabels}
        addressBookLabels={labels.addressBook}
        backToAddressBookClick={backToAddressBookClick}
        addressLine1={addressLine1}
        countryState={countryState}
        setModalHeading={setModalHeading}
        verificationResult={verificationResult}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    submitNewAddressFormAction: payload => {
      dispatch(addAddressReq(payload));
    },
    submitEditAddressFormAction: payload => {
      dispatch(updateAddressReq(payload));
    },
    verifyAddressAction: payload => {
      dispatch(verifyAddress(payload));
    },
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
    resetFormState: () => {
      dispatch(reset('AddressForm'));
    },
    resetAddressState: () => {
      dispatch(resetState());
    },
    toastMessage: palyoad => {
      dispatch(toastMessageInfo(palyoad));
    },
  };
};

const mapStateToProps = state => {
  return {
    addressResponse: getAddressResponse(state),
    userEmail: getUserEmail(state),
    addressList: getAddressListState(state),
    labels: getAddEditAddressLabels(state),
    verificationResult: getVerificationResult(state),
    showNotification: getshowNotification(state),
    addEditAddressErrorMsg: getAddEditErrorMessage(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditAddressContainer);
