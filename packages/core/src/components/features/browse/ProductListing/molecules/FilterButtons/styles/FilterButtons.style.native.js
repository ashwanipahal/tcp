import styled, { css } from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const styles = css``;

export { styles, Container };
