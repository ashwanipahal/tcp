import React from 'react';
import styled from 'styled-components';
import tag from 'clean-tag';
import PropTypes from 'prop-types';
import { fontSize, fontStyle, size, color } from 'styled-system';

const StyledDynamicComponent = styled(tag)`
  ${fontSize}
  ${fontStyle}
  ${color}
  ${size}
`;

const DynamicComponent = ({ tag = 'div', children, ...props }) => {
  const WithComponent = StyledDynamicComponent.withComponent(tag);
  return <WithComponent {...props}>{children}</WithComponent>;
};

DynamicComponent.propTypes = {
  tag: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default DynamicComponent;
