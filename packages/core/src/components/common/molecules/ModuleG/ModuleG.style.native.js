import styled from 'styled-components/native';

import { Image, Anchor } from '../../atoms';

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const ImageSlidesWrapper = styled.View`
  height: 200px;
`;

export const ImageSlideWrapper = styled.View`
  flex-direction: row;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: contain;
`;

export const StyledAnchor = styled(Anchor)`
  padding: 16px 10px;
`;

export const ImageItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

export const Wrapper = styled.View`
  width: 100%;
`;

export const PromoContainer = styled.View`
  ${props =>
    props.layout === 'alt'
      ? `margin-top: ${props.theme.spacing.ELEM_SPACING.SM}; `
      : `margin-top: ${props.theme.spacing.ELEM_SPACING.XXS};`};
`;

export const HeaderContainer = styled.View`
  align-items: center;
  ${props =>
    props.layout === 'alt'
      ? ` width:100%;
      `
      : `background:white;
 margin-left:62px;
 margin-right:62px;
 width:70%;
 `};
`;

export const SecondHeaderContainer = styled.View`
  ${props =>
    props.layout === 'alt' ? `margin-bottom: ${props.theme.spacing.ELEM_SPACING.SM};` : ''};
`;

export const ImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  ${props => (props.layout === 'alt' ? `display:none ` : ``)};
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ProductTabListContainer = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

export const MiddleContainer = styled.View`
  margin-left: 105px;
  margin-right: 105px;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
`;

export const Border = styled.View`
  width: 100%;
  height: 0.5px;
  border: 0.5px solid ${props => props.theme.colorPalette.black};
  position: absolute;
  margin-top: 20px;
`;

export const Circle = styled.View`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.theme.colorPalette.gray['900']};
  background: white;
  border-radius: 20;
`;

export const StyledCustomImage = styled(Image)`
  width: 22px;
  height: 22px;
  position: absolute;
  margin: 9px 10px 10px 10px;
`;

/* stylelint-disable-next-line */
export const SHADOW = styled.View`
  /* stylelint-disable-next-line */
  shadow-opacity: 0.3;
  /* stylelint-disable-next-line */
  shadow-radius: 4px;
  /* stylelint-disable-next-line */
  shadow-color: ${props => props.theme.colorPalette.black};
  /* stylelint-disable-next-line */
  shadow-offset: 0px 0px;
  elevation: 4;
  width: 55%;
  height: 520px;
  position: absolute;
  background: ${props => props.theme.colorPalette.white};
  justify-content: center;
  border-color: white;
  border-width: 1;
  margin-top: -12px;
`;

export const ShadowContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export default {
  Container,
  ImageItemWrapper,
  ButtonContainer,
  ImageSlidesWrapper,
  ImageSlideWrapper,
  StyledImage,
  PromoContainer,
  ImageContainer,
  MessageContainer,
  ProductTabListContainer,
  Border,
  Wrapper,
  StyledAnchor,
  MiddleContainer,
  Circle,
  StyledCustomImage,
  SHADOW,
  ShadowContainer,
};
