import styled from 'styled-components/native';

export const Container = styled.View``;

export const HeaderWrapper = styled.View`
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const PromoTextBannerWrapper = styled.View``;
export const ButtonContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;
export const ContainerView = styled.View``;

export default {
  Container,
  HeaderWrapper,
  PromoTextBannerWrapper,
  ButtonContainer,
  ContainerView,
};
