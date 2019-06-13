// @flow
import React from 'react';
import styled from 'styled-components';

const DynamicComponent = ({ tag = 'div', children, ...props }) => {
  const WithComponent = styled(tag)``.withComponent(tag);
  return <WithComponent {...props}>{children}</WithComponent>;
};

type Props = {
  tag: string,
  children?: string,
};

export default DynamicComponent;
