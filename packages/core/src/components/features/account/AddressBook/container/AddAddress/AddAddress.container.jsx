import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq } from './AddAddress.actions';
import AddAddressComponent from '../../views/AddAddress.view';
import { getAddAddressResponse, getUserEmail } from './AddAddress.selectors';
import AddAddresslabels from './AddAddress.labels';

// @flow

type Props = {
  submitAddAddressFormAction: any,
  addAddressResponse: any,
  userEmail: string,
};

export const AddaddressContainer = ({
  submitAddAddressFormAction,
  addAddressResponse,
  userEmail,
}: Props) => {
  return (
    <AddAddressComponent
      AddAddresslabels={AddAddresslabels}
      addAddressResponse={addAddressResponse}
      submitAddAddressFormAction={submitAddAddressFormAction}
      userEmail={userEmail}
    />
  );
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    submitAddAddressFormAction: (payload: {}) => {
      dispatch(addAddressReq(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    addAddressResponse: getAddAddressResponse(state),
    userEmail: getUserEmail(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddaddressContainer);
