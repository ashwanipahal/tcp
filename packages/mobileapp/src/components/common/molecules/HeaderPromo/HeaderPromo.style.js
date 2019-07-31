import styled from 'styled-components/native';
import colors from '@tcp/core/styles/themes/TCP/colors';

export const MessageContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: ${props => props.width}px;
  padding-left: 20px;
  height: 100%;
  align-items: center;
  align-self: center;
`;

/* TODO - To use the style1, style2, style3 when the styles start coming up from CMS */

export const TextStyle1 = { color: colors.BRAND.BOYS, marginRight: 5 };
export const TextStyle2 = { color: colors.PRIMARY.GREEN, marginRight: 5 };
export const TextStyle3 = { color: colors.BRAND.PRIMARY, marginRight: 5 };

export default {
  MessageContainer,
  TextStyle1,
  TextStyle2,
  TextStyle3,
};
