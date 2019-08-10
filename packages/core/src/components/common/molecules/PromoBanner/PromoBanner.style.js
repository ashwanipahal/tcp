import { css } from 'styled-components';

export default css`
  font-family: ${props => props.theme.typography.fonts.primary};
  text-align: center;

  .promo-text {
    display: block;

    @media ${props => props.theme.mediaQuery.medium} {
      display: inline;
    }
  }
  .style1 {
    color: ${props => props.theme.colorPalette.gray['900']};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-size: 42px;

    @media ${props => props.theme.mediaQuery.medium} {
      font-size: 70px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 60px;
    }
  }
  .style2 {
    color: ${props => props.theme.colorPalette.black};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 70px;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 60px;
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

  .style4 {
    font-size: 16px;
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    text-align: center;
    color: ${props => props.theme.colorPalette.white};
    display: block;
    line-height: 2.5;

    @media ${props => props.theme.mediaQuery.large} {
      display: inline-block;
      font-size: 26px;
      width: 148px;
      text-align: left;
      margin-left: 10px;
      position: relative;
      line-height: normal;
      top: 6px;
    }
  }

  /* Module-A and N % style promo text */
  .style6 {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 68px;
    line-height: 1;
    width: 250px;
    text-align: left;
    margin: 0 auto;
    position: relative;
    display: block;

    .style6-1 {
      font-size: 46px;
      position: absolute;
      top: 0;
    }

    .style6-2 {
      font-size: 20px;
      position: absolute;
      bottom: 8px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      display: inline-block;
      width: auto;
      text-align: center;
      margin-left: 10px;

      .style6-0,
      .style6-1,
      .style6-2 {
        font-size: 74px;
        line-height: normal;
        position: static;
        vertical-align: middle;
      }
    }
  }

  /* Module-A and N % style promo text */
  .style7 {
    color: ${props => props.theme.colorPalette.pink['400']};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 153px;
    line-height: 0.91;
    width: 300px;
    text-align: left;
    margin: 0 auto;
    position: relative;

    .style7-1 {
      font-size: 99px;
      position: absolute;
      top: 0;
      line-height: 1.01;
    }

    .style7-2 {
      font-size: 43px;
      position: absolute;
      bottom: 8px;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
      width: auto;
      text-align: center;
      line-height: 0.6;

      .style7-0,
      .style7-1,
      .style7-2 {
        font-size: 122px;
        line-height: 0.88;
        position: relative;
      }
    }

    @media ${props => props.theme.mediaQuery.large} {
      display: block;
      .style7-0,
      .style7-1,
      .style7-2 {
        font-size: 204px;
      }
    }
  }

  /* Module A promo banner bold text style*/
  .style8 {
    color: ${props => props.theme.colorPalette.text.primary};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    font-size: 16px;
    line-height: normal;
    display: inline;
    vertical-align: top;

    @media ${props => props.theme.mediaQuery.medium} {
      font-size: 16px;
      line-height: normal;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 26px;
      line-height: normal;
    }
  }

  /* Module A promo banner normal text style*/
  .style9 {
    color: ${props => props.theme.colorPalette.text.primary};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    font-size: 16px;
    line-height: normal;
    display: inline;
    vertical-align: top;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 26px;
      line-height: normal;
    }
  }

  .style11 {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    font-size: 14px;
  }
`;
