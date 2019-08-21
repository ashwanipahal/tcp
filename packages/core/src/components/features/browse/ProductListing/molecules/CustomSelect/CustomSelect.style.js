import { css } from 'styled-components';

export default css`
  .filter-label {
    outline: none;
    position: relative;

    display: inline-block;
    padding-right: 20px;

    &:after {
      content: '';
      position: absolute;

      transform: rotate(45deg);
      width: 9px;
      height: 2px;
      background: ${props => props.theme.colorPalette.gray['600']};
      display: inline-block;
      top: 10px;
      right: 3px;
    }
    &:before {
      content: '';
      position: absolute;
      width: 9px;
      height: 2px;
      border-radius: 15px;
      background: ${props => props.theme.colorPalette.gray['600']};
      display: inline-block;
      top: 10px;
      right: -2px;
      bottom: 16px;
      transform: rotate(-45deg);
    }
  }
  .filter-label-expanded {
    font-weight: bold;
    &:after {
      transform: rotate(-45deg);
      background: ${props => props.theme.colorPalette.gray['900']};
    }
    &:before {
      transform: rotate(45deg);
      background: ${props => props.theme.colorPalette.gray['900']};
    }
  }
`;
