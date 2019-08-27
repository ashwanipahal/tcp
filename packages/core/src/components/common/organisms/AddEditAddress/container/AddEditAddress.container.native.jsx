import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import PropTypes from 'prop-types';
import { addAddressReq, updateAddressReq } from './AddEditAddress.actions';

import { getAddressList } from '../../../../features/account/AddressBook/container/AddressBook.actions';
import AddAddressComponent from '../views/AddEditAddress.view';
import {
  getAddressResponse,
  getUserEmail,
  getAddressById,
  getAddEditAddressLabels,
} from './AddEditAddress.selectors';
import { verifyAddress } from '../../AddressVerification/container/AddressVerification.actions';
import { getAddressListState } from '../../../../features/account/AddressBook/container/AddressBook.selectors';
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
      addressFormLabels: PropTypes.string,
      addressBook: PropTypes.string,
    }),
    backToAddressBookClick: PropTypes.func,
    onCancel: PropTypes.func,
    toggleAddressModal: PropTypes.func,
    currentForm: PropTypes.string,
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
      addressFormLabels: '',
      addressBook: '',
    },
    backToAddressBookClick: () => {},
    onCancel: () => {},
    toggleAddressModal: () => {},
    currentForm: '',
  };

  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  componentDidUpdate() {
    const { addressResponse, getAddressListAction, onCancel, resetFormState } = this.props;
    const isSuccess = addressResponse && addressResponse.get('addressId');
    if (isSuccess) {
      getAddressListAction();
      onCancel();
      resetFormState();
    }
  }

  componentWillUnmount() {
    const { resetFormState, toggleAddressModal, currentForm } = this.props;
    resetFormState();
    if (currentForm === 'VerificationModal') toggleAddressModal();
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
    const { verifyAddressAction, toggleAddressModal } = this.props;
    const formattedFormPayload = Object.assign(this.initialValues, payload);
    const formattedPayload = this.formatPayload(formattedFormPayload);

    verifyAddressAction(formattedPayload);
    toggleAddressModal();
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
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    addressResponse: getAddressResponse(state),
    userEmail: getUserEmail(state),
    addressList: getAddressListState(state),
    address: getAddressById(state, ownProps),
    labels: getAddEditAddressLabels(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditAddressContainer);
