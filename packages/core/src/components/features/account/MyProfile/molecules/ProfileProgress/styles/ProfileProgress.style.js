import { css } from 'styled-components';

const styles = css`
  width: 100px;
  height: 100px;
  position: relative;

  .hold {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: ${props => props.theme.colorPalette.black};
  }

  &.level1 {
    .hold {
      clip: rect(0px, 100px, 30px, 50px);
    }
    .hold.right {
      clip: rect(0px, 100px, 0px, 50px);
    }
  }
  &.level2 {
    .hold {
      clip: rect(0px, 100px, 85px, 50px);
    }
    .hold.right {
      clip: rect(0px, 100px, 0px, 50px);
    }
  }
  &.level3 {
    .hold {
      clip: rect(0px, 100px, 100px, 50px);
    }
    .hold.right {
      clip: rect(0px, 100px, 30px, 50px);
    }
  }
  &.level4 {
    .hold {
      clip: rect(0px, 100px, 100px, 50px);
    }
    .hold.right {
      clip: rect(0px, 100px, 70px, 50px);
    }
  }
  &.level5 {
    .hold {
      clip: rect(0px, 100px, 100px, 50px);
    }
    .hold.right {
      clip: rect(0px, 100px, 100px, 50px);
    }
  }

  .outer-shadow {
    background: black;
    z-index: 4;
  }

  .outer-shadow,
  .inner-shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  .inner-shadow {
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    margin-top: -40px;
    border-radius: 100%;
    background-color: ${props => props.theme.colorPalette.white};
    z-index: 5;
  }

  .fill,
  .dot span {
    background-color: ${props => props.theme.colorPalette.blue[600]};
  }

  .fill {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    clip: rect(0px, 50px, 100px, 0px);
  }

  .left .fill {
    z-index: 4;
    -webkit-animation: left 1s linear;
    -moz-animation: left 1s linear;
    animation: left 1s linear both;
  }

  @keyframes left {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  @-webkit-keyframes left {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(180deg);
    }
  }

  .right {
    z-index: 4;
    transform: rotate(180deg);
  }

  .right .fill {
    z-index: 4;
    animation: right 1s linear both;
    animation-delay: 1s;
  }

  @keyframes right {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  @-webkit-keyframes right {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  .inner-shadow img {
    margin-left: 3px;
    margin-top: 7px;
    width: 73px;
  }

  .completion-text {
    position: absolute;
    top: 40%;
    left: 90%;
    margin: -10px;
    z-index: 6;
    background: ${props => props.theme.colorPalette.white};
    line-height: 25px;
  }
`;

export default styles;
