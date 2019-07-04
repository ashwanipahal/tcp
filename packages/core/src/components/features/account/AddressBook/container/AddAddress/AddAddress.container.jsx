// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq } from './AddAddress.actions';
import AddAddress from '../../views/AddAddress.view';
import showMessageForAddAddress from './AddAddress.selectors';
import AddAddresslabels from './AddAddress.labels';

type Props = {
  submitAddAddressForm: any,
  addAddressNotification: any,
};

export const AddaddressContainer = ({
  submitAddAddressForm,
  addAddressNotification,
}: Props) => {
  return (
    <AddAddress
      AddAddresslabels={AddAddresslabels}
      addAddressNotification={addAddressNotification}
      submitAddAddressForm={submitAddAddressForm}
    />
  );
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    submitAddAddressForm: payload => {
      dispatch(addAddressReq(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    addAddressNotification: showMessageForAddAddress(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddaddressContainer);
