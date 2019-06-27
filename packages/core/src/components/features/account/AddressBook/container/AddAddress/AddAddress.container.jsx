import React from 'react';
import { connect } from 'react-redux';
import MyAccountLayout from '../../../MyAccountLayoutContainer/container/MyAccountLayout.container';
import AddressBook from '../views/AddressBook.view';
import getUserAddressesSelector from './AddressBook.storeview';
import { addAddressReq } from './AddAddress.actions';

class AddressBookContainer extends React.Component {
  componentDidMount() {
    this.props.getAddresses();
  }

  render() {
    const { submitAddAddress } = this.props;
    return <MyAccountLayout mainContent={AddressBook} submitAddAddress={submitAddAddress} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitAddAddress: payload => {
      dispatch(addAddressReq(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    userAddresses: getUserAddressesSelector(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
