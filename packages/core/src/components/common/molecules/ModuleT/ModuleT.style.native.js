import styled from 'styled-components/native';

import { Image } from '../../atoms';

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
  margin: 12px;
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
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const HeaderContainer = styled.View`
  align-items: center;
`;

export const SecondHeaderContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
`;

export const Border = styled.View`
  height: 0.5px;
  background: ${props => props.theme.colorPalette.gray[700]};
`;

export const ButtonLinksContainer = styled.View`
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  background: ${props => props.theme.colorPalette.blue.C900};
`;

export const ImageWrapper = styled.View`
  margin-left: 14px;
  margin-right: 3px;
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
  Border,
  Wrapper,
  ButtonLinksContainer,
  ImageWrapper,
};
