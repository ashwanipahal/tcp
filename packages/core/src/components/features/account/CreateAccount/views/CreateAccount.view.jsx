// import React from 'react';

// const AccountOverview = () => {
//   return <div>This is aaaaa</div>;
// };

// export default AccountOverview;

import React from 'react';
import CreateAccounPage from '../organisms/CreateAccountPage';

// @flow
type Props = {
  className: string,
  createAccountAction: Function,
  labels: object,
};

const CreateAccount = ({ className, createAccountAction, labels }: Props) => {
  return (
    <CreateAccounPage
      className={className}
      createAccountAction={createAccountAction}
      labels={labels}
    />
  );
};

export default CreateAccount;
