import styled, { css } from 'styled-components';

const styles = css`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export const RowViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export default styles;
