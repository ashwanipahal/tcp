import { css } from 'styled-components';

export default css`
  .heading-wrapper {
    padding: 10px 0;

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0;
      padding-top: 16px;
      padding-bottom: 24px;
    }
    @media ${props => props.theme.mediaQuery.large} {
      text-align: center;
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 22px;
    }
  }

  background-color: ${props => props.bgColor};

  h3.link-text {
    margin: 0;
    margin-bottom: 5px;

    @media ${props => props.theme.mediaQuery.large} {
      display: inline;
      margin-bottom: 0;
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
