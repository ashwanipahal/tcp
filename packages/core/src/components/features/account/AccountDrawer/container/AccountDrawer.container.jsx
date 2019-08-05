import React from 'react';
import { connect } from 'react-redux';
import AccountDrawerView from '../views/AccountDrawerView';
import labels from '../AccountDrawer.labels';
import { openOverlayModal } from '../../../OverlayModal/container/OverlayModal.actions';

// @flow
type Props = {
  className: string,
  openOverlay: any,
};

export const AccountDrawerContainer = ({ className, openOverlay }: Props) => {
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
    />
  );
};

// export const mapStateToProps = state => {
//   return {
//   };
// };

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    openOverlay: payload => {
      dispatch(openOverlayModal(payload));
    },
  };
};

export default connect(
  // mapStateToProps,
  mapDispatchToProps
)(AccountDrawerContainer);
