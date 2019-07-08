// @flow
import React from 'react';
import { Image } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import style from '../Image.style';

type Props = {
  source: string,
};

const ImageComp = (props: Props) => {
  const { source } = props;
  return <Image source={source} {...props} />;
};

export default withStyles(ImageComp, style);
