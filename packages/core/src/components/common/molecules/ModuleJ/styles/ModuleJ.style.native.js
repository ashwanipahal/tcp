import styled from 'styled-components/native';

import { Image } from '../../../atoms';

export const Container = styled.View`
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

export default {
  Container,
  ImageItemWrapper,
  ButtonContainer,
  ImageSlidesWrapper,
  ImageSlideWrapper,
  StyledImage,
};
