import { css } from 'styled-components';

const styles = css`
  .creditCardList__heading {
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .creditCardList__ccAddCta {
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
  }
  .giftcardList__col {
    width: 100%;
  }
`;

export default styles;
