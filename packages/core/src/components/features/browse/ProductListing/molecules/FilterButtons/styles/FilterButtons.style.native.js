import styled, { css } from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  max-width: 100%;
`;

const styles = css``;

export { styles, Container };
