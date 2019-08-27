import styled, { css } from 'styled-components/native';

const FormStyle = css`
  width: 100%;
`;

const Container = styled.View`
  width: 100%;
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const PickupError = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
`;

export { FormStyle, Container, PickupError };
