import React from 'react';
import PropTypes from 'prop-types';
import OverlayModalComponentMapping from '../container/OverlayModalComponentMapping';
import OverlayModalView from '../organisms/OverlayModalSection';

const propTypes = {
  component: PropTypes.string,
  variation: PropTypes.string,
  color: PropTypes.string,
  openState: PropTypes.bool,
  closeOverlay: PropTypes.func,
  plccUser: PropTypes.bool.isRequired,
  componentProps: PropTypes.shape({}).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const defaultProps = {
  component: null,
  variation: 'primary',
  color: null,
  openState: false,
  closeOverlay: () => {},
};

const OverlayModal = ({
  component,
  variation,
  color,
  openState,
  closeOverlay,
  componentProps,
  plccUser,
  isLoggedIn,
}) => {
  const ModalContent = OverlayModalComponentMapping[component];
  return openState && ModalContent ? (
    <OverlayModalView
      ModalContent={ModalContent}
      component={component}
      variation={variation}
      color={color}
      openState={openState}
      closeOverlay={closeOverlay}
      componentProps={componentProps}
      plccUser={plccUser}
      isLoggedIn={isLoggedIn}
    />
  ) : null;
};

OverlayModal.propTypes = propTypes;
OverlayModal.defaultProps = defaultProps;

export default OverlayModal;
