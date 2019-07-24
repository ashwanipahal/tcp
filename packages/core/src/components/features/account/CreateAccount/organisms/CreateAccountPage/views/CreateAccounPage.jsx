import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/CreateAccounPage.style';
import CreateAccountForm from '../../../molecules/CreateAccountForm';

// @flow
type Props = {
  className: string,
  createAccountAction: Function,
  labels: object,
};

const CreateAccounPage = (props: Props) => {
  const { className, createAccountAction, labels } = props;
  return (
    <div className={className}>
      <CreateAccountForm
        className={className}
        createAccountAction={createAccountAction}
        labels={labels}
      />
    </div>
  );
};

export default withStyles(CreateAccounPage, styles);
export { CreateAccounPage as CreateAccounPageVanilla };
