import { css } from 'styled-components';

const MyAccountStyles = css`
  margin-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  .is-visible-nav {
    display: none;
  }
  .is-hidden-nav {
    display: block;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  .no-outline {
    &:focus,
    &:active {
      outline: 0;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .is-hidden-nav {
      display: none;
    }
    .is-visible-nav {
      display: flex;
    }
  }
`;

export default MyAccountStyles;
