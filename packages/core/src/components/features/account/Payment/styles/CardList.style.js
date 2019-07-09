import { css } from 'styled-components';

const styles = css`
  .creditCardList__heading {
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .creditCardList__ccAddCta {
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
  }
`;

export default styles;
