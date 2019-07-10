import { StyleSheet } from 'react-native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';

const colorPallete = createThemeColorPalette();

export default StyleSheet.create({
  container: {
    borderTopColor: colorPallete.gray[500],
    borderTopWidth: 1,
    elevation: 2,
    flexDirection: 'row',
    height: 55,
  },
  logoStyle: { paddingLeft: 10, paddingRight: 10, position: 'relative', top: -20 },
  tabButton: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  textStyle: { color: colorPallete.gray[600], fontSize: 8, marginTop: 6 },
});
