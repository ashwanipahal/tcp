import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .shippingAddressTitle {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .addressStyle {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }
`;

export default styles;
