import styled, { css } from 'styled-components';

export const styles = css``;

export const PlaceHolderView = styled.View`
  height: 150px;
  border: 1px solid black;
  margin: 10px;
  text-align: center;
`;

export const StyledText = styled.Text`
  font-family: 'Nunito-SemiBold';
  position: absolute;
  left: 20;
  top: 23;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

export default { styles, StyledText };
