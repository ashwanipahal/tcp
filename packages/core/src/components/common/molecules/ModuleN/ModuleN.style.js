import { css } from 'styled-components';

export default css`
  margin-bottom: 40px;

  .heading-wrapper {
    padding: 16px 0;

    @media ${props => props.theme.mediaQuery.large} {
      text-align: center;
      padding-top: 30px;
      padding-bottom: 25px;
    }
  }

  background-color: #f53d3d;

  h3.link-text {
    margin: 0;
    margin-bottom: 5px;

    @media ${props => props.theme.mediaQuery.large} {
      display: inline;
      margin-bottom: 0;
    }
  }

  .promo-link {
    color: ${props => props.theme.colorPalette.white};
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
