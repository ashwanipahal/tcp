import styled from 'styled-components/native';
import Image from '@tcp/core/src/components/common/atoms/Image';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';

export const OuterCircleWrapper = styled.View`
  align-items: center;
  justify-content: center;
  position: relative;
  ${props => `
    width: ${props.radius * 2};
    height: ${props.radius * 2};
    border-radius: ${props.radius};
    backgroundColor: ${props.shadowColor};
  `}
`;

export const HalfCircleOuterWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  ${props => `
    width: ${props.radius};
    height: ${props.radius * 2};
  `}
`;

export const HalfCircleInnerWrapper = styled.View`
  position: absolute;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  left: 0;
  top: 0;
  overflow: hidden;
  ${props => `
    width: ${props.radius};
    height: ${props.radius * 2};
    border-radius: ${props.radius};
    transform: translateX(-${props.radius / 2}px) rotate(${
    props.rotateDegrees
  }deg) translateX(${props.radius / 2}px);
    background-color: ${props.backgroundColor ? props.backgroundColor : props.color};
  `}
`;

export const InnerCircleWrapper = styled.View`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${props => `
    width: ${props.radiusMinusBorder * 2};
    height: ${props.radiusMinusBorder * 2};
    border-radius: ${props.radiusMinusBorder};
    background-color: ${props.bgColor};
  `}
`;

export const ImageWrapper = styled(Image)`
  margin-top: 3px;
  width: 73px;
  margin-left: 7px;
`;

export const TextWrapper = styled(BodyCopy)`
  position: absolute;
  top: 35%;
  left: 80%;
  line-height: 25px;
  background-color: ${props => props.theme.colorPalette.white};
`;
