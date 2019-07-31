import React from 'react';
import { css } from 'styled-components';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';

const CloseButtonStyle = css`
  background: transparent url('/static/images/modal-close.svg') no-repeat 0 0;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 15px;
  height: 15px;
  width: 15px;
`;

const ModalCloseIcon = ({ className, closeFunc, closeIconDataLocator }) => (
  <button
    aria-label="close"
    className={className}
    onClick={e => closeFunc(e)}
    data-locator={closeIconDataLocator}
  />
);

ModalCloseIcon.propTypes = {
  className: PropTypes.string.isRequired,
  closeFunc: PropTypes.func.isRequired,
  closeIconDataLocator: PropTypes.string,
};

ModalCloseIcon.defaultProps = {
  closeIconDataLocator: 'close',
};

export default withStyles(ModalCloseIcon, CloseButtonStyle);
export { ModalCloseIcon as ModalCloseIconVanilla };
