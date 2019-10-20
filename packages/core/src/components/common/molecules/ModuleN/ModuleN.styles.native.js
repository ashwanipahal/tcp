import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  background: ${props =>
    props.background === 'red' ? '#f53d3d' : props.theme.colorPalette.primary.dark};
`;
export const PromoTextBannerWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;
export const ButtonContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;
export const ContainerView = styled.View``;
export const Border = styled.View`
  height: 1px;
  background: ${props =>
    props.background === 'red'
      ? props.theme.colorPalette.secondary.dark
      : props.theme.colorPalette.primary.dark};
`;

export const HeaderContainer = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const DivImageCTAContainer = styled.View``;

export default {
  Container,
  PromoTextBannerWrapper,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
  HeaderContainer,
};
