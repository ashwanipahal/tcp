import { css } from 'styled-components';

const styles = css``;

export const customHeaderStyle = css`
  .Modal_Heading {
    border-bottom: none;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    font-size: ${props => props.theme.typography.fontSizes.fs22};
    display: none;
    padding-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
    }
  }
`;

export default styles;
