// @flow
import React from 'react';
import { Image } from 'react-native';
import { LazyloadImage } from 'react-native-lazyload-deux';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles.native';
import style from '../DamImage.styles';
import { cropImageUrl, getAPIConfig } from '../../../../../utils/index.native';

const placeHolderImg = require('../../../../../assets/img-placeholder.png');

/**
 * DamImage returns two types of images
 * 1. Image from react-native
 * 2. LazyLoadImage - A image to be loaded only when it is visible on screen
 *                  - For an image to be lazy loaded, parent scrollview should be LazyLoadScrollView from react-native-lazyload-deux
 *                  - it needs "host" as props
 *                  - value of host prop should be same as parent LazyLoadScrollView
 */

const brandNameCheck = (checkBrand, brandId) => {
  if (checkBrand) {
    return checkBrand.toUpperCase();
  }
  return brandId && brandId.toUpperCase();
};

const DamImage = (props: Props) => {
  const {
    url,
    crop,
    source,
    host,
    imgConfig,
    alt,
    isProductImage,
    itemBrand,
    checkBrand,
    swatchConfig,
    ...otherProps
  } = props;
  const config = swatchConfig || 'w_450';
  const cropVal = crop || '';
  const urlVal = url || '';
  const ImageComponent = host ? LazyloadImage : Image;
  const namedTransformation = imgConfig || '';
  const apiConfigObj = getAPIConfig();

  let { brandId } = apiConfigObj;
  if (itemBrand) {
    brandId = itemBrand;
  }

  const brandName = brandNameCheck(checkBrand, brandId);
  const assetHost = apiConfigObj[`assetHost${brandName}`];
  const productAssetPath = apiConfigObj[`productAssetPath${brandName}`];
  const uri = {
    uri: isProductImage
      ? `${assetHost}/${config}/${productAssetPath}/${urlVal}`
      : cropImageUrl(urlVal, cropVal, namedTransformation),
  };

  return (
    <ImageComponent
      {...otherProps}
      host={host}
      accessibilityRole="image"
      accessibilityLabel={alt || ''}
      source={uri}
      defaultSource={placeHolderImg}
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
  itemBrand: PropTypes.string,
  swatchConfig: PropTypes.string,
};

DamImage.defaultProps = {
  source: '',
  crop: '',
  imgConfig: '',
  url: '',
  host: '',
  alt: '',
  itemBrand: '',
  swatchConfig: '',
};

export default withStyles(DamImage, style);
export { DamImage as DamImageCompVanilla };
