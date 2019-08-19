import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAddressReq, updateAddressReq } from './AddEditAddress.actions';
import AddAddressComponent from '../views/AddEditAddress.view';
import {
  getAddressResponse,
  getUserEmail,
  getAddressById,
  getAddEditAddressLabels,
} from './AddEditAddress.selectors';
import { verifyAddress } from '../../AddressVerification/container/AddressVerification.actions';
import { getAddressListState } from '../../../../features/account/AddressBook/container/AddressBook.selectors';

export class AddEditAddressContainer extends React.PureComponent<Props> {
  static propTypes = {
    submitEditAddressFormAction: PropTypes.func,
    submitNewAddressFormAction: PropTypes.func,
    verifyAddressAction: PropTypes.func,
    addressResponse: PropTypes.string,
    userEmail: PropTypes.string,
    addressList: PropTypes.shape({}),
    address: PropTypes.shape({}),
    labels: PropTypes.shape({}),
    backToAddressBookClick: PropTypes.func,
  };

  static defaultProps = {
    submitEditAddressFormAction: () => {},
    submitNewAddressFormAction: () => {},
    verifyAddressAction: () => {},
    addressResponse: '',
    userEmail: '',
    addressList: {},
    address: {},
    labels: {},
    backToAddressBookClick: () => {},
  };

  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  getInitialValues = (addressList, address) => {
    if (!address) {
      return {
        primary: addressList && addressList.size === 0,
        country: 'US',
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
    const { verifyAddressAction } = this.props;
    const formattedFormPayload = Object.assign(this.initialValues, payload);
    const formattedPayload = this.formatPayload(formattedFormPayload);

    verifyAddressAction(formattedPayload);
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

  render() {
    const {
      addressResponse,
      addressList,
      address,
      labels,
      backToAddressBookClick,
      isEdit,
    } = this.props;
    this.initialValues = this.getInitialValues(addressList, address);
    const addressListSize = addressList && addressList.size;
    const isMakeDefaultDisabled = address ? addressListSize === 1 : addressListSize === 0;
    return (
      <AddAddressComponent
        addressResponse={addressResponse}
        submitAddressFormAction={this.submitAddressForm}
        verifyAddressAction={this.verifyAddress}
        isMakeDefaultDisabled={isMakeDefaultDisabled}
        initialValues={this.initialValues}
        isEdit={isEdit}
        addressFormLabels={labels.addressFormLabels}
        backToAddressBookClick={backToAddressBookClick}
      />
    );
  }
}

AddEditAddressContainer.defaultProps = {
  addressResponse: {},
  address: null,
  backToAddressBookClick: () => {},
};

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
