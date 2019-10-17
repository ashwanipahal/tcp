import styled from 'styled-components/native';

export const ImageSlidesWrapper = styled.View`
  height: 287px;
`;

export const ImageSlideWrapper = styled.View`
  flex-direction: row;
`;

export const ImageItemWrapper = styled.View`
  flex-direction: row;
  margin: ${props =>
    props.isFullMargin
      ? `${props.theme.spacing.ELEM_SPACING.MED}`
      : `${props.theme.spacing.ELEM_SPACING.MED} ${props.theme.spacing.ELEM_SPACING.XS}`};
`;

export const CarouselContainer = styled.View`
  width: 100%;
  padding-bottom: 16px;
`;
