import { css } from 'styled-components';

export default css`
  .link-text {
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
    text-align: center;

    @media ${props => props.theme.mediaQuery.large} {
      margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
    }
    ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
  }
`;
