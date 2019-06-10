import { css } from 'styled-components';

export default css`
  .header-topnav {
    background-color: ${props => props.theme.colors.PRIMARY.PALEGRAY};
    height: 45px;
    text-transform: uppercase;
  }
  .header-topnav__promo-area {
    text-align: center;

    @media ${props => props.theme.mediaQuery.smallMax} {
      display: none;
    }
  }
  .header-topnav__track-order {
    text-align: center;
  }
  .header-brand {
    box-sizing: border-box;
    height: 129px;
    padding: 50px 0px;
    text-align: center;
  }
  .dummy-nav {
    color: ${props => props.theme.colors.PRIMARY.DARK};
    display: flex;
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
