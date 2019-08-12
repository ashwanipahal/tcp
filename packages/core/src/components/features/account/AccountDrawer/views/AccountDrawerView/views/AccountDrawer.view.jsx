import React from 'react';
import PropTypes from 'prop-types';
import AccountDrawerPage from '../../../organisms/AccountDrawerPage';

const AccountDrawerView = ({ className, labels, userName, closedOverlay }) => {
  return (
    <AccountDrawerPage
      className={className}
      labels={labels}
      closedOverlay={closedOverlay}
      userName={userName}
    />
  );
};

AccountDrawerView.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  userName: PropTypes.string,
  closedOverlay: PropTypes.func.isRequired,
};

AccountDrawerView.defaultProps = {
  className: '',
  labels: {
    CREATE_ACC_LBL_HIDE: 'hide',
  },
  userName: '',
};

export default AccountDrawerView;
