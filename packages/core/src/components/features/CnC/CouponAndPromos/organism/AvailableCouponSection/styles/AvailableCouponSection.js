import { css } from 'styled-components';

const styles = css`
  .available_coupon {
    background-color: '#f3f3f3';
  }
  .border {
    border-top: 1px solid;
  }
  .create-acc-cta {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
`;

export default styles;
