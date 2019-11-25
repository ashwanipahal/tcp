import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { Dimensions } from 'react-native';

const win = Dimensions.get('screen');
const imageHeight = win.height;
const imageWidth = win.width;

export const StyledView = styled.View`
  width: ${imageWidth};
  height: ${imageHeight};
`;
