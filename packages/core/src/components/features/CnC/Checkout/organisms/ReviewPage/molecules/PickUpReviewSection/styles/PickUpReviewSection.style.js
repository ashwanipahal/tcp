import { css } from 'styled-components';

const styles = css`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};

  .row-one {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
  .row-two {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }

  .pickup-store-details-container {
    display: flex;
    flex-direction: 'row';
  }
  .pickupTitle {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  }
`;

export default styles;
