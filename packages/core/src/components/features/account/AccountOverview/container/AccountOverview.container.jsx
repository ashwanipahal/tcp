// @flow
import React from 'react';
import AccountOverview from '../views/AccountOverview.view';
import RewardsPoints from '../../common/organism/RewardsPoints';

/**
 * @function AddressBookContainer The AddressBook container is responsible for fetching the user addresses
 * and paint the right panel for addresses
 */
const AccountOverviewContainer = () => {
  return (
    <div>
      <AccountOverview />
      <RewardsPoints />
    </div>
  );
};

export default AccountOverviewContainer;
