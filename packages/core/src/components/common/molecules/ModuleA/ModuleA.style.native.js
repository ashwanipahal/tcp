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

export const PromoBannerWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

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
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  background: #003057;
`;

export const PromoRibbonWrapperRight = styled.View`
  width: 174px;
  height: 54px;
  position: absolute;
  bottom: 10px;
  right: 0;
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export const PromoRibbonWrapperLeft = styled.View`
  width: 174px;
  height: 54px;
  position: absolute;
  bottom: 10px;
  left: 0;
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export const MessageContainer = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  position: absolute;
  right: 0;
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export const HeaderView = styled.View`
  justify-content: center;
  align-items: center;
  width: 65%;
`;

/**
 * RibbonBanner height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per deign.
 */

export const RibbonBannerHeight = '200px';
export const RibbonBannerWidth = '54px';

export default {
  Container,
  HeaderWrapper,
  PromoTextBannerWrapper,
  ButtonContainer,
  Border,
  ContainerView,
  DivImageCTAContainer,
  ButtonLinksContainer,
  PromoRibbonWrapperLeft,
  PromoRibbonWrapperRight,
  MessageContainer,
  RibbonBannerHeight,
  RibbonBannerWidth,
  PromoBannerWrapper,
  HeaderView,
};
