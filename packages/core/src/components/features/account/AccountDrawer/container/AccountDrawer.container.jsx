import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountDrawerView from '../views/AccountDrawerView';
import labels from '../AccountDrawer.labels';
import {
  openOverlayModal,
  closeOverlayModal,
} from '../../OverlayModal/container/OverlayModal.actions';
import { getUserFullName, isPlccUser } from '../../User/container/User.selectors';
import { getGlobalLabels } from '../../Account/container/Account.selectors';

export const AccountDrawerContainer = ({
  className,
  plccUser,
  userName,
  closedOverlay,
  globalLabels,
}) => {
  return (
    <AccountDrawerView
      className={className}
      labels={labels}
      closedOverlay={closedOverlay}
      userName={userName}
      plccUser={plccUser}
      globalLabels={globalLabels}
    />
  );
};

export const mapStateToProps = state => {
  return {
    userName: getUserFullName(state),
    plccUser: isPlccUser(state),
    globalLabels: getGlobalLabels(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
    closedOverlay: payload => {
      dispatch(closeOverlayModal(payload));
    },
  };
};

AccountDrawerContainer.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  userName: PropTypes.string,
  closedOverlay: PropTypes.func.isRequired,
  plccUser: PropTypes.bool,
  globalLabels: PropTypes.shape({}),
};

AccountDrawerContainer.defaultProps = {
  className: '',
  labels: {
    CREATE_ACC_MY_FAV: 'My Favorites',
    CREATE_ACC_MY_PLACE_REWARDS_CC: 'My Place Rewards Credit Card',
    CREATE_ACC_WALLET: 'Wallet',
    CREATE_ACC_ORDERS: 'Orders',
    CREATE_ACC_SIGN_OUT: 'Sign Out',
  },
  userName: '',
  plccUser: false,
  globalLabels: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDrawerContainer);
