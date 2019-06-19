import React from 'react';
import MyAccountLayout from '../../MyAccountLayoutContainer';
import MyWallet from '../views/MyWallet.view';

const MyWalletContainer = () => {
  return <MyAccountLayout mainContent={MyWallet} />;
};

export default MyWalletContainer;
