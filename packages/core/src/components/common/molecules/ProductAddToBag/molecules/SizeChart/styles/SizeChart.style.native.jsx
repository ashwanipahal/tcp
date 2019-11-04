import styled, { css } from 'styled-components/native';

const style = css`
  padding-top: 10px;
`;

export const SizeChartButton = styled.View`
  position: absolute;
  right: 0;
  z-index: ${props => props.theme.zindex.zLoader};
`;

export default style;
