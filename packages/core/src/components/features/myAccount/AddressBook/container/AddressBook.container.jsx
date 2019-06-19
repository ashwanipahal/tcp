import React from 'react';
import { connect } from 'react-redux';
import MyAccountLayout from '../../MyAccountLayoutContainer/views/MyAccountLayout.view';
import AddressBook from '../views/AddressBook.view';
import getUserAddressesSelector from './AddressBook.storeview';
import { getUserAddresses } from './AddressBook.actions';

class AddressBookContainer extends React.Component {
  componentDidMount() {
    this.props.getAddresses();
  }

  render() {
    const { userAddresses } = this.props;
    return <MyAccountLayout mainContent={AddressBook} userAddresses={userAddresses} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAddresses: () => {
      dispatch(getUserAddresses());
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
