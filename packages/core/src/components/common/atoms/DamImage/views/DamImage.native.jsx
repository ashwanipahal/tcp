import React from 'react';
import { Image } from 'react-native';
// import { LazyloadImage } from 'react-native-lazyload-deux';
import PropTypes from 'prop-types';
// import VideoPlayer from '../../VideoPlayer';
import withStyles from '../../../hoc/withStyles.native';
import style from '../DamImage.styles';
import { cropImageUrl, getAPIConfig, getVideoUrl } from '../../../../../utils/index.native';

const placeHolderImg = require('../../../../../assets/img-placeholder.png');

/**
 * DamImage returns two types of images
 * 1. Image from react-native
 * 2. LazyLoadImage - A image to be  loaded only when it is visible on screen
 *                  - For an image to be  lazy loaded, parent scrollview should be LazyLoadScrollView from react-native-lazyload-deux
 *                  - it needs "host" as props
 *                  - value of host prop should be same as parent LazyLoadScrollView
 */

const brandNameCheck = (checkBrand, brandId) => {
  if (checkBrand) {
    return checkBrand.toUpperCase();
  }
  return brandId && brandId.toUpperCase();
};

const createURI = properties => {
  const { url, crop, imgConfig, isProductImage, itemBrand, checkBrand, swatchConfig } = properties;
  const config = swatchConfig || imgConfig || 'w_768';
  const cropVal = crop || '';
  const urlVal = url || '';
  // const ImageComponent = host ? Image : Image;
  const namedTransformation = imgConfig || '';
  const apiConfigObj = getAPIConfig();

  let { brandId } = apiConfigObj;
  if (itemBrand) {
    brandId = itemBrand;
  }

  const brandName = brandNameCheck(checkBrand, brandId);
  const assetHost = apiConfigObj[`assetHost${brandName}`];
  const productAssetPath = apiConfigObj[`productAssetPath${brandName}`];

  return {
    uri: isProductImage
      ? `${assetHost}/${config}/${productAssetPath}/${urlVal}`
      : cropImageUrl(urlVal, cropVal, namedTransformation),
  };
};

const DamImage = props => {
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
    videoData,
    width,
    height,
    updateVideoUrl,
    ...otherProps
  } = props;

  const ImageComponent = Image;

  if (videoData) {
    return null;
    // const updatedVideoData = { ...videoData, updateVideoUrl }
    // return <VideoPlayer {...updatedVideoData} />;
  }

  // const RenderVideo = videoProps => {
  // const { video, image } = videoProps;
  // const { autoplay, controls, url: videoUri } = video;

  // const options = {
  //   autoplay,
  //   controls,
  //   url: videoUri,
  //   updateVideoUrl:false,
  //   image,
  // };

  // return null; //<VideoPlayer {...options} />;
  // };

  const uri = createURI(props);

  const uriParam = getVideoUrl(uri.uri);

  if (uriParam) {
    // const { uri: videoUri } = uri;
    // const VideoUri = videoUri.replace('/image/', '/video/');
    // const videoDataOptions = {
    //   url: VideoUri,
    // };

    return null; // <RenderVideo video={videoDataOptions} />;
  }

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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  videoData: PropTypes.shape({}),
  isProductImage: PropTypes.bool,
  checkBrand: PropTypes.string,
  updateVideoUrl: PropTypes.bool,
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
  videoData: null,
  isProductImage: false,
  checkBrand: '',
  updateVideoUrl: true,
};

export default withStyles(DamImage, style);
export { DamImage as DamImageCompVanilla };
