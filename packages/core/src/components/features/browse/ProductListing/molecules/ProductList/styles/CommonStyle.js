import { css } from 'styled-components';

export const buttonPrev = css`
  cursor: pointer;
  display: block;
  position: absolute;
  z-index: 1;
  transform: translateY(-50%);
  overflow: hidden;
  left: 0px;
  background: transparent;
  border: 0;
  padding-left: 0;

  &::before {
    content: '';
    transform: rotate(-45deg);
    display: inline-block;
    position: relative;
    border-radius: 2px;
    left: 0px;
  }
`;

export const buttonNext = css`
  cursor: pointer;
  display: block;
  position: absolute;
  z-index: 1;
  transform: translateY(-50%);
  overflow: hidden;
  right: 0px;
  background: transparent;
  border: 0;
  padding-right: 0;

  ::before {
    content: '';
    display: inline-block;
    position: relative;
    border-radius: 2px;
    transform: rotate(135deg);
    right: 0px;
  }
`;

export const imageAnchorInheritedStyles = css`
  display: block;
`;
