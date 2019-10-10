import { css, keyframes } from 'styled-components';

const placeHolderShimmer = keyframes`
  0% {background-position: -468px 0;}
  100% {background-position: 468px 0;}
`;
const style = css`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${placeHolderShimmer};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 2%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  position: relative;
`;

export default style;
