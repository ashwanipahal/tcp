import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const PromoContainer = styled.View`
  margin-top: 10px;
`;

export const HeaderContainer = styled.View`
  margin-top: 10px;
  align-items: center;
`;

export const ImageContainer = styled.View`
  margin-top: 32px;
`;

export const ButtonContainer = styled.View`
  margin: 32px;
`;

export default {
  Container,
  PromoContainer,
  ImageContainer,
  ButtonContainer,
};
