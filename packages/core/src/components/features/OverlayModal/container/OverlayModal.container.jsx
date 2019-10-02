import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getComponent,
  getVariation,
  getColor,
  getOpenState,
  getProps,
} from './OverlayModal.selectors';
import OverlayModalComponent from '../views/OverlayModal.view';
import { closeOverlayModal } from './OverlayModal.actions';
import { isPlccUser, getUserLoggedInState } from '../../account/User/container/User.selectors';

const propTypes = {
  component: PropTypes.string,
  variation: PropTypes.string,
  color: PropTypes.string,
  openState: PropTypes.bool,
  closeOverlay: PropTypes.func,
  plccUser: PropTypes.bool.isRequired,
  componentProps: PropTypes.shape({}),
  isLoggedIn: PropTypes.bool,
  showCondensedHeader: PropTypes.bool,
};

const defaultProps = {
  component: null,
  variation: 'primary',
  color: null,
  openState: false,
  closeOverlay: () => {},
  componentProps: {},
  isLoggedIn: false,
  showCondensedHeader: false,
};

export const OverlayModal = ({
  component,
  variation,
  color,
  openState,
  closeOverlay,
  componentProps,
  plccUser,
  isLoggedIn,
  showCondensedHeader,
}) => {
  return (
    <OverlayModalComponent
      component={component}
      variation={variation}
      color={color}
      openState={openState}
      closeOverlay={closeOverlay}
      componentProps={componentProps}
      plccUser={plccUser}
      isLoggedIn={isLoggedIn}
      showCondensedHeader={showCondensedHeader}
    />
  );
};

const mapStateToProps = state => {
  return {
    component: getComponent(state),
    variation: getVariation(state),
    color: getColor(state),
    openState: getOpenState(state),
    componentProps: getProps(state),
    plccUser: isPlccUser(state),
    isLoggedIn: getUserLoggedInState(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    closeOverlay: () => {
      dispatch(closeOverlayModal());
    },
  };
};

OverlayModal.propTypes = propTypes;
OverlayModal.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlayModal);
