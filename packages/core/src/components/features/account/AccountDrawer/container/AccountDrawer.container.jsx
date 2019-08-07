import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountDrawerView from '../views/AccountDrawerView';
import labels from '../AccountDrawer.labels';
import { openOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';
import { getUserName } from './AccountDrawer.selector';

export const AccountDrawerContainer = ({ className, userName }) => {
  return <AccountDrawerView className={className} labels={labels} userName={userName} />;
};

export const mapStateToProps = state => {
  return {
    userName: getUserName(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
  };
};

AccountDrawerContainer.propTypes = {
  className: PropTypes.string,
  labels: PropTypes.shape({}),
  userName: PropTypes.string,
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
