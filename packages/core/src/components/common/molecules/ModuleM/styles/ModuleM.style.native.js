import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-bottom: 5px;
`;

export const SecondHeaderContainer = styled.View`
  margin: 0 auto ${props => props.theme.spacing.ELEM_SPACING.SM};
  width: 60%;
`;

export const PromoContainer = styled.View`
  align-items: center;
  background: ${props => props.theme.colorPalette.blue[500]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
`;

export const ButtonTabsContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ButtonContainer = styled.View`
  align-items: center;
`;

export const ImageContainer = styled.View`
  align-items: center;
`;

export default {
  Container,
  HeaderContainer,
  SecondHeaderContainer,
  PromoContainer,
  ButtonTabsContainer,
  ButtonContainer,
  ImageContainer,
};
