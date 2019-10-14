import { css } from 'styled-components';

const styles = css`
  .row-margin {
    margin: 0 0 ${props => props.theme.spacing.ELEM_SPACING.XS} 0;
  }
  .items-total {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[500]};
  }
  .total-value {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
