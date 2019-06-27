// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  addAddressReq,
  addAddressSuccess,
  addAddressFail,
} from '../container/AddAddress/AddAddress.actions';
import AddAddress from '../views/AddAddress.view';

/**
 * @function AddAddressContainer The AddressBook container is responsible for fetching the user addresses
 * and paint the right panel for addresses
 */

type Props = {
  onSubmit: (SyntheticEvent<>, Object) => void,
};

const AddaddressContainer = ({ onSubmit }: Props) => {
  return <AddAddress onSubmit={onSubmit} />;
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: payload => {
      dispatch(addAddressReq(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    loginInfo: state.LoginPageReducer.loginInfo,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddaddressContainer);
