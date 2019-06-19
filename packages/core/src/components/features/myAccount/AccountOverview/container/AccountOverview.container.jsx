import React from 'react';
import MyAccountLayout from '../../MyAccountLayoutContainer';
import AccountOverview from '../views/AccountOverview.view';

const AccountOverviewContainer = () => {
  return <MyAccountLayout mainContent={AccountOverview} />;
};

export default AccountOverviewContainer;
