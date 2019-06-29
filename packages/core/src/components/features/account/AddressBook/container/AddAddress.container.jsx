// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addAddressReq, addAddressSuccess, addAddressFail } from './AddAddress/AddAddress.actions';
import {
 
  showMessageForAddAddress,

} from './AddAddress/AddAddress.selectors';
import AddAddress from '../views/AddAddress.view';

/**
 * @function AddAddressContainer The AddressBook container is responsible for fetching the user addresses
 * and paint the right panel for addresses
 */

type Props = {
  onSubmit: (SyntheticEvent<>, Object) => void,
    showMessageForAddAddressMsg: any,
};

export class AddaddressContainer extends React.Component<Props> {
  render() {
    const {
      submitAddAddressForm,
      showMessageForAddAddressMsg,
    } = this.props;
    return (
      <AddAddress showMessageForAddAddressMsg={showMessageForAddAddressMsg}  submitAddAddressForm={submitAddAddressForm} />
    )
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
  debugger
  return {
    loginInfo: state.LoginPageReducer.loginInfo,
    showMessageForAddAddressMsg: showMessageForAddAddress(state),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddaddressContainer);
