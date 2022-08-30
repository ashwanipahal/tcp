import { css } from 'styled-components';

const styles = css`
  position: relative;

  @media ${props => props.theme.mediaQuery.medium} {
    .cancelCta {
      order: 1;
      margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
    }

    .submitCta {
      order: 2;
      margin-bottom: 0;
    }
  }
`;

export default styles;
