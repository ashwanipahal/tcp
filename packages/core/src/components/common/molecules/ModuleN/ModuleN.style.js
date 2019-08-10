import { css } from 'styled-components';

export default css`
  .heading-wrapper {
    padding-top: 11px;
    @media ${props => props.theme.mediaQuery.medium} {
      padding-top: 16px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      text-align: center;
      padding-top: 0;
    }
  }

  background-color: ${props => props.bgColor};

  h3.link-text {
    margin: 0;

    @media ${props => props.theme.mediaQuery.large} {
      display: inline;
    }
  }

  .promo-link {
    color: white;
  }

  .heading,
  .moduleN__promo-banner {
    @media ${props => props.theme.mediaQuery.large} {
      display: inline-block;
    }
  }
`;
