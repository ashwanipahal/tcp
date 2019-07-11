import styled from 'styled-components/native';

export default (WrappedComponent, styles) => styled(WrappedComponent)`
  ${styles};
`;
