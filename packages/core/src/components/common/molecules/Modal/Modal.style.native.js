import styled from 'styled-components/native';

const StyledCrossImage = styled.Image`
  width: 15px;
  height: 15px;
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const ImageWrapper = styled.View`
  display: flex;
  flex: 0.1;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  align-items: flex-end;
`;

const SafeAreaViewStyle = styled.SafeAreaView`
  margin-top: 30px;
`;
export { StyledCrossImage, ImageWrapper, StyledTouchableOpacity, SafeAreaViewStyle };
