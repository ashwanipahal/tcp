// @flow
import React from 'react';
import { Image } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import style from '../Image.style';
import { cropImageUrl } from '../../../../../utils';

type Props = {
  source: string,
  url: string,
  crop: string,
};

const ImageComp = (props: Props) => {
  const { url, crop, source, ...otherProps } = props;
  const cropVal = crop || '';
  const urlVal = url || '';
  const sourceVal = source || '';
  if (sourceVal === '') {
    return <Image {...otherProps} source={{ uri: cropImageUrl(urlVal, cropVal) }} />;
  }
  return <Image {...otherProps} source={source} />;
};

export default withStyles(ImageComp, style);
export { ImageComp as ImageCompVanilla };
