import styled from 'styled-components/native';

const StyledCrossImage = styled.Image`
  width: 15px;
  height: 15px;
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const ImageWrapper = styled.View`
  display: flex;
  flex: 0.3;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
`;

const ModalHeadingWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.LRG};
  border-bottom-width: 3px;
  border-bottom-color: ${props => props.theme.colorPalette.black};
  padding-bottom: ${props => props.theme.spacing.ELEM_SPACING[props.paddingBottom || 'MED']};
`;

export { StyledCrossImage, ImageWrapper, StyledTouchableOpacity, ModalHeadingWrapper };
