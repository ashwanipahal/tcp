import styled, { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const RowViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
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
