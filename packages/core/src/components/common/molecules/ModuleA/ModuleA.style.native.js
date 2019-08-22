import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const HeaderWrapper = styled.View`
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const PromoTextBannerWrapper = styled.View``;

export const ButtonContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;
export const ContainerView = styled.View``;
export const Border = styled.View`
  height: 1px;
  background: ${props =>
    props.background === 'text'
      ? props.theme.colors.BUTTON.WHITE.BORDER
      : props.theme.colors.BUTTON.WHITE.TEXT};
`;

export const DivImageCTAContainer = styled.View`
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const ButtonLinksContainer = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  background: #003057;
`;

export default {
  Container,
  HeaderWrapper,
  PromoTextBannerWrapper,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
  ButtonLinksContainer,
};
