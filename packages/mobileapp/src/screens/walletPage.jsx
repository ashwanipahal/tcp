import React from 'react';
import WalletContainer from '@tcp/core/src/components/features/account/Wallet/container/Wallet.container';

const WalletPage = props => {
  return (
    <React.Fragment>
      <WalletContainer {...props} />
    </React.Fragment>
  );
};

export default WalletPage;
