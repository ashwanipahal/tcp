import { css } from 'styled-components';

export default css`
  margin: 0;
  @media ${props => props.theme.mediaQuery.largeMax} {
    width: 100%;
    margin: 0;
  }

  .is-visible-nav {
    display: none;
  }
  .is-hidden-nav {
    display: block;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
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
