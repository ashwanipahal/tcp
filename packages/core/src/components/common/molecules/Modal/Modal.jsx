/** @module Modal
 *  @summary Wrapper component for react-modal.
 *  Accepts modal content as children and
 *  Other properties of modal to funtion.
 */

import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

ReactModal.setAppElement('#__next');

const Modal = ({ children, ...otherProps }) => {
  return <ReactModal {...otherProps}>{children}</ReactModal>;
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
