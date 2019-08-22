import styled from 'styled-components/native';

export const Container = styled.View``;

export const HeaderWrapper = styled.View`
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay};
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const PromoTextBannerWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
export const ButtonContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;
export const ContainerView = styled.View``;

export const HeaderView = styled.View`
  align-items: center;
  width: 60%;
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

export default {
  Container,
  HeaderWrapper,
  PromoTextBannerWrapper,
  ButtonContainer,
  ContainerView,
  HeaderView,
  PromoRibbonWrapperRight,
  PromoRibbonWrapperLeft,
  MessageContainer,
};
