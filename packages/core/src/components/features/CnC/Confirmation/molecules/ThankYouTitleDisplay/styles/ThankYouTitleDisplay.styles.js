import { css } from 'styled-components';

const styles = css`
  padding: 0 ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
  @media ${props => props.theme.mediaQuery.medium} {
    padding: 0;
  }
  .thank-you-heading {
    margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
    @media ${props => props.theme.mediaQuery.large} {
      margin: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
        ${props => props.theme.spacing.ELEM_SPACING.MED};
    }
  }
`;

export default styles;
