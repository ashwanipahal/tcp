import styled from 'styled-components/native';

export const VenmoBannerContainer = styled.View`
  background-color: ${props => props.theme.colorPalette.gray[300]};
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const VenmoBannerTextContainer = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;
