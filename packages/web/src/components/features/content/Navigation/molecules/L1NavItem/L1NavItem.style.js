import { css } from 'styled-components';
import { getIconPath } from '@tcp/core/src/utils';

const darkArrow = getIconPath('icon-carrot-black-small');

export default css`
  padding: 18px 0 17px 0;
  color: #1a1a1a;
  cursor: pointer;

  span {
    display: inline-block;
  }

  .icon-arrow {
    background: url(${darkArrow}) no-repeat;
    width: 10px;
    height: 10px;
  }

  .nav-bar-l1-item-label {
    width: 50%;
  }
  .nav-bar-l1-item-content {
    width: 46%;
    color: #439ad4;
  }

  &:hover {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.99), #f6f6f6);
    color: #1a1a1a;
    cursor: pointer;
    border-bottom: 3px solid #4b9fdd;
  }

  @media ${props => props.theme.mediaQuery.large} {
    span {
      display: inline;
    }
    .nav-bar-l1-item-content {
      display: none;
    }
    padding: 38px 38px 12px 41px;
    color: #9b9b9b;
  }
`;
