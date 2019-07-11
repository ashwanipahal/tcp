import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq } from './AddAddress.actions';
import AddAddressComponent from '../../views/AddAddress.view';
import { getAddAddressResponse, getUserEmail } from './AddAddress.selectors';
import { verifyAddress } from '../../../AddressVerification/container/AddressVerification.actions';
import AddAddresslabels from './AddAddress.labels';
import { getAddressListState } from '../AddressBook.selectors';

// @flow

type Props = {
  submitAddAddressFormAction: any,
  verifyAddressAction: ({}) => void,
  addAddressResponse: any,
  userEmail: string,
  addressList: List<{}>,
};

export const AddaddressContainer = ({
  submitAddAddressFormAction,
  verifyAddressAction,
  addAddressResponse,
  userEmail,
  addressList,
}: Props) => {
  return (
    <AddAddressComponent
      AddAddresslabels={AddAddresslabels}
      addAddressResponse={addAddressResponse}
      submitAddAddressFormAction={submitAddAddressFormAction}
      verifyAddressAction={verifyAddressAction}
      addressList={addressList}
      userEmail={userEmail}
    />
  );
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    submitAddAddressFormAction: (payload: {}) => {
      dispatch(addAddressReq(payload));
    },
    verifyAddressAction: (payload: {}) => {
      dispatch(verifyAddress(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    addAddressResponse: getAddAddressResponse(state),
    userEmail: getUserEmail(state),
    addressList: getAddressListState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddaddressContainer);
