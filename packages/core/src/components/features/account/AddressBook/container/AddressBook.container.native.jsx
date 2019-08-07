import React from 'react';
import AddressBookComponent from '../views/AddressBook.view';
import labels from './AddressBook.labels';

const AddressBookContainer = () => {
  return <AddressBookComponent labels={labels} />;
};

export default AddressBookContainer;
