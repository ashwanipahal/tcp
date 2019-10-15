import { css } from 'styled-components';

const style = css`
  &.skeleton-row {
    position: relative;
  }
  .skeleton-col {
    height: 150px;
    background: #d8d8d8;
    ${props =>
      props.removeLastMargin
        ? `&:nth-child(${props.col}){
      margin-right:0;
    }`
        : ''}
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
