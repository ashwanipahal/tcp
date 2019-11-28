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
  showCondensedHeader: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}),
};

const defaultProps = {
  component: null,
  variation: 'primary',
  color: null,
  openState: false,
  closeOverlay: () => {},
  labels: {},
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
  showCondensedHeader,
  labels,
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
      showCondensedHeader={showCondensedHeader}
      labels={labels}
    />
  ) : null;
};

OverlayModal.propTypes = propTypes;
OverlayModal.defaultProps = defaultProps;

export default OverlayModal;
