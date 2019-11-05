import React from 'react';
import Spinner from 'react-native-spinkit';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';
import SpinnerWrapper from '../styles/Spinner.style.native';
import { isGymboree } from '../../../../../utils';

const colorPalette = createThemeColorPalette();

const applyBrandSpecificColor = () => {
  return isGymboree() ? colorPalette.orange[800] : colorPalette.blue[500];
};

const SpinnerView = () => {
  return (
    <SpinnerWrapper>
      <Spinner isVisible size={36} type="ThreeBounce" color={applyBrandSpecificColor()} />
    </SpinnerWrapper>
  );
};

export default SpinnerView;
