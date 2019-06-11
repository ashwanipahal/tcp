// @flow
import React from 'react';
import styled from 'styled-components';
import tag from 'clean-tag';

const DynamicComponent = ({ tag = 'div', children, ...props }) => {
  const WithComponent = styled(tag)``.withComponent(tag);
  return <WithComponent {...props}>{children}</WithComponent>;
};

type Props = {
  tag: number,
  children?: string,
};

export default DynamicComponent;
