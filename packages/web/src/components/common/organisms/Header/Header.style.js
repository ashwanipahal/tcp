import { css } from 'styled-components';

export default css`
  .header-topnav {
    background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};

    & > div:first-child {
      margin-left: 6px;
    }

    .header-topnav__brand-tabs {
      padding-right: 0;
    }

    .header-topnav__promo-area {
      text-align: center;

      @media ${props => props.theme.mediaQuery.smallMax} {
        display: none;
      }
    }
    .header-topnav__track-order {
      text-align: right;

      @media ${props => props.theme.mediaQuery.mediumMax} {
        padding-right: 0;
      }
    }
  }
  .header-brand {
    box-sizing: border-box;
    height: 129px;
    padding-top: 31px;
    text-align: center;

    @media ${props => props.theme.mediaQuery.mediumMax} {
      .tcp-logo {
        display: none;
      }
    }
  }
  .dummy-nav {
    color: ${props => props.theme.colors.PRIMARY.DARK};
    cursor: pointer;
    display: flex;
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.nav}px;
    font-weight: ${props => props.theme.fonts.fontWeight.semiBold};
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;
    padding: 10px 0;

    @media ${props => props.theme.mediaQuery.mediumMax} {
      display: none;
    }
  }
  .header-promo {
    background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    border-top: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    box-sizing: border-box;
    height: 60px;
    padding: 20px 0;
    text-align: center;
    text-transform: uppercase;
  }
  .header-loyalty {
    background-color: ${props => props.theme.colors.PRIMARY.LIGHTGRAY};
    padding: 36px 0;
    text-align: center;
    text-transform: uppercase;
  }
`;
