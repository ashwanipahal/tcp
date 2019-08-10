import { css } from 'styled-components';

export default css`
  ${props => `
  background-color: ${props.bgColor};
    `};
  h3.link-text {
    margin: 0;
  }

  .promo-link {
    color: white;
  }

  @media ${props => props.theme.mediaQuery.large} {
    .heading-wrapper {
      text-align: center;
    }
    .heading,
    .moduleN__promo-banner {
      display: inline-block;
    }
  }
`;
