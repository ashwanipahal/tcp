import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq, updateAddressReq } from './AddEditAddress.actions';
import AddAddressComponent from '../../common/organism/AddressForm';
import { getAddressResponse, getUserEmail, getAddressById } from './AddEditAddress.selectors';
import { verifyAddress } from '../../AddressVerification/container/AddressVerification.actions';
import { getAddressListState } from '../../AddressBook/container/AddressBook.selectors';

// @flow

type Props = {
  submitEditAddressFormAction: ({}) => void,
  submitNewAddressFormAction: ({}) => void,
  verifyAddressAction: ({}) => void,
  addressResponse?: object,
  userEmail: string,
  addressList: List<{}>,
  address?: object,
};

export class AddEditAddressContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  getInitialValues = (addressList, address) => {
    if (!address) {
      return {
        primary: addressList.size === 0,
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
      primary: address.primary,
      nickName: address.nickName,
    };
  };

  verifyAddress = payload => {
    const { verifyAddressAction } = this.props;
    const formattedFormPayload = Object.assign(this.initialValues, payload);
    const formattedPayload = this.formatPayload(formattedFormPayload);

    verifyAddressAction(formattedPayload);
  };

  submitAddressForm = payload => {
    const { submitEditAddressFormAction, submitNewAddressFormAction, address } = this.props;
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
    const { verifyAddressAction, addressResponse, userEmail, addressList, address } = this.props;
    this.initialValues = this.getInitialValues(addressList, address);
    const isMakeDefaultDisabled = addressList.size === 1;
    return (
      <AddAddressComponent
        addressResponse={addressResponse}
        submitAddressFormAction={this.submitAddressForm}
        verifyAddressAction={verifyAddressAction}
        userEmail={userEmail}
        isMakeDefaultDisabled={isMakeDefaultDisabled}
        initialValues={this.initialValues}
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
