import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const Title = styled.h2`
  margin: 0px;
  font-size: ${props => props.theme.fonts.fontSize.heading.large.h2}px;
  font-family: ${props => props.theme.fonts.primaryFontBlackFamily};
`;

const ModalTitle = ({ title }) => <Title>{title}</Title>;

ModalTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ModalTitle;
