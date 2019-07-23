import styled from 'styled-components/native';
import colors from '@tcp/core/styles/themes/TCP/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  background: ${props => props.theme.colors.PRIMARY.COLOR3};
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;
export const ChildContainer = styled.TouchableOpacity`
  align-items: center;
`;

export const MessageContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 6px;
  height: 10px;
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
`;

/* TODO - To use the style1, style2, style3 when the styles start coming up from CMS */

export const TextStyle1 = { color: colors.BRAND.BOYS, marginRight: 5 };
export const TextStyle2 = { color: colors.PRIMARY.GREEN, marginRight: 5 };
export const TextStyle3 = { color: colors.BRAND.PRIMARY, marginRight: 5 };

export default {
  Container,
  ChildContainer,
  Image,
  MessageContainer,
  TextStyle1,
  TextStyle2,
  TextStyle3,
};
