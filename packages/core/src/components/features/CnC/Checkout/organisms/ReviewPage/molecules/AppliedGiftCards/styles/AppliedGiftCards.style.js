import { css } from 'styled-components';

const styles = css`
  .applied-gift-cards {
    display: flex;
  }

  .applied-gift-card {
    border: solid 1px ${props => props.theme.colorPalette.gray[1300]};
    background-color: ${props => props.theme.colorPalette.white};
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }

  .headsup-container {
    padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
  }
`;

export default styles;
