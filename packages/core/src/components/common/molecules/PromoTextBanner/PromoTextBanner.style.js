import { css } from 'styled-components';

export default css`
  text-align: center;
  .promo-text {
    display: block;
    @media ${props => props.theme.mediaQuery.medium} {
      display: inline;
    }
  }
  .moduleN-promoBanner-text1 {
    display: inline-block;
    font-size: 68px;
    font-weight: ${props => props.theme.typography.fontWeights.black};
    padding: 0 1% 0 11%;

    @media ${props => props.theme.mediaQuery.medium} {
      font-size: 74px;
      padding-left: 5%;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 74px;
      padding: inherit;
    }
  }
  .moduleN-promoBanner-text2 {
    display: inline-block;
    font-size: 46px;
    vertical-align: top;
    font-weight: ${props => props.theme.typography.fontWeights.black};

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 74px;
      margin-right: 5px;
    }
  }
  .moduleN-promoBanner-text3 {
    display: inline-block;
    font-size: 20px;
    font-weight: ${props => props.theme.typography.fontWeights.black};
    position: relative;
    right: 11%;

    @media ${props => props.theme.mediaQuery.medium} {
      right: 6%;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 74px;
      margin-right: 9px;
      position: inherit;
    }
  }
  .moduleN-promoBanner-text4 {
    display: block;
    font-size: 16px;
    margin-bottom: 18px;

    @media ${props => props.theme.mediaQuery.medium} {
      margin-bottom: 18px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      display: inline-block;
      margin-bottom: 35px;
      font-size: 26px;
      width: 0;
      position: inherit;
    }
  }
`;
