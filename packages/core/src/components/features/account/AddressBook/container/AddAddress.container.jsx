// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq } from './AddAddress/AddAddress.actions';
import AddAddress from '../views/AddAddress.view';
import showMessageForAddAddress from './AddAddress/AddAddress.selectors';

type Props = {
  submitAddAddressForm: any,
  showMessageForAddAddressMsg: any,
  AddAddresslabels: any,
};

const AddaddressContainer = ({
  submitAddAddressForm,
  showMessageForAddAddressMsg,
  AddAddresslabels,
}: Props) => {
  return (
    <AddAddress
      AddAddresslabels={AddAddresslabels}
      showMessageForAddAddressMsg={showMessageForAddAddressMsg}
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
    loginInfo: state.LoginPageReducer.loginInfo,
    showMessageForAddAddressMsg: showMessageForAddAddress(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddaddressContainer);
