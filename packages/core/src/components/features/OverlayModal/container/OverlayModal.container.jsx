import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComponent, getVariation, getColor, getOpenState } from './OverlayModal.selectors';
import OverlayModalComponent from '../views/OverlayModal.view';
import { closeOverlayModal } from './OverlayModal.actions';

const propTypes = {
  component: PropTypes.string,
  variation: PropTypes.string,
  color: PropTypes.string,
  openState: PropTypes.bool,
  closeOverlay: PropTypes.func,
};

const defaultProps = {
  component: null,
  variation: 'primary',
  color: null,
  openState: false,
  closeOverlay: () => {},
};

export const OverlayModal = ({ component, variation, color, openState, closeOverlay }) => {
  return (
    <OverlayModalComponent
      component={component}
      variation={variation}
      color={color}
      openState={openState}
      closeOverlay={closeOverlay}
    />
  );
};

const mapStateToProps = state => {
  return {
    component: getComponent(state),
    variation: getVariation(state),
    color: getColor(state),
    openState: getOpenState(state),
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
