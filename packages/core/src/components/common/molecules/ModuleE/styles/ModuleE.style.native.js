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
export const ContainerView = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const Border = styled.View`
  height: 0.5px;
  background: ${props => props.theme.colorPalette.gray[700]};
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

export const StyledImage = styled(DamImage)``;

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

export const StackCTAButtonWrapper = styled.View`
  margin-top: ${props => props.marginTop || '8px'};
`;

export const StyledBodyCopy = styled(BodyCopy)`
  ${props => (props.marginTop ? ` margin-top: ${props.marginTop}` : ``)};
  ${props => (props.marginTop ? ` margin-bottom: ${props.marginBottom}` : ``)};
  ${props => (props.marginTop ? ` width: ${props.width}` : ``)};
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.View`
  ${props => (props.tileIndex % 2 === 0 ? null : `margin-left: 19px`)};
`;

export const PromoAreaWrapper = styled.View`
  ${props =>
    props.type === 'link' ? null : `margin-bottom: ${props.theme.spacing.ELEM_SPACING.SM};`};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
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

export const FloatingButton = styled.View`
  margin-top: 10px;
  position: absolute;
  margin-bottom: 50px;
  bottom: 0;
`;

export const StackCTAWrapper = styled.View`
  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 12px;
`;

export default {
  Container,
  HeaderWrapper,
  Border,
  ContainerView,
  HeaderView,
  EyeBrowContainer,
  StyledImage,
  StyledAnchor,
  TopPromoWrapper,
  StyledButton,
  ImageContainer,
  ImageWrapper,
  StyledBodyCopy,
  StackCTAButtonWrapper,
  PromoAreaWrapper,
  BorderTopAndBottom,
  FloatingButton,
  StackCTAWrapper,
};
