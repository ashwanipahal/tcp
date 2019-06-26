import blue from './colors/blue';
import grey from './colors/grey';
import green from './colors/green';
import red from './colors/red';
import common from './colors/common';

function createThemeColors(colors = {}) {
  const { primary = { light: blue[300], main: blue[500], dark: blue[700] } } = colors;
  const { secondary = { light: red[100], main: red[300], dark: red[300] } } = colors;
  const {
    text = { primary: grey[900], secondary: grey[700], disabled: grey[500], hint: grey[600] },
  } = colors;

  const { white, black } = common;

  return {
    white,
    black,
    primary,
    secondary,
    text,
    success: green[500],
    error: red[500],
    grey,
  };
}

export default createThemeColors;
