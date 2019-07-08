import { css } from 'styled-components';

const styles = css`
  border: solid 1px ${props => props.theme.colors.BORDER.NORMAL};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${props =>
    `${props.theme.spacing.ELEM_SPACING.MED} ${props.theme.spacing.ELEM_SPACING.SM} ${
      props.theme.spacing.ELEM_SPACING.MED
    }`};
  height: 100%;

  .addressTile__row--twoCol {
    display: flex;
    justify-content: space-between;
  }

  .addressTile__row {
    display: flex;
    justify-content: flex-end;
    a {
      margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    }
  }
`;

export default styles;
