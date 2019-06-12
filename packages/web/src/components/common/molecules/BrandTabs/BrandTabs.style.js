import { css } from 'styled-components';

export default css`
  margin-top: 5px;

  & > a {
    border-radius: 5px 5px 0px 0px;
    display: inline-block;
    padding: 8px 16px;
    position: relative;

    &.activeTab {
      background-color: ${props => props.theme.colors.WHITE};
    }
    &.activeTab:before,
    &.activeTab:after {
      content: '';
      position: absolute;
      height: 10px;
      width: 20px;
      bottom: 0;
    }
    &.activeTab:after {
      right: -20px;
      border-radius: 0 0 0 10px;
      box-shadow: -10px 0 0 0 ${props => props.theme.colors.WHITE};
    }
    &.activeTab:before {
      left: -20px;
      border-radius: 0 0 10px 0;
      box-shadow: 10px 0 0 0 ${props => props.theme.colors.WHITE};
    }
  }

  & > a > img {
    width: 70px;
  }
`;
