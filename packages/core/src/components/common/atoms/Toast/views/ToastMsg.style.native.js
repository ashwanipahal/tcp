import styled from 'styled-components/native';

const ToastWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;
const ToastText = styled.Text`
  width: 90%;
  color: ${props => props.theme.colors.WHITE};
`;

const ToastCross = styled.Text`
  font-size: ${props => props.theme.typography.fontSizes.fs16};
  width: 10%;
  color: ${props => props.theme.colors.WHITE};
`;

export { ToastWrapper, ToastCross, ToastText };
