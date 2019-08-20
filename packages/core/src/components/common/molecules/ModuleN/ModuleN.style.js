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
