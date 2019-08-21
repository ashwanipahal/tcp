import { css } from 'styled-components';

export default css`
  background-color: #f53d3d;
  h3.link-text {
    margin: 0;
  }
  .separator {
    background-color: white;
  }

  .moduleN-heading-wrapper {
    display: inline-block;
    margin-top: 14px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-top: 17px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      margin: 46px 6px 0 0;
    }
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
