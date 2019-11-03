import { css } from 'styled-components';

const Styles = css`
  .links-wrapper {
    display: flex;
    justify-content: center;
    padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
    @media ${props => props.theme.mediaQuery.large} {
      padding-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
  .links-container {
    display: flex;
    .learnSymbolWrapper {
      > div {
        display: inline;
      }
    }
  }
`;

export default Styles;
