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
