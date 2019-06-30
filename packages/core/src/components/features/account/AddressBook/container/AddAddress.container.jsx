// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq } from './AddAddress/AddAddress.actions';
import AddAddress from '../views/AddAddress.view';
import showMessageForAddAddress from './AddAddress/AddAddress.selectors';

type Props = {
  submitAddAddressForm: any,
  addAddressNotification: any,
  AddAddresslabels: any,
};

const AddaddressContainer = ({
  submitAddAddressForm,
  addAddressNotification,
  AddAddresslabels,
}: Props) => {
  return (
    <AddAddress
      AddAddresslabels={AddAddresslabels}
      addAddressNotification={addAddressNotification}
      submitAddAddressForm={submitAddAddressForm}
    />
  );
};

function mapDispatchToProps(dispatch) {
  return {
    submitAddAddressForm: payload => {
      dispatch(addAddressReq(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    addAddressNotification: showMessageForAddAddress(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddaddressContainer);
