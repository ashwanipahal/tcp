import React from 'react';
import { Text } from 'react-native';
// import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette'; TODO
import SpinnerWrapper from '../styles/Spinner.style.native';

// TODO

// import { isGymboree } from '../../../../../utils';

// const colorPalette = createThemeColorPalette();

// const applyBrandSpecificColor = () => {
//   return isGymboree() ? colorPalette.orange[800] : colorPalette.blue[500];
// };

const SpinnerView = () => {
  return (
    <SpinnerWrapper>
      <Text>Loading...</Text>
    </SpinnerWrapper>
  );
};

export default SpinnerView;
