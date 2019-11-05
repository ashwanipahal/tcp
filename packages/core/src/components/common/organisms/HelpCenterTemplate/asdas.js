import { css } from 'styled-components';

export default css`
  @media ${props => props.theme.mediaQuery.large} {
    .is-hidden-nav__desktop {
      display: none;
    }
  }
  @media ${props => props.theme.mediaQuery.mediumOnly} and ${props =>
  props.theme.mediaQuery.smallOnly} {
    .is-hidden-nav__medSmall {
      display: none;
    }
  }
  .help-center-template {
    margin: 48px auto 0;
  }
  .help-center-template__dropdown {
    justify-content: center;
    display: flex;
    width: 100%;
  }
`;
