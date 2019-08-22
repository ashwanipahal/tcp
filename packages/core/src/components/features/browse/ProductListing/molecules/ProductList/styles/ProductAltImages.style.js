import { css } from 'styled-components';

const styles = css`
  margin-top: 0;
  width: 100%;
  position: relative;

  .button-prev {
    cursor: pointer;
    display: block;
    position: absolute;
    color: #999;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
    font-size: 0;
    left: 0px;
    height: 36px;
    width: 36px;
    background: transparent;
    border-radius: 50%;
    border: 0;
    padding-left: 0;

    ::before {
      content: '';
      transform: rotate(-45deg);
      display: inline-block;
      border-left: 2px solid ${props => props.theme.colors.ANCHOR.GRAYED};
      border-top: 2px solid ${props => props.theme.colors.ANCHOR.GRAYED};
      height: 10px;
      width: 10px;
      position: relative;
      border-radius: 2px;
      top: 1px;
      right: 0px;
    }
  }
  .button-next {
    cursor: pointer;
    display: block;
    position: absolute;
    color: #999;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
    font-size: 0;
    right: 0px;
    height: 36px;
    width: 36px;
    background: transparent;
    border-radius: 50%;
    border: 0;
    padding-right: 0;

    ::before {
      content: '';
      display: inline-block;
      border-left: 2px solid ${props => props.theme.colors.ANCHOR.GRAYED};
      border-top: 2px solid ${props => props.theme.colors.ANCHOR.GRAYED};
      height: 10px;
      width: 10px;
      position: relative;
      border-radius: 2px;
      transform: rotate(135deg);
      top: -1px;
      right: 0px;
    }
  }
  @media ${props => props.theme.mediaQuery.large} {
    .button-prev {
      display: none;
    }
    .button-next {
      display: none;
    }
  }
`;

export const imageAnchorInheritedStyles = css`
  display: block;
`;

export default styles;
