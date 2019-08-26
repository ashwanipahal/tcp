/* eslint-disable */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  OuterCircleWrapper,
  HalfCircleOuterWrapper,
  HalfCircleInnerWrapper,
  InnerCircleWrapper,
  ImageWrapper,
  TextWrapper,
} from '../styles/ProfileProgress.style.native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
const smileyIcon = require('../../../../../../../assets/smiley-icon.png');

function profileCompletionToDegrees(profileCompletion) {
  return profileCompletion * 3.6;
}

const colorPalette = createThemeColorPalette();

export class ProfileProgress extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    shadowColor: PropTypes.string,
    bgColor: PropTypes.string,
    radius: PropTypes.number.isRequired,
    borderWidth: PropTypes.number,
    profileCompletion: PropTypes.number.isRequired,
  };

  static defaultProps = {
    color: colorPalette.blue[600],
    shadowColor: colorPalette.black,
    bgColor: colorPalette.white,
    borderWidth: 2,
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialStateFromProps(props);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.profileCompletion !== state.profileCompletion) {
      return getInitialStateFromProps(props);
    }

    return null;
  }

  getInitialStateFromProps({ profileCompletion }) {
    const formattedprofileCompletion = Math.max(Math.min(100, profileCompletion), 0);
    const needHalfCircle2 = formattedprofileCompletion > 50;
    let halfCircle1Degree;
    let halfCircle2Degree;
    // degrees indicate the 'end' of the half circle, i.e. they span (degree - 180, degree)
    if (needHalfCircle2) {
      halfCircle1Degree = 180;
      halfCircle2Degree = profileCompletionToDegrees(formattedprofileCompletion);
    } else {
      halfCircle1Degree = profileCompletionToDegrees(formattedprofileCompletion);
      halfCircle2Degree = 0;
    }

    return {
      halfCircle1Degree,
      halfCircle2Degree,
      needHalfCircle2,
      profileCompletion,
    };
  }

  render() {
    const { halfCircle1Degree, halfCircle2Degree, needHalfCircle2 } = this.state;
    const { radius, borderWidth, color, shadowColor, bgColor, profileCompletion } = this.props;
    const radiusMinusBorder = radius - borderWidth;
    return (
      <OuterCircleWrapper radius={radius} shadowColor={shadowColor}>
        <HalfCircleOuterWrapper radius={radius}>
          <HalfCircleInnerWrapper radius={radius} rotateDegrees={halfCircle1Degree} color={color} />
        </HalfCircleOuterWrapper>
        <HalfCircleOuterWrapper radius={radius}>
          <HalfCircleInnerWrapper
            radius={radius}
            rotateDegrees={halfCircle2Degree}
            backgroundColor={needHalfCircle2 ? color : shadowColor}
            color={color}
          />
        </HalfCircleOuterWrapper>
        <InnerCircleWrapper radiusMinusBorder={radiusMinusBorder} bgColor={bgColor}>
          <ImageWrapper
            alt="Completion"
            source={smileyIcon}
            title="profile completion"
            resizeMode="contain"
          />
        </InnerCircleWrapper>
        <TextWrapper text={`${profileCompletion}%`} fontSize="fs18" fontWeight="black" />
      </OuterCircleWrapper>
    );
  }
}

export default ProfileProgress;
