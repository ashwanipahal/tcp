import styled from 'styled-components';
import config from './Carousel.config.native';

const { playIconHeight, playIconWidth } = config.CAROUSEL_APP_CONFIG;

export const Touchable = styled.TouchableOpacity`
  background-color: ${props => props.theme.colorPalette.white};
  border-radius: 15px;
  position: absolute;
  bottom: 12px;
  left: 50%;
  height: ${playIconHeight}px;
  width: ${playIconWidth}px;
  transform: translateX(-15px);
  z-index: ${props => props.theme.zindex.zOverlay};
`;

export const TouchableView = styled.TouchableOpacity`
  align-items: center;
`;

export const Icon = styled.Image`
  width: 6px;
  height: 10px;
`;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ControlsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const ControlsWrapperLeft = styled.View`
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 10px;
  margin-left: 20px;
`;

export const ControlsWrapperRight = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 10px;
  right: 0;
`;

export const PlayPauseButtonView = styled.View`
  width: 30px;
`;

export const PaginationWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  bottom: ${props => (props.iconBottomMargin ? props.iconBottomMargin : '1px')};
`;

export default {
  Touchable,
  TouchableView,
  Icon,
  Container,
  PaginationWrapper,
  ControlsWrapperLeft,
  ControlsWrapperRight,
};
