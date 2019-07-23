import styled from 'styled-components';
import config from './config';

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

export default { Touchable };
