import React from 'react';
import styled from 'styled-components';
import tag from 'clean-tag';
import PropTypes from 'prop-types';
import {space,
  lineHeight,
  fontSize,
  fontStyle,
  size,
  color,
  colorStyle,
  textStyle,
  fontFamily,
  fontWeight,
  letterSpacing,
  borderRadius} from 'styled-system';

const StyledDynamicComponent = styled(tag)`
${space}
${fontSize}
${fontStyle}
${color}
${size}
${colorStyle}
${textStyle}
${lineHeight}
${letterSpacing}
${fontFamily}
${fontWeight}
${borderRadius}
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
