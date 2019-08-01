import styled from 'styled-components';
import config from './Config.native';

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
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ControlsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const PlayPauseButtonView = styled.View`
  width: 30px;
`;

export default { Touchable, TouchableView, Icon, Container };
