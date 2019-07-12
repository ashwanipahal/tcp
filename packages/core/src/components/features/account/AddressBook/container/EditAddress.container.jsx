import React from 'react';
import { connect } from 'react-redux';
import { editAddressReq } from './EditAddress.actions';
import AddAddressComponent from '../../views/AddAddress.view';
import {
  getAddAddressResponse,
  getUserEmail,
  getAddressById,
} from '../AddAddress/AddAddress.selectors';
import { verifyAddress } from '../../../AddressVerification/container/AddressVerification.actions';
import { getAddressListState } from '../AddressBook.selectors';

// @flow

type Props = {
  submitAddressFormAction: any,
  verifyAddressAction: ({}) => void,
  addAddressResponse: any,
  userEmail: string,
  addressList: List<{}>,
  address: object,
};

export const AddaddressContainer = ({
  submitAddressFormAction,
  verifyAddressAction,
  addAddressResponse,
  userEmail,
  addressList,
  address,
}: Props) => {
  const {
    firstName,
    lastName,
    addressLine,
    city,
    state,
    zipCode,
    country,
    phone1,
    primary,
    nickName,
  } = address;
  return (
    <AddAddressComponent
      addressResponse={addAddressResponse}
      submitAddressFormAction={submitAddressFormAction}
      verifyAddressAction={verifyAddressAction}
      userEmail={userEmail}
      isMakeDefaultDisabled={addressList.size === 1}
      initialValues={{
        firstName,
        lastName,
        addressLine1: addressLine[0],
        addressLine2: addressLine[1],
        city,
        state,
        zipCode,
        country,
        phoneNumber: phone1,
        primary,
        nickName,
      }}
    />
  );
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    submitAddressFormAction: (payload: {}) => {
      dispatch(editAddressReq(payload));
    },
    verifyAddressAction: (payload: {}) => {
      dispatch(verifyAddress(payload));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    addAddressResponse: getAddAddressResponse(state),
    userEmail: getUserEmail(state),
    addressList: getAddressListState(state),
    address: getAddressById(state, ownProps),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddaddressContainer);
