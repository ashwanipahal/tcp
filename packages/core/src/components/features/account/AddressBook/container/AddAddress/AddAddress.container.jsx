// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq } from './AddAddress.actions';
import AddAddress from '../../views/AddAddress.view';
import showMessageForAddAddress from './AddAddress.selectors';

type Props = {
  submitAddAddressForm: any,
  addAddressNotification: any,
  AddAddresslabels: any,
  backToAddressBookClick: any,
  initialValues: any,
};

const AddaddressContainer = ({
  submitAddAddressForm,
  addAddressNotification,
  AddAddresslabels,
  backToAddressBookClick,
  initialValues,
}: Props) => {
  return (
    <AddAddress
      backToAddressBookClick={backToAddressBookClick}
      AddAddresslabels={AddAddresslabels}
      addAddressNotification={addAddressNotification}
      submitAddAddressForm={submitAddAddressForm}
      initialValues={initialValues}
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
