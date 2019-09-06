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

  .promo-banner-header {
    display: block;
    border-bottom: 1px solid #1a1a1a;
    margin: 8px 18px;
    .link-text {
      margin: 0;
      padding-bottom: 5px;
    }
    .style1,
    .style2 {
      font-size: 12px;
      display: block;
    }
    .style2 {
      font-weight: 800;
    }
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
      border-bottom: 1px solid #1a1a1a;
      margin: 12px 38px 15px 38px;
      .link-text {
        margin: 0;
        padding-bottom: 7px;
      }
      .style1,
      .style2 {
        font-size: 16px;
        display: block;
      }
      .style2 {
        font-weight: 800;
      }
    }
  }

  .currency_up_style {
    display: inline-flex;
    justify-content: center;

    .col-1,
    .col-2 {
      display: flex;
    }
    .col-2 {
      flex-direction: column;
    }
    .currency_up_style-0 {
      font-size: 28px;
      font-weight: 900;
      line-height: 1.3;
    }
    .currency_up_style-1 {
      line-height: 0.85;
      font-size: 86px;
      font-weight: 900;
    }
    .currency_up_style-2 {
      font-size: 48px;
      font-weight: 900;
      line-height: 1;
    }
    .currency_up_style-3 {
      font-size: 28px;
      font-weight: 900;
      line-height: 0.6;
    }

    @media ${props => props.theme.mediaQuery.large} {
      .col-1,
      .col-2 {
        display: flex;
      }
      .col-2 {
        flex-direction: column;
      }
      .currency_up_style-0 {
        font-size: 38px;
        font-weight: 900;
        line-height: 1.3;
      }
      .currency_up_style-1 {
        line-height: 0.85;
        font-size: 118px;
        font-weight: 900;
      }
      .currency_up_style-2 {
        font-size: 66px;
        font-weight: 900;
        line-height: 1;
      }
      .currency_up_style-3 {
        font-size: 40px;
        font-weight: 900;
        line-height: 0.6;
      }
    }
  }

  .small_text_semibold {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-size: ${props => props.theme.typography.fontSizes.fs20};
    font-weight: ${props => props.theme.typography.fontWeights.semibold};
    letter-spacing: ${props => props.theme.typography.letterSpacings.ls222};
    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs32};
      font-weight: ${props => props.theme.typography.fontWeights.semibold};
      letter-spacing: ${props => props.theme.typography.letterSpacings.ls222};
    }
  }

  .small_text_black {
    font-family: ${props => props.theme.typography.fonts.primary};
    font-size: ${props => props.theme.typography.fontSizes.fs20};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    letter-spacing: ${props => props.theme.typography.letterSpacings.ls222};

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.typography.fontSizes.fs32};
      font-weight: ${props => props.theme.typography.fontWeights.black};
      letter-spacing: ${props => props.theme.typography.letterSpacings.ls222};
    }
  }

  .text_normal {
    font-size: 16px;
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    text-align: center;
    color: ${props => props.theme.colorPalette.white};
    display: block;

    @media ${props => props.theme.mediaQuery.large} {
      display: inline-block;
      font-size: 26px;
      width: 136px;
      text-align: left;
      margin-left: 10px;
      position: relative;
      line-height: normal;
      top: 6px;
    }
  }

  /* Module-A and N % style promo text */
  .percentage_wrapped_large {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 64px;
    line-height: 1;
    width: 235px;
    text-align: left;
    margin: 0 auto;
    position: relative;
    display: block;

    .percentage_wrapped_large-1 {
      font-size: 42px;
      position: absolute;
      top: 0;
    }

    .percentage_wrapped_large-2 {
      font-size: 18px;
      position: absolute;
      bottom: 8px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      display: inline-block;
      width: auto;
      text-align: center;
      margin-left: 10px;

      .percentage_wrapped_large-0,
      .percentage_wrapped_large-1,
      .percentage_wrapped_large-2 {
        font-size: 64px;
        line-height: normal;
        position: static;
        vertical-align: middle;
      }
    }
  }

  .percentage_wrapped_extra_large {
    color: ${props => props.theme.colorPalette.pink['400']};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.black};
    font-size: 153px;
    line-height: 0.91;
    width: 300px;
    text-align: left;
    margin: 0 auto;
    position: relative;

    .percentage_wrapped_extra_large-1 {
      font-size: 99px;
      position: absolute;
      top: 0;
      line-height: 1.01;
    }

    .percentage_wrapped_extra_large-2 {
      font-size: 43px;
      position: absolute;
      bottom: 8px;
    }

    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
      width: auto;
      text-align: center;
      line-height: 0.6;

      .percentage_wrapped_extra_large-0,
      .percentage_wrapped_extra_large-1,
      .percentage_wrapped_extra_large-2 {
        font-size: 122px;
        line-height: 0.88;
        position: relative;
      }
    }

    @media ${props => props.theme.mediaQuery.large} {
      display: block;
      .percentage_wrapped_extra_large-0,
      .percentage_wrapped_extra_large-1,
      .percentage_wrapped_extra_large-2 {
        font-size: 204px;
      }
    }
  }

  .small_text_bold {
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

  .small_text_normal {
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

  /* Gymboree Ribbon text */
  .ribbon_default_text {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.secondary};
    font-weight: ${props => props.theme.typography.fontWeights.extrabold};
    font-size: 14px;
    display: block;

    @media ${props => props.theme.mediaQuery.medium} {
      font-size: 16px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 20px;
    }
  }

  .gymboree_description {
    color: ${props => props.theme.colorPalette.white};
    font-family: ${props => props.theme.typography.fonts.primary};
    font-weight: ${props => props.theme.typography.fontWeights.regular};
    font-size: 16px;
    display: block;

    @media ${props => props.theme.mediaQuery.large} {
      font-size: 28px;
    }
  }
`;
