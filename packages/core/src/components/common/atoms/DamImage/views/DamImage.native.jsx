// @flow
import React from 'react';
import { Image } from 'react-native';
import { LazyloadImage } from 'react-native-lazyload-deux';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles.native';
import style from '../DamImage.styles';
import { cropImageUrl } from '../../../../../utils/index.native';

/**
 * DamImage returns two types of images
 * 1. Image from react-native
 * 2. LazyLoadImage - A image to be loaded only when it is visible on screen
 *                  - For an image to be lazy loaded, parent scrollview should be LazyLoadScrollView from react-native-lazyload-deux
 *                  - it needs "host" as props
 *                  - value of host prop should be same as parent LazyLoadScrollView
 */
const DamImage = (props: Props) => {
  const { url, crop, source, host, imgConfig, alt, ...otherProps } = props;
  const cropVal = crop || '';
  const urlVal = url || '';
  const ImageComponent = host ? LazyloadImage : Image;
  const namedTransformation = imgConfig || '';

  return (
    <ImageComponent
      {...otherProps}
      host={host}
      accessibilityRole="image"
      accessibilityLabel={alt || ''}
      source={{ uri: cropImageUrl(urlVal, cropVal, namedTransformation) }}
    />
  );
};

DamImage.propTypes = {
  source: PropTypes.string,
  crop: PropTypes.string,
  imgConfig: PropTypes.string,
  url: PropTypes.string,
  host: PropTypes.string,
  alt: PropTypes.string,
};

DamImage.defaultProps = {
  source: '',
  crop: '',
  imgConfig: '',
  url: '',
  host: '',
  alt: '',
};

export default withStyles(DamImage, style);
export { DamImage as DamImageCompVanilla };
