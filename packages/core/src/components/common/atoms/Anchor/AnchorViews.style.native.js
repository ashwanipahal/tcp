import styled from 'styled-components/native';

export const AnchorView = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const AnchorIcon = styled.Image`
  width: 3px;
  height: 7px;
  margin-top: 2px;
  margin-left: 5px;
`;

export default { AnchorView, AnchorIcon };
