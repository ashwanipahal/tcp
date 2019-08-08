import styled, { css } from 'styled-components';

export const styles = css`
  .continue-shopping {
    text-align: center;
    margin: 24px 0;
  }
`;

export const PlaceHolderView = styled.View`
  height: 150px;
  border: 1px solid black;
  margin: 10px;
  text-align: center;
`;

export const StyledText = styled.Text`
  position: absolute;
  left: 20;
  top: 23;
`;

export const AddedToBagWrapper = styled.View`
  display: flex;
  flex: 1;
`;

export default { styles, StyledText, PlaceHolderView, AddedToBagWrapper };
