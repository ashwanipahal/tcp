// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq } from './AddAddress/AddAddress.actions';
import AddAddress from '../views/AddAddress.view';
import { showMessageForAddAddress } from './AddAddress/AddAddress.selectors';
import AddAddresslabels from './AddAddress/AddAddress.labels';
/**
 * @function AddAddressContainer The AddressBook container is responsible for fetching the user addresses
 * and paint the right panel for addresses
 */

type Props = {
  submitAddAddressForm: any,
  showMessageForAddAddressMsg: any,
  AddAddresslabels: any,
};

export class AddaddressContainer extends React.Component<Props> {
  render() {
    const { submitAddAddressForm, showMessageForAddAddressMsg, AddAddresslabels } = this.props;
    return (
      <AddAddress
        AddAddresslabels={AddAddresslabels}
        showMessageForAddAddressMsg={showMessageForAddAddressMsg}
        submitAddAddressForm={submitAddAddressForm}
      />
    );
  }
}

// const AddaddressContainer = ({ submitAddAddressForm }: Props) => {
//   return <AddAddress submitAddAddressForm={submitAddAddressForm} />;
// };

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
