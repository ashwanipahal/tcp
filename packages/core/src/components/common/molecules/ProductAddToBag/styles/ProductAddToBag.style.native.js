import styled, { css } from 'styled-components';

const styles = css`
  margin: 25px 14px 0px;
`;

export const RowViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const dropDownStyle = {
  height: 18,
  width: 48,
  border: 1,
  marginLeft: 8,
};

export const dropDownItemStyle = {
  height: 25,
  color: 'gray.900',
};

export default styles;
