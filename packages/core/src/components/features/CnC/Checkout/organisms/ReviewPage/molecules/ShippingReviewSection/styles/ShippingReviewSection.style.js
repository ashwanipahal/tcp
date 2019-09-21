import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  .shippingAddressTitle {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .addressStyle {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
  }
  @media ${props => props.theme.mediaQuery.smallMax} {
    .shipping-method-container {
      margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
  }
`;

export default styles;
