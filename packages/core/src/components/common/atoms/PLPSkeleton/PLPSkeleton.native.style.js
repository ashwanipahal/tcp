import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');
const paddingAroundImage = 24;
const imageWidth = win.width / 2 - paddingAroundImage;
const imageHeight = 200;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  flex-wrap: wrap;
`;

export const SkeletonWrapper = styled.View`
  width: ${imageWidth};
  margin: 26px 12px;
`;

export const SkeletonImage = styled.Image`
  height: ${imageHeight};
  width: ${imageWidth};
  background: #d8d8d8;
`;

export const SkeletonBadge = styled.View`
  margin-top: 22px;
  height: 18px;
  width: 40px;
  background: #d8d8d8;
`;

export const SkeletonSwatches = styled.View`
  margin-top: 24px;
  height: 15px;
  background: #d8d8d8;
`;

export const SkeletonAddToBag = styled.View`
  margin-top: 35px;
  height: 32px;
  background: #d8d8d8;
`;

export const SkeletonTitle = styled.View`
  margin-top: 20px;
  height: 16px;
  background: #d8d8d8;
`;
