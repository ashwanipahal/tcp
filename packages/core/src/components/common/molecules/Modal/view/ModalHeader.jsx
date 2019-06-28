import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ModalCloseIcon from './ModalCloseIcon';

const Title = styled.h2`
  margin: 0px;
  font-size: ${props => props.theme.fonts.fontSize.heading.large.h2}px;
  font-weight: ${props => props.theme.fonts.fontWeight.black};
`;

const ModalHeader = ({ closeFunc, title }) => (
  <Fragment>
    <ModalCloseIcon closeFunc={closeFunc} />
    <Title>{title}</Title>
  </Fragment>
);

ModalHeader.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ModalHeader;
