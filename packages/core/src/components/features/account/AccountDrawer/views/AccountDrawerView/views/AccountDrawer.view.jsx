import React from 'react';
import PropTypes from 'prop-types';
import AccountDrawerPage from '../../../organisms/AccountDrawerPage';

const AccountDrawerView = ({ className, labels, userName }) => {
  return <AccountDrawerPage className={className} labels={labels} userName={userName} />;
};

AccountDrawerView.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  userName: PropTypes.string,
};

AccountDrawerView.defaultProps = {
  className: '',
  labels: {
    CREATE_ACC_LBL_HIDE: 'hide',
  },
  userName: '',
};

export default AccountDrawerView;
