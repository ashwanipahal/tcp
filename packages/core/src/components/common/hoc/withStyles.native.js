import styled from 'styled-components/native';

export default (WrappedComponent, styles) => {
  const styledComp = styled(WrappedComponent)`
    ${styles};
  `;
  styledComp.defaultProps = WrappedComponent.defaultProps;
  return styledComp;
};
