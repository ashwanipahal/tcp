import React from 'react';
import CreateAccounPage from '../organisms/CreateAccountPage';

// @flow
type Props = {
  className: string,
  createAccountAction: Function,
  isIAgreeChecked: string,
  hideShowPwd: string,
  confirmHideShowPwd: string,
  labels: object,
  error: any,
  onAlreadyHaveAnAccountClick: any,
};

const CreateAccount = ({
  className,
  createAccountAction,
  isIAgreeChecked,
  hideShowPwd,
  confirmHideShowPwd,
  labels,
  error,
  onAlreadyHaveAnAccountClick,
}: Props) => {
  return (
    <CreateAccounPage
      className={className}
      createAccountAction={createAccountAction}
      labels={labels}
      isIAgreeChecked={isIAgreeChecked}
      hideShowPwd={hideShowPwd}
      confirmHideShowPwd={confirmHideShowPwd}
      error={error}
      onAlreadyHaveAnAccountClick={onAlreadyHaveAnAccountClick}
    />
  );
};

export default CreateAccount;
