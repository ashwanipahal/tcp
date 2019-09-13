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
  imgConfigs: string,
  alt: string,
  host: string,
  alt: string,
};

/**
 * ImageComp returns two types of images
 * 1. Image from react-native
 * 2. LazyLoadImage - A image to be loaded only when it is visible on screen
 *                  - For an image to be lazy loaded, parent scrollview should be LazyLoadScrollView from react-native-lazyload-deux
 *                  - it needs "host" as props
 *                  - value of host prop should be same as parent LazyLoadScrollView
 */
const ImageComp = (props: Props) => {
  const { url, crop, source, host, imgConfigs, alt, ...otherProps } = props;
  const cropVal = crop || '';
  const urlVal = url || '';
  const sourceVal = source || '';
  const ImageComponent = host ? LazyloadImage : Image;
  const imgConfigsVal = imgConfigs || '';
  if (sourceVal === '') {
    return (
      <ImageComponent
        {...otherProps}
        host={host}
        accessibilityRole="image"
        accessibilityLabel={alt || ''}
        source={{ uri: cropImageUrl(urlVal, cropVal, imgConfigsVal) }}
      />
    );
  }

  return (
    <ImageComponent
      {...otherProps}
      host={host}
      source={source}
      accessibilityRole="image"
      accessibilityLabel={alt || ''}
    />
  );
};

export default withStyles(ImageComp, style);
export { ImageComp as ImageCompVanilla };
