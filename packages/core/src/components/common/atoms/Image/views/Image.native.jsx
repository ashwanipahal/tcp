// @flow
import React from 'react';
import { Image } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import style from '../Image.style';

type Props = {
  source: string,
};

const ImageComp = (otherProps: Props) => {
  const { source } = otherProps;
  return <Image source={source} {...otherProps} />;
};

export default withStyles(ImageComp, style);
export { ImageComp as ImageCompVanilla };
