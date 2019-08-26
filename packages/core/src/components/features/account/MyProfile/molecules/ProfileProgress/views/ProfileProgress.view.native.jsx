/* eslint-disable */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import {
  OuterCircleWrapper,
  HalfCircleOuterWrapper,
  HalfCircleInnerWrapper,
  InnerCircleWrapper,
  ImageWrapper,
  TextWrapper
} from '../styles/ProfileProgress.style.native';

const smileyIcon = require('../../../../../../../assets/smiley-icon.png');

function percentToDegrees(percent) {
  return percent * 3.6
}

export default class ProfileProgress extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    shadowColor: PropTypes.string,
    bgColor: PropTypes.string,
    radius: PropTypes.number.isRequired,
    borderWidth: PropTypes.number,
    percent: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    children: PropTypes.node,
  };

  static defaultProps = {
    color: '#1ba5e0',
    shadowColor: '#000',
    bgColor: '#fff',
    borderWidth: 2,
    children: null,
  };

  constructor(props) {
    super(props)
    this.state = this.getInitialStateFromProps(props)
  }

  static getDerivedStateFromProps(props, state) {
    if(props.percent !== state.percent) {
      return getInitialStateFromProps(props);
    }

    return null;
  }

  getInitialStateFromProps({ percent }) {
    const formattedPercent = Math.max(Math.min(100, percent), 0)
    const needHalfCircle2 = formattedPercent > 50;
    let halfCircle1Degree;
    let halfCircle2Degree;
    // degrees indicate the 'end' of the half circle, i.e. they span (degree - 180, degree)
    if (needHalfCircle2) {
      halfCircle1Degree = 180;
      halfCircle2Degree = percentToDegrees(formattedPercent);
    } else {
      halfCircle1Degree = percentToDegrees(formattedPercent);
      halfCircle2Degree = 0;
    }

    return {
      halfCircle1Degree,
      halfCircle2Degree,
      needHalfCircle2,
      percent
    }
  }

  render() {
    const {
      halfCircle1Degree,
      halfCircle2Degree,
      needHalfCircle2
    } = this.state;
    const { radius, borderWidth, color, shadowColor, bgColor, percent } = this.props;
    const radiusMinusBorder = radius - borderWidth;
    return (
      <OuterCircleWrapper radius={radius} shadowColor={shadowColor}>
        <HalfCircleOuterWrapper radius={radius}>
          <HalfCircleInnerWrapper
          radius={radius}
          rotateDegrees={halfCircle1Degree}
          color={color}
          />
        </HalfCircleOuterWrapper>
        <HalfCircleOuterWrapper radius={radius}>
          <HalfCircleInnerWrapper
            radius={radius}
            rotateDegrees={halfCircle2Degree}
            backgroundColor={needHalfCircle2 ? color : shadowColor}
            color={color}
          />
        </HalfCircleOuterWrapper>
        <InnerCircleWrapper
          radiusMinusBorder={radiusMinusBorder}
          bgColor={bgColor}
        >
          <ImageWrapper
            alt="Completion"
            source={smileyIcon}
            title="profile completion"
            resizeMode='contain'
          />
        </InnerCircleWrapper>
        <TextWrapper
          text={`${percent}%`}
          fontSize="fs18"
          fontWeight="black"
        />
      </OuterCircleWrapper>
    );
  }
}
