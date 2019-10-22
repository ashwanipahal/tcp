import { css } from 'styled-components';

const styles = css`
  .total-value {
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
    border-top: 1px solid ${props => props.theme.colorPalette.gray[700]};
  }
`;

export default styles;
