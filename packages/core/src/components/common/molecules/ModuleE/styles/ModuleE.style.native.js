import styled from 'styled-components/native';
import { Anchor, DamImage, Button, BodyCopy } from '../../../atoms';

export const Container = styled.View`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const HeaderWrapper = styled.View`
  align-items: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const PromoTextBannerWrapper = styled.View``;

export const PromoBannerWrapper = styled.View``;

export const ButtonContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
export const ContainerView = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;
export const Border = styled.View`
  height: 0.5px;
  background: ${props =>
    props.background === 'text'
      ? props.theme.colors.BUTTON.WHITE.BORDER
      : props.theme.colorPalette.gray[700]};
`;

export const DivImageCTAContainer = styled.View``;

export const ButtonLinksContainer = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  background: #003057;
`;

export const PromoRibbonWrapper = styled.View`
  width: 174px;
  height: 54px;
  bottom: 10px;
  position: absolute;
  z-index: ${props => props.theme.zindex.zOverlay}
    ${props => (props.viewdirection === 'right' ? ` left:0; ` : '')};
  ${props => (props.viewdirection === 'left' ? `right:0; ` : '')};
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
  width: 100%;
`;

export const EyeBrowContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
`;

export const StyledImage = styled(DamImage)`
  /* stylelint-disable-next-line */
  resize-mode: stretch;
`;

export const StyledAnchor = styled(Anchor)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TopPromoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
`;

export const StyledButton = styled(Button)``;

export const ButtonWrapper = styled.View`
  margin-top: ${props => props.marginTop || '8px'};
`;

export const StyledBodyCopy = styled(BodyCopy)`
  margin-top: ${props => props.marginTop || '1px'};
  margin-bottom: ${props => props.marginBottom || '1px'};
  width: ${props => props.width || '1px'};
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.View`
  ${props => (props.tileIndex % 2 === 0 ? null : `margin-left: 19px`)};
`;

export const PromoAreaWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  height: 67px;
  width: 100%;
`;

export const BorderTopAndBottom = styled.View`
  height: 3px;
  background: ${props => props.theme.colorPalette.gray[500]};
  margin-left: 14px;
  margin-right: 14px;
  ${props => (props.pos === 'bottom' ? `margin-bottom: 24px` : `margin-top: 24px`)};
`;

export const AnchorWrapper = styled.View`
  margin-top: 10px;
  position: absolute;
  margin-bottom: 50px;
  bottom: 0;
`;

export const Wrapper = styled.View`
  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 12px;
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
  MessageContainer,
  PromoBannerWrapper,
  HeaderView,
  PromoRibbonWrapper,
  EyeBrowContainer,
  StyledImage,
  StyledAnchor,
  TopPromoWrapper,
  StyledButton,
  ImageContainer,
  ImageWrapper,
  StyledBodyCopy,
  ButtonWrapper,
  PromoAreaWrapper,
  BorderTopAndBottom,
  AnchorWrapper,
  Wrapper,
};
