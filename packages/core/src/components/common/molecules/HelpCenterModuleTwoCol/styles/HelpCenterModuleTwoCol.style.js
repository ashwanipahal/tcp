import { css } from 'styled-components';

export default css`
  margin: 0;
  width: 100%;

  .showonlyInDesktop {
    display: none;
  }

  .showonlyInMobile {
    display: block;
    margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  }
  @media ${props => props.theme.mediaQuery.large} {
    .showonlyInMobile {
      display: none;
    }
    .showonlyInDesktop {
      display: flex;
    }
  }
`;
