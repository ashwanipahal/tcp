import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const PromoContainer = styled.View`
  margin-top: 10px;
`;

export default {
  Container,
  PromoContainer,
};
