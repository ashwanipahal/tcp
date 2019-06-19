// @flow
import React from 'react';
import { connect } from 'react-redux';
import MyAccountLayout from '../../MyAccountLayoutContainer/container/MyAccountLayout.container';
import AddressBook from '../views/AddressBook.view';
import getUserAddressesSelector from './AddressBook.storeview';
import { getUserAddresses } from './AddressBook.actions';

type Props = {
  getAddresses: Function,
  userAddresses: Object,
};

/**
 * @function AddressBookContainer The AddressBook container is responsible for getching the user addresses
 * and paint the right panel for addresses
 * @param {getAddresses} getAddresses function which makes the api call for fetching address
 * @param {userAddresses} userAddresses response from api which contains user address information
 */
class AddressBookContainer extends React.Component<Props> {
  componentDidMount() {
    const { getAddresses } = this.props;
    getAddresses();
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */
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
