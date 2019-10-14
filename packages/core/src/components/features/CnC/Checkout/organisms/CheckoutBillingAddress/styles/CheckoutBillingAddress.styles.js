import { css } from 'styled-components';

const styles = css`
  .address-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .default-badge {
    height: 13px;
  }
  .margin-right {
    margin-right: auto;
  }
  .address-field {
    height: 75px;
  }
  .dropdown-title {
    font-size: ${props => props.theme.typography.fontSizes.fs10};
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  }
  .customSelectTitle {
    margin-top: 0;
  }
  .billing-address-dropDown {
    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }
  }
  .paymentMethodHeading {
    font-size: ${props => props.theme.typography.fontSizes.fs16};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
  }
`;

export default styles;
