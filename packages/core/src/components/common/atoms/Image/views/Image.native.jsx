// @flow
import React from 'react';
import { Image } from 'react-native';
import { LazyloadImage } from 'react-native-lazyload-deux';

import withStyles from '../../../hoc/withStyles.native';
import style from '../Image.style';
import { cropImageUrl } from '../../../../../utils/index.native';

type Props = {
  source: string,
  url: string,
  crop: string,
  host: string,
};

const ImageComp = (props: Props) => {
  const { url, crop, source, host, ...otherProps } = props;
  const cropVal = crop || '';
  const urlVal = url || '';
  const sourceVal = source || '';
  const ImageComponent = urlVal.length > 0 && host ? LazyloadImage : Image;

  if (sourceVal === '') {
    return (
      <ImageComponent
        {...otherProps}
        host={host}
        accessibilityRole="image"
        source={{ uri: cropImageUrl(urlVal, cropVal) }}
      />
    );
  }

  return <ImageComponent {...otherProps} host={host} source={source} accessibilityRole="image" />;
};

export default withStyles(ImageComp, style);
export { ImageComp as ImageCompVanilla };
