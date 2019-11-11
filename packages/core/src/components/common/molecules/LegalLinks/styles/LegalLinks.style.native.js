import styled, { css } from 'styled-components/native';

export default styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
`;

export const AnchorStyles = css`
  margin-bottom: 14px;
  color: ${props => props.theme.colorPalette.gray[600]};
`;
