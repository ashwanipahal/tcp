import { css, keyframes } from 'styled-components';

const progress = keyframes`0% {
  left: -500px;
}
100% {
  left: 500px;
}`;

const style = css`
  &.skeleton-row {
    position: relative;
  }
  .skeleton-col {
    height: 150px;
    ${props =>
      props.removeLastMargin
        ? `&:nth-child(${props.col}){
      margin-right:0;
    }`
        : ''}
    background-color: rgb(239, 241, 246);
    overflow: hidden;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: -500px;
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0)
      );
      animation: ${progress} 0.5s ease-in-out infinite;
    }
  }
  .left-carousel {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    display: none;
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
    }
  }
  .right-carousel {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 0;
    display: none;
    @media ${props => props.theme.mediaQuery.large} {
      display: block;
    }
  }
`;
export default style;
