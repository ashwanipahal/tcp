import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq, updateAddressReq } from './AddEditAddress.actions';
import AddAddressComponent from '../views/AddEditAddress.view';
import { getAddressResponse, getUserEmail, getAddressById } from './AddEditAddress.selectors';
import { verifyAddress } from '../../AddressVerification/container/AddressVerification.actions';
import { getAddressListState } from '../../AddressBook/container/AddressBook.selectors';
import utils from '../../../../../utils';

// @flow

type Props = {
  submitEditAddressFormAction: ({}) => void,
  submitNewAddressFormAction: ({}) => void,
  verifyAddressAction: ({}) => void,
  addressResponse?: object,
  userEmail: string,
  addressList: List<{}>,
  address?: object,
  labels: object,
};

export class AddEditAddressContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  componentDidUpdate() {
    const { addressResponse } = this.props;
    const isSuccess = addressResponse && addressResponse.get('addressId');
    if (isSuccess) {
      this.backToAddressBookClick();
    }
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

  backToAddressBookClick = () => {
    utils.routerPush('/account?id=address-book', '/account/address-book');
  };

  render() {
    const { addressResponse, addressList, address, labels } = this.props;
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
        backToAddressBookClick={this.backToAddressBookClick}
        isEdit={!!address}
        labels={labels}
      />
    );
  }
}

AddEditAddressContainer.defaultProps = {
  addressResponse: {},
  address: null,
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    submitNewAddressFormAction: (payload: {}) => {
      dispatch(addAddressReq(payload));
    },
    submitEditAddressFormAction: (payload: {}) => {
      dispatch(updateAddressReq(payload));
    },
    verifyAddressAction: (payload: {}) => {
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditAddressContainer);
