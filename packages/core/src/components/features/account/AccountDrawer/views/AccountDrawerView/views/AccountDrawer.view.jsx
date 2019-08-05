import React from 'react';
import PropTypes from 'prop-types';
import AccountDrawerPage from '../../../organisms/AccountDrawerPage';

const AccountDrawerView = ({ className, labels }) => {
  return <AccountDrawerPage className={className} labels={labels} />;
};

AccountDrawerView.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
};

AccountDrawerView.defaultProps = {
  className: '',
  labels: {
    CREATE_ACC_LBL_HIDE: 'hide',
  },
};

export default AccountDrawerView;
