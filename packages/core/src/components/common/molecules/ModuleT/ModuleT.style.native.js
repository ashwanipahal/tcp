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
  padding-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
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
  DivImageCTAContainer,
  ButtonLinksContainer,
};
