// @flow
import React from 'react';
import { Image } from 'react-native';
import withStyles from '../../../hoc/withStyles.native';
import style from '../Image.style';
import { cropImageUrl } from '../../../../../utils/utils.native';

type Props = {
  source: string,
  url: string,
  crop: string,
  customStyle: Object,
};

const ImageComp = (props: Props) => {
  const { url, crop, source, customStyle, ...otherProps } = props;
  const cropVal = crop || '';
  const urlVal = url || '';
  const sourceVal = source || '';
  if (sourceVal === '') {
    return (
      <Image {...otherProps} {...customStyle} source={{ uri: cropImageUrl(urlVal, cropVal) }} />
    );
  }
  return <Image {...otherProps} source={source} {...customStyle} />;
};

export default withStyles(ImageComp, style);
export { ImageComp as ImageCompVanilla };
