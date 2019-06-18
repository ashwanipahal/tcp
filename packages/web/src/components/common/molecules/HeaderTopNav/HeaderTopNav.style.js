import { css } from 'styled-components';

export default css`
  background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};

  .header-topnav__row {
    overflow: auto;
    padding: 0 14px;
    position: relative;

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
    width: 50%;

    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }

  .header-topnav__track-order {
    font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy1}px;
    text-align: right;
    padding-top: 15px;
    width: 40%;

    @media ${props => props.theme.mediaQuery.medium} {
      width: 20%;
    }

    @media ${props => props.theme.mediaQuery.large} {
      font-size: ${props => props.theme.fonts.fontSize.body.bodytext.copy4}px;
    }
  }
`;
