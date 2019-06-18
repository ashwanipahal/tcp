// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  tag: string,
  children?: Node,
};

const DynamicComponent = ({ tag = 'div', children, ...props }: Props) => {
  const WithComponent = styled(tag)``.withComponent(tag);
  return <WithComponent {...props}>{children}</WithComponent>;
};

DynamicComponent.defaultProps = {
  children: '',
};

export default DynamicComponent;
