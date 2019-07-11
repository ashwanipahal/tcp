import { css } from 'styled-components';

const styles = css`
  .cardList__heading {
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
  }
  .cardList__col {
    margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }
  .cardList__ccAddCta {
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
  }
`;

export default styles;
