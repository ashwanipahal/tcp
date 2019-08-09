import { css } from 'styled-components';

export default css`
  background-color: #f53d3d;
  h3.link-text {
    margin: 0;
  }
  .separator {
    background-color: white;
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
