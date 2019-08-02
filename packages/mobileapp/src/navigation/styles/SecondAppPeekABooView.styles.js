import styled, { css } from 'styled-components/native';

export const PeekABooContainer = css`
  position: absolute;
  align-items: center;
  z-index: -1;
  background-color: transparent;
  ${props =>
    `bottom: ${props.theme.spacing.LAYOUT_SPACING.XXS};
  `};
`;

export const ImageContainer = styled.View`
  border-radius: 100px;
  width: 100px;
  height: 100px;
  align-items: center;
  ${props =>
    `background-color: ${props.theme.colors.WHITE};
     box-shadow: 0px 0px 9px ${props.shadowColor};
     border-color: ${props.shadowColor};
     border-width: ${props.borderWidth};
     left: -${props.theme.spacing.ELEM_SPACING.XXXS};
  `};
`;
