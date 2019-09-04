import styled, { css } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const ModalContainer = styled.View`
  flex: 1;
  background: rgba(26, 26, 26, 0.4);
  width: 100%;
  padding-top: 100;
`;

// margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
const styles = css``;

export { styles, Container, ModalContainer };
