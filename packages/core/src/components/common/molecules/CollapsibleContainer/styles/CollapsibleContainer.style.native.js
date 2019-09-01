import styled from 'styled-components/native';

const StyledTouchableOpacity = styled.TouchableOpacity`
  height: ${props => (props.height ? props.height : '30px')};
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;

const StyledImageWrapper = styled.View`
  position: absolute;
  right: 10px;
  top: 15px;
`;

const StyledWrapper = styled.View`
  width: 100%;
  justify-content: center;
`;

export { StyledTouchableOpacity, StyledImageWrapper, StyledWrapper };
