import { css } from 'styled-components';

export default css`
  margin-top: 5px;
  @media ${props => props.theme.mediaQuery.medium} {
    margin-top: 10px;
  }

  a {
    border-radius: 5px 5px 0px 0px;
    display: inline-block;
    padding: 9px 15px;
    position: relative;

    @media ${props => props.theme.mediaQuery.medium} {
      padding: 8px 15px;
    }

    @media ${props => props.theme.mediaQuery.large} {
      padding: 8px 20px;
    }

    &.header-topnav__brand-tabs--activeTab {
      background-color: ${props => props.theme.colors.WHITE};
    }

    &.header-topnav__brand-tabs--activeTab:before,
    &.header-topnav__brand-tabs--activeTab:after {
      content: '';
      position: absolute;
      height: 10px;
      width: 20px;
      bottom: 0;
    }

    &.header-topnav__brand-tabs--activeTab:after {
      right: -20px;
      border-radius: 0 0 0 10px;
      box-shadow: -10px 0 0 0 ${props => props.theme.colors.WHITE};
    }

    &.header-topnav__brand-tabs--activeTab:before {
      left: -20px;
      border-radius: 0 0 10px 0;
      box-shadow: 10px 0 0 0 ${props => props.theme.colors.WHITE};
    }

    img {
      width: 60px;
      height: 21px;

      @media ${props => props.theme.mediaQuery.medium} {
        width: 80px;
        height: 28px;
      }
    }
  }
`;
