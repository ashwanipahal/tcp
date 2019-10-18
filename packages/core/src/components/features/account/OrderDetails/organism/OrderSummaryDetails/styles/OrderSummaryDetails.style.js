import { css } from 'styled-components';

const styles = css`
  .items-total {
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    border-bottom: 1px solid ${props => props.theme.colorPalette.gray[700]};
  }
  .total-value {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
