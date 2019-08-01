import styled, { css } from 'styled-components/native';

export const PeekABooContainer = css`
  position: absolute;
  align-items: center;
  z-index: -1;
  bottom: 15px;
  background-color: transparent;
`;

export const ImageContainer = styled.View`
  border-radius: 100px;
  width: 100px;
  height: 100px;
  left: -2px;
  ${props =>
    `background-color: ${props.theme.colors.WHITE}
     box-shadow: 0px 0px 9px ${props.shadowColor};
  `};
`;
