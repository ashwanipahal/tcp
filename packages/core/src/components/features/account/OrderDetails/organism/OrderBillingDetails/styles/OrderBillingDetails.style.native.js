import styled from 'styled-components/native';

const ImageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

const ImageStyle = styled.Image`
  width: 47px;
  height: 30px;
  border: 1px solid ${props => props.theme.colorPalette.gray[500]};
  border-radius: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export { ImageWrapper, ImageStyle };
