// @flow
import React from 'react';
import AccountOverview from '../views/AccountOverview.view';
import CreateAccountContainer from '../../CreateAccount/container/CreateAccount.container';

/**
 * @function AddressBookContainer The AddressBook container is responsible for fetching the user addresses
 * and paint the right panel for addresses
 */
const AccountOverviewContainer = () => {
  return (
    <div>
      <AccountOverview />
      <CreateAccountContainer />
    </div>
  );
};

export default AccountOverviewContainer;
