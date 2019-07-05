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

const ModalCloseIcon = ({ className, closeFunc }) => (
  <button className={className} onClick={e => closeFunc(e)} />
);

ModalCloseIcon.propTypes = {
  className: PropTypes.string.isRequired,
  closeFunc: PropTypes.func.isRequired,
};

export default withStyles(ModalCloseIcon, CloseButtonStyle);
export { ModalCloseIcon as ModalCloseIconVanilla };
