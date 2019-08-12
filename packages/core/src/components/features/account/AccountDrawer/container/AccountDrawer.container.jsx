import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountDrawerView from '../views/AccountDrawerView';
import labels from '../AccountDrawer.labels';
import {
  openOverlayModal,
  closeOverlayModal,
} from '../../../OverlayModal/container/OverlayModal.actions';
import { getUserFullName } from '../../LoginPage/container/LoginPage.selectors';

export const AccountDrawerContainer = ({ className, userName, closedOverlay }) => {
  return (
    <AccountDrawerView
      className={className}
      labels={labels}
      closedOverlay={closedOverlay}
      userName={userName}
    />
  );
};

export const mapStateToProps = state => {
  return {
    userName: getUserFullName(state),
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDrawerContainer);
