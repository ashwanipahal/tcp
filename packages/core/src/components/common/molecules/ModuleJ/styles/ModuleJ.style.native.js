import styled from 'styled-components/native';

import { Image } from '../../../atoms';

export const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const ImageSlidesWrapper = styled.View`
  height: 142px;
`;

export const ImageSlideWrapper = styled.View`
  flex-direction: row;
`;

export const StyledImage = styled(Image)`
  /* stylelint-disable-next-line */
  resize-mode: contain;
`;

export const ImageItemWrapper = styled.View`
  flex-direction: row;
  margin: ${props =>
    props.isFullMargin
      ? `${props.theme.spacing.ELEM_SPACING.MED}`
      : `${props.theme.spacing.ELEM_SPACING.MED} ${props.theme.spacing.ELEM_SPACING.XS}`};
`;

export const ButtonContainer = styled.View`
  align-items: center;
`;

export const Wrapper = styled.View`
  width: 100%;
`;

export const PromoContainer = styled.View`
  ${props =>
    props.layout === 'alt'
      ? `margin-top: ${props.theme.spacing.LAYOUT_SPACING.XS}; `
      : `margin-top: ${props.theme.spacing.ELEM_SPACING.XXS};`};
`;

export const HeaderContainer = styled.View`
  ${props =>
    props.layout === 'alt'
      ? ` `
      : `background:white;
 margin-left:62px;
 margin-right:62px;`};
`;

export const Border = styled.View`
  width: 100%;
  height: 1px;
  top: 8px;
  position: absolute;
  ${props =>
    props.layout === 'alt' ? `` : `border: 1px solid ${props.theme.colorPalette.yellow[500]};`};
`;

export const ImageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.APP_LAYOUT_SPACING.XS};
  ${props => (props.layout === 'alt' ? `display:none ` : ``)};
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${props =>
    props.layout === 'alt' ? props.theme.colorPalette.gray[500] : props.theme.colorPalette.white};
  padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  padding-bottom: ${props =>
    props.layout === 'alt'
      ? props.theme.spacing.LAYOUT_SPACING.SM
      : props.theme.spacing.ELEM_SPACING.XXS};
`;

export const ProductTabListContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
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
};
