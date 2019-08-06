import React from 'react';
import { connect } from 'react-redux';
import AccountDrawerView from '../views/AccountDrawerView';
import labels from '../AccountDrawer.labels';
import { openOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';
import { getUserName } from './AccountDrawer.selector';

// @flow
type Props = {
  className: string,
  openOverlay: any,
  userName: any,
};

export const AccountDrawerContainer = ({ className, openOverlay, userName }: Props) => {
  const onAlreadyHaveAnAccountClick = e => {
    e.preventDefault();
    openOverlay({
      component: 'login',
      variation: 'primary',
    });
  };
  return (
    <AccountDrawerView
      className={className}
      labels={labels}
      onAlreadyHaveAnAccountClick={onAlreadyHaveAnAccountClick}
      userName={userName}
    />
  );
};

export const mapStateToProps = state => {
  return {
    userName: getUserName(state),
  };
};

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDrawerContainer);
