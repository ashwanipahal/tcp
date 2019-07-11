import { StyleSheet } from 'react-native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';

const colorPallete = createThemeColorPalette();

const container = {
  borderTopColor: colorPallete.gray[500],
  borderTopWidth: 1,
  elevation: 2,
  flexDirection: 'row',
  height: 55,
};

const logoStyle = {
  paddingLeft: 10,
  paddingRight: 10,
  position: 'relative',
  top: -20,
};

const tabButton = {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
};

const textStyle = {
  color: colorPallete.gray[600],
  fontSize: 8,
  marginTop: 6,
};

const highlightedTextStyle = {
  color: colorPallete.gray[900],
  fontSize: 8,
  marginTop: 6,
};

export default StyleSheet.create({
  container,
  highlightedTextStyle,
  logoStyle,
  tabButton,
  textStyle,
});
