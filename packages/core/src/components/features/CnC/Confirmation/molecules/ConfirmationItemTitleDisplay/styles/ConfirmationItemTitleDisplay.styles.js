import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  .confirmation-fullfillment-type {
    display: flex;
    justify-content: center;
    align-items: baseline;
  }
  .confirmation-fullfillment-details {
    margin-left: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .confirmation-fullfillment-store {
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }
`;

export default styles;
