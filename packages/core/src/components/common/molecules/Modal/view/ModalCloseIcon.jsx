import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CloseButton = styled.button`
  background: transparent url('/static/images/modal-close.svg') no-repeat 0 0;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 15px;
  height: 15px;
  width: 15px;
`;

const ModalCloseIcon = ({ closeFunc }) => <CloseButton onClick={e => closeFunc(e)} />;

ModalCloseIcon.propTypes = {
  closeFunc: PropTypes.func.isRequired,
};

export default ModalCloseIcon;
