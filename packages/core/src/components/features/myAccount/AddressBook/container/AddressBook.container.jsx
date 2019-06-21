// @flow
import React from 'react';
import MyAccountLayout from '../../MyAccountLayoutContainer/container/MyAccountLayout.container';
import AddressBook from '../views/AddressBook.view';

/**
 * @function AddressBookContainer The AddressBook container is responsible for getching the user addresses
 * and paint the right panel for addresses
 */
const AddressBookContainer = () => {
  return <MyAccountLayout mainContent={AddressBook} />;
};

export default AddressBookContainer;
