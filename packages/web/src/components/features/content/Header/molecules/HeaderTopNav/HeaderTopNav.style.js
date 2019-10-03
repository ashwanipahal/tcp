import { css } from 'styled-components';

export default css`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};

  .header-topnav__row {
    overflow: auto;
    padding: 0 14px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 0 15px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding: 0 15px 0 6px;
    }
  }

  .header-topnav__brand-tabs,
  .header-topnav__track-order,
  .header-topnav__promo-area {
    float: left;
  }

  .header-topnav__brand-tabs {
    width: 60%;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 30%;
    }
  }

  .header-topnav__promo-area {
    text-align: center;
    width: 45%;

    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }

  .track-order {
    border-right: 1px solid ${props => props.theme.colorPalette.gray['500']};
    line-height: 26px;
    padding-right: 12px;
    float: right;
  }

  .header-topnav__track-order {
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;
    text-align: right;
    padding-top: 9px;
    width: 40%;
    display: none;

    @media ${props => props.theme.mediaQuery.medium} {
      display: block;
      padding-top: 14px;
      width: 25%;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4}px;
    }
  }

  .header-topnav__storelocator {
    display: none;

    @media ${props => props.theme.mediaQuery.smallOnly} {
      display: block;
    }
  }
`;
