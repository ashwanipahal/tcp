import styled from 'styled-components';
import { getIconPath } from '../../../../utils';

const darkArrow = getIconPath('icon-carrot-black-small');
const darkArrowLarge = getIconPath('icon-carrot-grey-large');
const lightArrow = getIconPath('icon-carrot-white');
const CarouselStyle = styled.div`
  .slick-slider {
    position: relative;
    padding: 0px ${props => (props.carouselConfig.arrow === 'small' ? '38px' : '0px')};
    line-height: 14px;
    text-align: center;
    display: block;
    box-sizing: border-box;
    user-select: none;
    -webkit-touch-callout: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }
  .slick-list {
    position: relative;
    display: block;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .slick-list:focus {
    outline: none;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-track {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .slick-slider .slick-track,
  .slick-slider .slick-list {
    transform: translate3d(0, 0, 0);
  }
  .slick-track:before,
  .slick-track:after {
    display: table;
    content: '';
  }
  .slick-track:after {
    clear: both;
  }
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }
  [dir='rtl'] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-loading .slick-slide {
    visibility: hidden;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }

  /************************
  * @@@ Carousel Theme
  ************************/
  .slick-prev,
  .slick-next {
    font-size: 0;
    line-height: 0;
    position: absolute;
    top: 50%;
    display: block;
    width: ${props => (props.carouselConfig.arrow === 'small' ? '38px' : '20px')};
    height: ${props => (props.carouselConfig.arrow === 'small' ? '30px' : '20px')};
    padding: 0;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: none;
    background-size: auto auto;
  }
  @media only screen and (max-width: 767px) {
    .slick-prev {
      background: url(${props => (props.carouselConfig.type === 'dark' ? lightArrow : darkArrow)})
        no-repeat center center;
    }
    .slick-next {
      background: url(${props => (props.carouselConfig.type === 'dark' ? lightArrow : darkArrow)})
        no-repeat center center;
    }
  }
  @media only screen and (min-width: 768px) {
    .slick-prev {
      background: url(${props =>
          props.carouselConfig.type === 'dark' ? lightArrow : darkArrowLarge})
        no-repeat center center;
    }
    .slick-next {
      background: url(${props =>
          props.carouselConfig.type === 'dark' ? lightArrow : darkArrowLarge})
        no-repeat center center;
    }
  }

  .slick-prev {
    left: 0;
    transform: rotateY(180deg) translate(0, -50%);
  }
  [dir='rtl'] .slick-prev {
    right: -20px;
    left: auto;
  }
  .slick-next {
    right: 0;
  }
  [dir='rtl'] .slick-next {
    right: auto;
    left: -20px;
  }

  /* Dots */
  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }

  .slick-dots {
    position: absolute;
    bottom: -25px;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }
  .slick-dots li {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 5px;
    padding: 0;

    cursor: pointer;
  }
  .slick-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
  }
  .slick-dots li button:before {
    font-family: Arial;
    font-size: 6px;
    line-height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    content: '•';
    text-align: center;
    opacity: 0.25;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: black;
  }
  .slick-dots li button:hover,
  .slick-dots li button:focus {
    outline: none;
  }
  .slick-dots li button:hover:before,
  .slick-dots li button:focus:before {
    opacity: 1;
  }
  .tcp_carousel__play {
    background: ${props => props.theme.colors.WHITE};
    border: 0px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
  }
`;

export default CarouselStyle;
