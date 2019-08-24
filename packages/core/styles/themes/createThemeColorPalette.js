import blue from './colors/blue';
import gray from './colors/gray';
import green from './colors/green';
import red from './colors/red';
import common from './colors/common';
import yellow from './colors/yellow';
import orange from './colors/orange';
import pink from './colors/pink';

function createThemeColorPalette(colors = {}) {
  const { primary = { light: blue[300], main: blue[500], dark: blue[700] } } = colors;
  const { secondary = { light: red[100], main: red[300], dark: red[300] } } = colors;
  const {
    text = { primary: gray[900], secondary: gray[700], disabled: gray[500], hint: gray[600] },
  } = colors;

  const { white, black, purple } = common;
  const {
    userTheme = {
      plcc: blue[800],
      plccLight: blue[100],
      mpr: orange[800],
      mprLight: orange[100],
      mprPrimary: orange[300],
    },
  } = colors;

  return {
    white,
    black,
    purple,
    primary,
    secondary,
    text,
    success: green[500],
    error: red[500],
    gray,
    yellow,
    orange,
    red,
    pink,
    blue,
    userTheme,
  };
}

export default createThemeColorPalette;
