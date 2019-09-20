import styled, { css } from 'styled-components';

const styles = css`
  margin-bottom: 33px;
`;

export const SelectedValueContainer = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

export const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

export const errorIconStyle = {
  height: 13,
  width: 13,
  marginRight: 5,
};

export default styles;
