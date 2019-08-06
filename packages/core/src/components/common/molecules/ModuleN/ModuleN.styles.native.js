import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${props =>
    props.background === 'red'
      ? props.theme.colorPalette.secondary.dark
      : props.theme.colorPalette.primary.dark};
`;

export default {
  Container,
};
