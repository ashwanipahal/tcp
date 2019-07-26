import styled from 'styled-components/native';

const StyledCrossImage = styled.Image`
  width: 15px;
  height: 15px;
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const ImageWrapper = styled.View`
  display: flex;
  flex: 0.2;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
`;

export { StyledCrossImage, ImageWrapper, StyledTouchableOpacity };
