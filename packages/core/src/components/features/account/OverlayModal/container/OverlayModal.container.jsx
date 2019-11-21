import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getComponent,
  getVariation,
  getColor,
  getOpenState,
  getProps,
  getLoginLabels,
} from './OverlayModal.selectors';
import OverlayModalComponent from '../views/OverlayModal.view';
import { closeOverlayModal } from './OverlayModal.actions';
import { isPlccUser, getUserLoggedInState } from '../../User/container/User.selectors';

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
  labels: PropTypes.shape({}),
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
  labels: {},
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
  labels,
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
      labels={labels}
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
    labels: getLoginLabels(state),
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
