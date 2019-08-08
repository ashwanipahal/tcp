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

  .moduleN-heading-wrapper {
    display: inline-block;
    margin-top: 14px;
  }
  @media ${props => props.theme.mediaQuery.medium} {
    .moduleN-heading-wrapper {
      margin-top: 17px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .moduleN-heading-wrapper {
      margin: 46px 6px 0 0;
    }
  }
`;
