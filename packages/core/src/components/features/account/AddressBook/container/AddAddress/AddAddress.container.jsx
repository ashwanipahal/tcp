// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq, updateAddressReq } from './AddAddress.actions';
import AddAddress from '../../views/AddAddress.view';
import showMessageForAddAddress from './AddAddress.selectors';

type Props = {
  submitAddAddressForm: any,
  addAddressNotification: any,
  AddAddresslabels: any,
  backToAddressBookClick: any,
  initialValues: any,
  isEditingAddress: boolean,
  submitUpdateAddressForm: () => void,
};

export const AddaddressContainer = ({
  submitAddAddressForm,
  addAddressNotification,
  AddAddresslabels,
  backToAddressBookClick,
  initialValues,
  isEditingAddress,
  submitUpdateAddressForm,
}: Props) => {
  return (
    <AddAddress
      backToAddressBookClick={backToAddressBookClick}
      AddAddresslabels={AddAddresslabels}
      addAddressNotification={addAddressNotification}
      submitAddAddressForm={!isEditingAddress ? submitAddAddressForm : submitUpdateAddressForm}
      initialValues={initialValues}
      isEditingAddress={isEditingAddress}
    />
  );
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    submitAddAddressForm: (payload: Object) => {
      dispatch(addAddressReq(payload));
    },
    submitUpdateAddressForm: (payload: Object) => {
      dispatch(updateAddressReq(payload));
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
