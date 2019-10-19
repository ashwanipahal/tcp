import { css } from 'styled-components';

const Styles = css`
  .links-wrapper {
    display: flex;
    justify-content: center;
    padding: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
    @media ${props => props.theme.mediaQuery.large} {
      padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
    }
  }
  .links-container {
    display: flex;
  }
`;

export default Styles;
